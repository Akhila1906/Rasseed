import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  const [receipts, setReceipts] = useState([]);

  function addReceipt(newReceipt) {
    setReceipts((prev) => [newReceipt, ...prev]);
  }

  return (
    <ReceiptContext.Provider value={{ receipts, addReceipt }}>
      {children}
    </ReceiptContext.Provider>
  );
}

export function useReceipts() {
  return useContext(ReceiptContext);
}
