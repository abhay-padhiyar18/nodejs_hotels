const express = require("express");

const router = express.Router();
const Person = require("./../models/Person");
const { update } = require("lodash");

// ✅ POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    console.log("Received Data:", data); // for debugging

    // Optional: validate required fields
    const requiredFields = ["work", "mobile", "email", "address"];
    for (let field of requiredFields) {
      if (!data[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }

    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error while saving person:", err.message || err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET Method

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find(); // fetch all documents
    res.status(200).json(persons); // send them as response
  } catch (err) {
    console.error("Error fetching persons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//worktpye

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log(" response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id form the URL parameter
    const updatePersonData = req.body; // upload data for the person
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //Return the update document
        runValidators: true, // Run mongoose Validation
      }
    );

    if (!response) {
      return req.status(404).json({ error: "Person not found" });
    }

    console.log(" response updated");
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    //asumning you have a person model

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return req.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted Successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
