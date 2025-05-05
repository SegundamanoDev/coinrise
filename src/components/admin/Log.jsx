import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../features/log/logsSlice";
import AdminLayout from "../admin/AdminLayout";

const statusColor = {
  info: "text-blue-400",
  success: "text-green-400",
  pending: "text-yellow-400",
  warning: "text-red-400",
};

const Logs = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.logs);

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const filteredLogs =
    filter === "All" ? logs : logs.filter((log) => log.type === filter);

  const uniqueTypes = ["All", ...new Set(logs.map((log) => log.type))];

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Logs & Notifications
      </h2>

      {loading && <p className="text-gray-300">Loading logs...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && logs.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Type
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-64 bg-[#111827] border border-[#374151] text-white p-2 rounded focus:outline-none focus:ring-yellow-400"
          >
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg">
        <ul className="space-y-4">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <li key={log.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${statusColor[log.status]}`}>
                      {log.type}
                    </p>
                    <p className="text-gray-300 text-sm">{log.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                </div>
                <hr className="border-[#374151] mt-3" />
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No logs found.</p>
          )}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Logs;
