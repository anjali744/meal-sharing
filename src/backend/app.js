import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";
import databaseRouter from "./database.js";
import reservationRouter from "./api/reservations.js";

const express = require("express");
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
app.use("/api/database", databaseRouter);
app.use("/api/reservations", reservationRouter);

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// covered in the react class(this frontend part)
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

export default app;
