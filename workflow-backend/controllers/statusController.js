const mongoose = require("mongoose");
const { runStep } = require("../services/llmService");

exports.getStatus = async (req, res) => {
  let dbStatus = "Disconnected";
  let llmStatus = "Not Working";

  if (mongoose.connection.readyState === 1) {
    dbStatus = "Connected";
  }

  try {
    await runStep("clean", "test");
    llmStatus = "Working";
  } catch (err) {
    llmStatus = "Error";
  }

  res.json({
    server: "OK",
    database: dbStatus,
    llm: llmStatus,
  });
};
