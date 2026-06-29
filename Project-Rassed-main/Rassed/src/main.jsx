import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./contexts/UserContext";
import { ReceiptProvider } from "./contexts/ReceiptContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReceiptProvider>
      <UserContext>
        <App />
      </UserContext>
    </ReceiptProvider>
  </StrictMode>,
);
