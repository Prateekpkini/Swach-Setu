import React from "react";
import MapNavigator from "../components/Navigation/MapNavigator";
import Chatbot from "../components/Chatbot/Chatbot";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <MapNavigator />
      <Chatbot />
    </div>
  );
}
