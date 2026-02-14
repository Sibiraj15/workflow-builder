import { useEffect, useState } from "react";
import API from "../services/api";

const Status = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await API.get("/status");
      setStatus(res.data);
    } catch (err) {
      setStatus({
        server: "Error",
        database: "Error",
        llm: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (value, okValue) => {
    return value === okValue ? "text-green-600" : "text-red-600";
  };

  const getStatusBg = (value, okValue) => {
    return value === okValue ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";
  };

  const getStatusIcon = (value, okValue) => {
    return value === okValue ? "✓" : "✗";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Checking system health...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allHealthy = 
    status.server === "OK" && 
    status.database === "Connected" && 
    status.llm === "Working";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            System Status
          </h1>
          <p className="text-slate-600">
            Monitor the health of all system components
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* Overall Status Banner */}
          <div className={`rounded-lg p-4 mb-6 border ${
            allHealthy 
              ? "bg-green-50 border-green-200" 
              : "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {allHealthy ? "✓" : "⚠"}
              </span>
              <div>
                <h3 className={`font-semibold ${
                  allHealthy ? "text-green-900" : "text-red-900"
                }`}>
                  {allHealthy ? "All Systems Operational" : "System Issues Detected"}
                </h3>
                <p className={`text-sm ${
                  allHealthy ? "text-green-700" : "text-red-700"
                }`}>
                  {allHealthy 
                    ? "All components are running normally" 
                    : "One or more components need attention"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Server Status */}
            <div className={`rounded-lg p-5 border ${getStatusBg(status.server, "OK")}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🖥️</span>
                  <h4 className="font-medium text-slate-900">Server</h4>
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(status.server, "OK")}`}>
                  {getStatusIcon(status.server, "OK")}
                </span>
              </div>
              <p className={`text-sm font-semibold ${getStatusColor(status.server, "OK")}`}>
                {status.server}
              </p>
            </div>

            {/* Database Status */}
            <div className={`rounded-lg p-5 border ${getStatusBg(status.database, "Connected")}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗄️</span>
                  <h4 className="font-medium text-slate-900">Database</h4>
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(status.database, "Connected")}`}>
                  {getStatusIcon(status.database, "Connected")}
                </span>
              </div>
              <p className={`text-sm font-semibold ${getStatusColor(status.database, "Connected")}`}>
                {status.database}
              </p>
            </div>

            {/* LLM Status */}
            <div className={`rounded-lg p-5 border ${getStatusBg(status.llm, "Working")}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <h4 className="font-medium text-slate-900">LLM</h4>
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(status.llm, "Working")}`}>
                  {getStatusIcon(status.llm, "Working")}
                </span>
              </div>
              <p className={`text-sm font-semibold ${getStatusColor(status.llm, "Working")}`}>
                {status.llm}
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={fetchStatus}
              className="px-6 py-2.5 bg-purple-300 text-gray-700 font-medium rounded-lg hover:bg-purple-400 transition-colors flex items-center gap-2 text-sm"
            >
              <span>🔄</span>
              Refresh Status
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">About System Status</h4>
              <p className="text-sm text-blue-700">
                This page displays real-time health information for the server, database connection, 
                and LLM integration. Click "Refresh Status" to check again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;