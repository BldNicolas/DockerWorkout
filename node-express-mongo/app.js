const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.json());

console.log("Connecting to MongoDB...");

mongoose
  .connect("mongodb://mongodb:27017/mydatabase", {
    serverSelectionTimeoutMS: 500,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("Could not connect to MongoDB", err.message));

const itemSchema = new mongoose.Schema({ name: String, quantity: Number });
const Item = mongoose.model("Item", itemSchema);

app.get("/", async (req, res) => res.redirect("/items"));
app.get("/items", async (req, res) => res.send(await Item.find()));
app.post("/items", async (req, res) =>
  res.send(await new Item(req.body).save())
);