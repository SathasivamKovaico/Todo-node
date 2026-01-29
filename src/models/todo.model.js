const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Todo", todoSchema);
