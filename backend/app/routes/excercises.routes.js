

module.exports = app => {
    const excercises = require("../models/excercises.models.js");
    var router = require("express").Router();
    // Create a new excercises
    router.post("/", excercises.enterdata);
    // Retrieve all excercises
    router.get("/:id", excercises.getdata);

    app.use('/api/excercises', router);
  };