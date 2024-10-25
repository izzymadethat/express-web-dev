import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import csurf from "csurf";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authSession from "express-session";
import { environment, session } from "./config/index.js";
import routes from "./routes/index.mjs";

const app = express();

// Variable to check if the server is running in production or development mode
const isProduction = environment === "production";

// Standard middleware
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Security middleware
if (!isProduction) {
  app.use(cors({ credentials: true }));
}
app.use(helmet());
app.use(
  csurf({
    cookie: true,
  })
);

// Authentication middleware
app.use(
  authSession({
    secret: session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
    },
  })
); // ready for authentication

// Logging middleware
app.use(morgan("dev"));

// TODO: Test route then get rid of this route and use apiRouter instead
app.get("/", (req, res) => {
  res.status(200).send("Backend server is running!");
});

app.use(routes);

export default app;
