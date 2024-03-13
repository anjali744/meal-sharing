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
const knex = require("./database");

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

//Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const today = new Date();
    const futureMeals = await knex("Meal").where("_when", ">", today).select();
    if (futureMeals.length === 0) {
      res
        .status(404)
        .json({ data: null, message: "No future meal available." });
      return;
    }
    res.status(200).json({ data: futureMeals, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, message: "server error" });
  }
});

//past-meals 	Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const today = new Date();
    const futureMeals = await knex("Meal").where("_when", "<", today).select();
    if (futureMeals.length === 0) {
      res
        .status(404)
        .json({ data: null, message: "No future meal available." });
      return;
    }
    res.status(200).json({ data: futureMeals, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, message: "server error" });
  }
});
//all-meals  Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("Meal").select().orderBy("id", "asc");

    res.status(200).json({ data: allMeals, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, message: "server error" });
  }
});

//first-meal 	Respond with the first meal (meaning with the minimum id)
app.get("/first-meals", async (req, res) => {
  try {
    const firstMeal = await Meal.findOne({
      order: [["id", "ASC"]],
    });

    res.status(200).json({ data: firstMeal, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, message: "Server error" });
  }
});

//last-meal 	Respond with the last meal (meaning with the maximum id)
app.get("/last-meals", async (req, res) => {
  try {
    const lastMeal = await Meal.findOne({
      order: [["id", "ASC"]],
    });

    res.status(200).json({ data: lastMeal, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: null, message: "Server error" });
  }
});

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
