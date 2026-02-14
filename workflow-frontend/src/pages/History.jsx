import { useEffect, useState } from "react";
import API from "../services/api";

const History = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/workflow/history");
      setRuns(res.data);
    } catch (err) {
      alert("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-700">Loading history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Workflow History
            </h1>
            <p className="text-slate-700">
              View your past workflow runs
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No workflow runs yet</h3>
            <p className="text-slate-700">Your workflow history will appear here once you run your first workflow.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Workflow History
          </h1>
          <p className="text-slate-700">
            Last {runs.length} workflow run{runs.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4">
          {runs.map((run) => (
            <div
              key={run._id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header with timestamp */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <span className="font-medium text-slate-900">Workflow Run</span>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(run.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Input Text */}
              <div className="mb-4">
                <h4 className="font-medium text-slate-800 text-sm mb-2">Input Text</h4>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200">
                  {run.inputText}
                </p>
              </div>

              {/* Steps */}
              <div className="mb-4">
                <h4 className="font-medium text-slate-800 text-sm mb-2">Workflow Steps</h4>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  {run.steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {step}
                      </span>
                      {index < run.steps.length - 1 && (
                        <span className="mx-2 text-slate-400">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outputs */}
              <div>
                <h4 className="font-medium text-slate-800 text-sm mb-3">Results</h4>
                <div className="space-y-3">
                  {run.outputs.map((output, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                          {output.step}
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        {output.result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;