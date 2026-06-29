import React from "react";

function Transactions() {
  const allTransactions = [
    {
      date: "2025-07-15",
      store: "Walmart",
      amount: 45.75,
      category: "Groceries",
    },
    { date: "2025-07-14", store: "Starbucks", amount: 5.2, category: "Dining" },
    {
      date: "2025-07-10",
      store: "Electricity Company",
      amount: 88.9,
      category: "Utilities",
    },
    { date: "2025-07-08", store: "Amazon", amount: 120.0, category: "Other" },
    {
      date: "2025-07-07",
      store: "Local Cafe",
      amount: 12.5,
      category: "Dining",
    },
    {
      date: "2025-07-05",
      store: "Gas Station",
      amount: 60.0,
      category: "Transport",
    },
    { date: "2025-07-01", store: "Pharmacy", amount: 25.0, category: "Health" },
    {
      date: "2025-06-28",
      store: "SuperMart",
      amount: 78.1,
      category: "Groceries",
    },
    {
      date: "2025-06-25",
      store: "Online Course",
      amount: 150.0,
      category: "Education",
    },
    {
      date: "2025-06-20",
      store: "Movie Theater",
      amount: 30.0,
      category: "Entertainment",
    },
    {
      date: "2025-06-18",
      store: "Bookstore",
      amount: 40.0,
      category: "Education",
    },
    {
      date: "2025-06-15",
      store: "Gym Membership",
      amount: 35.0,
      category: "Health",
    },
    {
      date: "2025-06-12",
      store: "Restaurant",
      amount: 75.0,
      category: "Dining",
    },
    {
      date: "2025-06-10",
      store: "Water Bill",
      amount: 32.5,
      category: "Utilities",
    },
    {
      date: "2025-06-05",
      store: "Clothing Store",
      amount: 90.0,
      category: "Luxury",
    },
  ];
  const taxItems = [
    { description: "Medical Expenses (e.g., Pharmacy - ₹25.00)" },
    { description: "Education Fees (e.g., Online Course - ₹150.00)" },
    { description: "Charitable Donations (if applicable)" },
  ];

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Your Transaction History</h1>
        <p className="mt-3 italic">Review and filter your past spending.</p>
      </section>
      <section className="mb-8 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="">
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="">
            <label
              htmlFor="categoryFilter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="categoryFilter"
              class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Luxury">Luxury</option>
              <option value="Transport">Transport</option>
              <option value="Dining">Dining</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </section>
      <section className="mb-8 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          All Transactions
        </h2>
        <div className="transaction-table-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="text-weigh px-6 py-3 text-left text-xs tracking-wider text-gray-500 uppercase"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs tracking-wider text-gray-500 uppercase"
                >
                  Store
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs tracking-wider text-gray-500 uppercase"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs tracking-wider text-gray-500 uppercase"
                >
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {allTransactions.map((transaction) => {
                const amountColor =
                  transaction.amount > 50 ? "text-red-600" : "text-green-600"; // Example: highlight larger expenses
                return (
                  <tr>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {transaction.store}
                    </td>
                    <td
                      className={`${amountColor} px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900`}
                    >
                      ₹{transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {transaction.category}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Tax-Eligible Items
        </h2>
        <div className="mb-6 space-y-3">
          {taxItems.map((item) => (
            <div className="flex items-center text-gray-700">
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
            Add to Google Wallet
          </button>
        </div>
      </section>
    </div>
  );
}

export default Transactions;
