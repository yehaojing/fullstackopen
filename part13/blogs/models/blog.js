const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");
const { isValidYearWritten } = require("../models/validators");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year_written: {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        isValidYearWritten,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;
