const RunHistory = require("../models/RunHistory");
const { runStep } = require("../services/llmService");

exports.runWorkflow = async (req, res) => {
  try {
    const { inputText, steps } = req.body;

    if (!inputText || !steps || steps.length === 0) {
      return res.status(400).json({ message: "Input text and steps are required." });
    }

    let currentText = inputText;
    const outputs = [];

    for (const step of steps) {
      const result = await runStep(step, currentText);
      outputs.push({ step, result });
      currentText = result; // next step uses previous output
    }

    const run = await RunHistory.create({
      inputText,
      steps,
      outputs,
    });

    // Keep only last 5 runs
    const totalRuns = await RunHistory.countDocuments();
    if (totalRuns > 5) {
      const oldest = await RunHistory.find().sort({ createdAt: 1 }).limit(totalRuns - 5);
      for (const item of oldest) {
        await RunHistory.findByIdAndDelete(item._id);
      }
    }

    res.json(outputs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Workflow execution failed." });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await RunHistory.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history." });
  }
};
