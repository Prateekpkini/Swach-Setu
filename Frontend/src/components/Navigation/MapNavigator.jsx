import React, { useState } from "react";
import { findShortestPath } from "./RouteOptimizer";

const sampleGraph = {
  A: { B: 2, C: 4 },
  B: { A: 2, D: 7 },
  C: { A: 4, D: 1 },
  D: { B: 7, C: 1, E: 3 },
  E: { D: 3 }
};

export default function MapNavigator() {
  const [result, setResult] = useState(null);

  const handleOptimize = () => {
    const res = findShortestPath(sampleGraph, "A", "E");
    setResult(res);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">🚛 MRF Truck Route Optimizer</h2>
      <button
        onClick={handleOptimize}
        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
      >
        Optimize Route
      </button>
      {result && (
        <div className="mt-3">
          <p>Shortest Path: {result.path.join(" → ")}</p>
          <p>Total Distance: {result.distance}</p>
        </div>
      )}
    </div>
  );
}
