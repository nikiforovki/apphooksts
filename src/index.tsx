import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Элемент с id 'root' не найден");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
