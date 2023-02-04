const express = require("express");
require('express-async-errors')
const app = express();
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const { errorHandler } = require('./middleware/errorHandler');

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
