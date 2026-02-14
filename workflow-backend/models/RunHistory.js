const mongoose = require("mongoose");

const runHistorySchema = new mongoose.Schema({
  inputText: {
    type: String,
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  outputs: [
    {
      step: String,
      result: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RunHistory", runHistorySchema);
