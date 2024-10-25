import { port } from "./config/index.js";
import app from "./app.mjs";

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
