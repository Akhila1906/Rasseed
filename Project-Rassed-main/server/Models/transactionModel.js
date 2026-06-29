const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  billType: {
    type: String,
    enum: [
      'supermarket', 'medical', 'electricity', 'water', 'education',
      'transport', 'travel', 'entertainment', 'internet', 'telecom',
      'Food & Dining', 'other'
    ],
    required: true,
  },
  issuedDate: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
    trim: true,
  },
  recipientName: {
    type: String,
    trim: true,
  },
  issuerIdentifier: {
    type: String,
    trim: true,
    default: null,
  },
  issuerContact: {
    type: String,
    trim: true,
    default: null,
  },
  issuerAddress: {
    type: String,
    trim: true,
    default: null,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "upi", "wallet", "online", "other"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed", "partial"],
    default: "paid",
  },
  itemCount: {
    type: Number,
    min: [1, "Item count must be at least 1"],
    required: true,
  },
  baseAmount: {
    type: Number,
    min: [0, "Base amount cannot be negative"],
    default: 0,
  },
  taxAmount: {
    type: Number,
    min: [0, "Tax amount cannot be negative"],
    default: 0,
  },
  additionalFees: [
    {
      feeType: { type: String, required: true },
      amount: {
        type: Number,
        required: true,
        min: [0, "Fee amount cannot be negative"],
      },
    },
  ],
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Item",
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length > 0;
      },
      message: "Items array must contain at least one item",
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative"],
  },
  customAttributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  mediaUrl: {
    type: String,
    default: null,
  },
  walletPassId: {
    type: String,
    default: null,
  },
  reminderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reminder",
    default: null,
  },
  groupSpendingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupSpending",
    default: null,
  },
  isTaxEligible: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: String,
    default: "INR",
  },
  dueDate: {
    type: String,
    default: null,
  },
  connectedApp: {
    type: String,
    default: null,
  },
  summary: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
