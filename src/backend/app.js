import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";

const app = express();
const router = express.Router();

const buildPath = path.join(__dirname, "../../dist");
const cors = require("cors");

//future you requried this line(Serve the built client html)
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/api/meals", mealsRouter);

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
