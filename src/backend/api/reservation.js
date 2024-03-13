const express = require("express");
const router = express.Router();
const knex = require("../database");
router.get("/contact_name", async (request, response) => {
  try {
    // knex syntax for selecting things.
    const allReservations = await knex("reservation").select("contact_name");
    response.json(allReservations);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
