const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

//POST Method to add a Menu Item

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GEt
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // fetch all documents
    console.log("data fatched");
    res.status(200).json(data); // send them as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//GEt
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType === "Sweet" || tasteType === "Spicy" || tasteType === "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// commetnt add for testing purpose
module.exports = router;
