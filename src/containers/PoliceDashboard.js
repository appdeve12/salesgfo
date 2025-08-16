import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const PoliceDashboard = () => {
  const socket = useSocket();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("woman-nearby", (data) => {
      console.log("🚨 Received alert:", data);

      setAlerts(prev => [data, ...prev]);

      // Optional browser notification
      if (Notification.permission === "granted") {
        new Notification("🚨 Woman Nearby", {
          body: `${data.woman.name} detected at ${data.woman.time}`,
        });
      } else {
        alert(`🚨 Woman nearby: ${data.woman.name}`);
      }
    });

    return () => {
      socket.off("woman-nearby");
    };
  }, [socket]);

  return (
    <div>
      <h2>👮 Police Live Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts yet</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <strong>{alert.woman.name}</strong> is nearby!
            <br />
            📍 {alert.woman.latitude}, {alert.woman.longitude}
            <br />
            ⏰ {alert.woman.date} {alert.woman.time}
            <br />
            📏 {alert.woman.distance}
          </div>
        ))
      )}
    </div>
  );
};

export default PoliceDashboard;
