const { DataTypes } = require("sequelize");
const { isValidYearWritten } = require("../models/validators");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year_written", {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        isValidYearWritten,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "year_written");
  },
};
