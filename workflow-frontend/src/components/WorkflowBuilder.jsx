

import { useState } from "react";
import API from "../services/api";
import StepOutput from "./StepOutput";

const stepsList = [
  { id: "clean", label: "Clean", icon: "🧹", description: "Remove unwanted characters" },
  { id: "summarize", label: "Summarize", icon: "📝", description: "Create a brief summary" },
  { id: "extract", label: "Extract", icon: "🔍", description: "Extract key information" },
  { id: "tag", label: "Tag", icon: "🏷️", description: "Add relevant tags" }
];

const WorkflowBuilder = () => {
  const [inputText, setInputText] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleStep = (step) => {
    if (selectedSteps.includes(step)) {
      setSelectedSteps(selectedSteps.filter((s) => s !== step));
    } else {
      setSelectedSteps([...selectedSteps, step]);
    }
  };

  const runWorkflow = async () => {
    if (!inputText || selectedSteps.length === 0) {
      alert("Enter text and select steps");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/workflow/run", {
        inputText,
        steps: selectedSteps,
      });
      setOutputs(res.data);
    } catch (err) {
      alert("Workflow failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn ">
      {/* Input Section */}
      <div className="mb-8">
        <label className="block font-semibold text-slate-700 mb-3 text-sm">
          Input Text
        </label>
        <textarea
          rows="6"
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-vertical text-sm"
        />
      </div>

      {/* Steps Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">
          Select Workflow Steps
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stepsList.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                selectedSteps.includes(step.id)
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSteps.includes(step.id)}
                onChange={() => toggleStep(step.id)}
                className="absolute top-4 right-4 w-5 h-5 cursor-pointer accent-blue-500"
              />
              <div className="flex items-start gap-3 pr-8">
                <span className="text-3xl leading-none">{step.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 text-base mb-1">
                    {step.label}
                  </div>
                  <div className="text-sm text-slate-600 leading-snug">
                    {step.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
        <button
          onClick={runWorkflow}
          disabled={loading}
          className="px-8 py-3 bg-purple-300 text-gray-700 font-semibold rounded-lg hover:bg-purple-400 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Running...
            </>
          ) : (
            "Run Workflow"
          )}
        </button>
        {selectedSteps.length > 0 && (
          <div className="text-slate-600 font-medium text-sm text-center sm:text-left">
            {selectedSteps.length} step{selectedSteps.length !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      <StepOutput outputs={outputs} />
    </div>
  );
};

export default WorkflowBuilder;