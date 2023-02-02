require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
  // commented out above because I'm running PostgreSQL in a container
});

class Note extends Model {}
Note.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    important: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "note" }
);

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    console.log(req.body);
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
