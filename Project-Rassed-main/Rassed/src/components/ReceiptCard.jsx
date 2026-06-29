import React, { useState } from "react";

function ReceiptCard({ bill }) {
  const {
    transactionId,
    billType,
    issuedDate,
    issuer,
    recipientName,
    issuerIdentifier,
    issuerContact,
    issuerAddress,
    paymentMethod,
    paymentStatus,
    baseAmount,
    taxAmount,
    totalAmount,
    currency,
    summary,
    items,
    notes,
    originalFileDataUrl,   
    originalFileType,      
  } = bill;

  const isPaid = paymentStatus?.toLowerCase() === "paid";
  const [showOriginal, setShowOriginal] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) =>
    `${currency || "INR"} ${Number(amount ?? 0).toFixed(2)}`;

  const hasInlineFile = !!originalFileDataUrl;
  const isImage = originalFileType?.startsWith("image/");
  const isPdf = originalFileType === "application/pdf";

  return (
    <div className="mx-auto my-8 max-w-5xl px-4">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-[1px] shadow-2xl shadow-slate-900/80">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400/20 via-violet-500/20 to-emerald-400/20 blur-xl" />

        {/* Inner card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
          {/* Accent bar */}
          <div className="h-1 w-full rounded-t-3xl bg-gradient-to-r from-sky-400 via-violet-500 to-emerald-400" />

          {/* Header */}
          <div className="flex flex-col gap-4 px-6 pb-2 pt-4 md:flex-row md:justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-wide text-slate-50">
                {issuer}
              </h1>
              <p className="mt-1 max-w-xl text-xs text-slate-400">
                {issuerAddress}
              </p>
            </div>

            <div className="text-right">
              <span className="block text-xs text-slate-400">Total</span>
              <div className="mt-1 text-2xl font-bold text-slate-50">
                {formatCurrency(totalAmount)}
              </div>
              <span
                className={[
                  "mt-2 inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                  isPaid
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                    : "border-rose-400/40 bg-rose-500/10 text-rose-300",
                ].join(" ")}
              >
                {isPaid ? "Paid" : "Due"}
              </span>
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4 px-6 pb-4 text-xs md:grid-cols-4">
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Transaction ID
              </div>
              <div className="break-all text-slate-100">{transactionId}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Issued On
              </div>
              <div className="text-slate-100">{formatDate(issuedDate)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Bill Type
              </div>
              <span className="inline-flex rounded-full border border-slate-600/70 bg-slate-900/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-100">
                {billType || "Other"}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Payment Method
              </div>
              <span className="inline-flex rounded-full border border-slate-600/70 bg-slate-900/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-100">
                {paymentMethod || "Other"}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Parties */}
          <div className="flex flex-col gap-6 px-6 py-4 text-xs md:flex-row">
            <div className="flex-1 space-y-1">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                From
              </h2>
              <p className="text-sm font-medium text-slate-100">{issuer}</p>
              <p className="text-slate-400">GSTIN: {issuerIdentifier}</p>
              <p className="text-slate-400">{issuerContact}</p>
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                To
              </h2>
              <p className="text-sm font-medium text-slate-100">
                {recipientName}
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Items */}
          <div className="px-6 pb-3 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                Items
              </h2>
              <span className="text-[11px] text-slate-500">
                {items?.length || 0} items
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-slate-900/90">
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      #
                    </th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Item
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Qty
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Unit
                    </th>
                    <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item, index) => (
                    <tr
                      key={`${item.itemName}-${index}`}
                      className={
                        index % 2 === 0
                          ? "bg-slate-950/80"
                          : "bg-slate-900/80"
                      }
                    >
                      <td className="px-3 py-2 align-top text-slate-300">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <div className="font-bold text-slate-100 ">
                          {item.itemName}
                        </div>
                        <div className="mt-0.5 text-[15px] text-slate-500">
                          {item.category || ""}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right align-top text-slate-200">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-2 text-right align-top text-slate-200">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-3 py-2 text-right align-top text-slate-50">
                        {formatCurrency(item.itemTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 pb-4 pt-2 text-sm">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Base Amount</span>
                <span className="text-slate-100">
                  {formatCurrency(baseAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Tax</span>
                <span className="text-slate-100">
                  {formatCurrency(taxAmount)}
                </span>
              </div>

              <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />

              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-100">Total Payable</span>
                <span className="text-slate-50">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-3 border-t border-slate-800/80 px-6 pb-5 pt-2 text-xs">
            {summary && (
              <p className="text-[11px] leading-relaxed text-slate-400">
                {summary}
              </p>
            )}

            {notes && (
              <details className="group text-[11px] text-slate-400">
                <summary className="inline-flex cursor-pointer items-center text-[11px] font-medium text-violet-300">
                  View extraction notes
                  <span className="ml-1 text-[9px] transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <p className="mt-1 text-[11px] text-slate-400">{notes}</p>
              </details>
            )}

            {/* 🔥 View original bill without external URL */}
            {hasInlineFile && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowOriginal((v) => !v)}
                  className="inline-flex items-center rounded-full bg-slate-800 px-4 py-2 text-[11px] font-medium text-sky-200 hover:bg-slate-700 transition"
                >
                  {showOriginal ? "Hide original bill" : "View original bill"}
                </button>

                {showOriginal && (
                  <div className="mt-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    {isImage && (
                      <img
                        src={originalFileDataUrl}
                        alt="Original bill"
                        className="max-h-[500px] w-full rounded-xl object-contain"
                      />
                    )}

                    {isPdf && (
                      <iframe
                        src={originalFileDataUrl}
                        title="Original bill PDF"
                        className="h-[500px] w-full rounded-xl border border-slate-700"
                      />
                    )}

                    {!isImage && !isPdf && (
                      <p className="text-[11px] text-slate-400">
                        Original file attached, but preview is not supported for
                        this file type.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptCard;
