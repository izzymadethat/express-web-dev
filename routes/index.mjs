import express from "express";
import apiRouter from "./api/index.mjs";
import webhooksRouter from "./webhook/index.mjs";
const routes = express.Router();

// All routes go into this file and are exported from here.
routes.use("/api", apiRouter);
routes.use("/webhook", webhooksRouter);

// === Error handling middleware ===

// 404 not found error - catch all route
routes.use((req, res, next) => {
  const err = new Error();
  err.title = "Resource Not Found";
  err.message =
    "The requested resource could not be found. Have you started the endpoint with /api?";
  err.status = 404;
  next(err);
});

// Error handler middleware or Internal Server Error (500) - where all errors are caught and handled
routes.use((err, req, res) => {
  err.status = err.status || 500;
  err.title = err.title || "Internal Server Error";
  err.message = err.message || "Something went wrong.";

  console.error(err);
  return res.status(err.status).json(err);
});

export default routes;
