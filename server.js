const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./firebase");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Waste classification
function classifyWaste(item) {
  item = item.toLowerCase();

  // 🌱 Wet Waste
  if (
    item.includes("banana") ||
    item.includes("apple") ||
    item.includes("food") ||
    item.includes("vegetable") ||
    item.includes("fruit") ||
    item.includes("leftover") ||
    item.includes("peel") ||
    item.includes("egg") ||
    item.includes("tea") ||
    item.includes("coffee")
  ) {
    return "Wet Waste 🌱";
  }

  // ♻️ Dry Waste
  else if (
    item.includes("plastic") ||
    item.includes("bottle") ||
    item.includes("paper") ||
    item.includes("cardboard") ||
    item.includes("glass") ||
    item.includes("metal") ||
    item.includes("can") ||
    item.includes("wrapper") ||
    item.includes("box") ||
    item.includes("newspaper")
  ) {
    return "Dry Waste ♻️";
  }

  // ☠️ Hazardous Waste
  else if (
    item.includes("battery") ||
    item.includes("chemical") ||
    item.includes("medicine") ||
    item.includes("paint") ||
    item.includes("oil") ||
    item.includes("bulb") ||
    item.includes("tube light") ||
    item.includes("e-waste") ||
    item.includes("electronic")
  ) {
    return "Hazardous Waste ☠️";
  }

  // 🏥 Biomedical Waste
  else if (
    item.includes("mask") ||
    item.includes("syringe") ||
    item.includes("glove") ||
    item.includes("bandage")
  ) {
    return "Biomedical Waste 🏥";
  }

  // ❓ Unknown
  else {
    return "Unknown Waste ❓";
  }
}

// API: classify waste
app.post("/classify", (req, res) => {
  const { item } = req.body;
  const result = classifyWaste(item);
  res.json({ category: result });
});

// API: schedule pickup
app.post("/pickup", async (req, res) => {
  const data = req.body;

  try {
    await db.collection("pickups").add(data);
    res.json({ message: "Pickup Scheduled ✅" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// API: get all pickups (admin)
app.get("/pickups", async (req, res) => {
  const snapshot = await db.collection("pickups").get();
  let pickups = [];

  snapshot.forEach(doc => {
    pickups.push({ id: doc.id, ...doc.data() });
  });

  res.json(pickups);
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));