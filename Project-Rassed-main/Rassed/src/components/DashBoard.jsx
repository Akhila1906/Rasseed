import React  from "react";
import PieChart_Component from "./PieChart_Component";
import Receipt_row from "./Receipt_row";
import { useReceipts } from "../contexts/ReceiptContext";

function DashBoard() {
  const { receipts } = useReceipts();

 

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Your Financial Dashboard</h1>
        <p className="mt-3 italic">
          A quick overview of your spending and important reminders.
        </p>
      </section>
      <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Spending Overview
        </h2>

        <PieChart_Component />
      </div>

      <section className="rounded-xl bg-white p-6 shadow-lg lg:col-span-2">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Recent Receipts
        </h2>

        <div className="space-y-4">
          {receipts.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No receipts yet. Upload one!
            </p>
          ) : (
            receipts.map((r, i) => <Receipt_row key={i} data={r} />)
          )}
        </div>
      </section>

      <section className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Savings Suggestions
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-5 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-green-700">
              Cut Down on Coffee
            </h4>
            <p className="text-gray-600">
              Switch to making coffee at home instead of buying it daily. You
              could save up to $50 a month!
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-5 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-purple-700">
              Review Subscriptions
            </h4>
            <p className="text-gray-600">
              Check your monthly subscriptions and cancel any you no longer use.
              Unused services cost you money!
            </p>
          </div>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-5 shadow-sm">
            <h4 className="mb-2 text-lg font-semibold text-orange-700">
              Plan Your Meals
            </h4>
            <p className="text-gray-600">
              Meal planning helps reduce food waste and impulse grocery
              purchases, leading to significant savings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashBoard;
