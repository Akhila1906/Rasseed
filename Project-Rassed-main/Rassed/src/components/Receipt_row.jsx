import React, { useEffect, useState } from "react";
import ReceiptCard from "./ReceiptCard";

function Receipt_row({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);


useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";   // prevent background scroll
  } else {
    document.body.style.overflow = "auto";     // restore scroll
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isModalOpen]);


  const { issuer, issuedDate, totalAmount, currency = "INR" } = data;

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Row Display */}
      <div
        className="flex cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm transition hover:shadow-md md:flex-row"
        onClick={openModal}
      >
        <div className="mb-2 text-center md:mr-4 md:mb-0 md:text-left">
          <p className="text-lg font-semibold text-gray-800">{issuer}</p>
          <p className="text-sm text-gray-500">{formatDate(issuedDate)}</p>
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <span className="text-xl font-bold text-green-600">
            ₹{totalAmount}
          </span>

          <button
            className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition duration-300 ease-in-out hover:bg-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Google Wallet
          </button>

          <button
            className="flex items-center justify-center rounded-full bg-purple-500 px-4 py-2 text-sm text-white shadow-md transition duration-300 ease-in-out hover:bg-purple-600"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            View Bill
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="animate-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Modal Body */}
          <div
            className="animate-modal-card relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              ✕
            </button>

            {/* Show receipt card */}
            <ReceiptCard bill={data} />
          </div>
        </div>
      )}
    </>
  );
}

export default Receipt_row;
