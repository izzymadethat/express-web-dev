// TODO: store configuration and process.env variables here for easier access
// SEE ./index.mjs for example usage
import "dotenv/config";
export const port = process.env.PORT || 4000;
export const environment = process.env.NODE_ENV || "development";
export const session = {
  secret: process.env.SESSION_SECRET,
};
