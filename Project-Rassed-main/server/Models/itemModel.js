const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Unit price cannot be negative"],
  },
  category: {
    type: String,
    required: true,
  },
  itemSubType: {
    type: String,
    default: null,
  },
  unitMeasure: {
    type: {
      value: {
        type: Number,
        required: true,
        min: [0, "Measurement value cannot be negative"],
      },
      unit: {
        type: String,
        required: true,
        enum: ["gm", "kg", "m", "cm", "l", "ml", "kWh", "Mbps", "other"],
      },
    },
    required: false,
    default: null,
  },
  discountPercent: {
    type: Number,
    min: [0, "Discount percentage cannot be negative"],
    max: [100, "Discount percentage cannot exceed 100%"],
    default: 0,
  },
  discountAmount: {
    type: Number,
    min: [0, "Discount amount cannot be negative"],
    default: 0,
  },
  taxPercent: {
    type: Number,
    min: 0,
    default: 0,
  },
  taxAmount: {
    type: Number,
    min: [0, "Tax amount cannot be negative"],
    default: 0,
  },
  itemTotal: {
    type: Number,
    required: true,
    min: [0, "Item total cannot be negative"],
  },
  expiryDate: {
    type: String,
    default: null,
  },
  taxEligible: {
    type: Boolean,
    default: function () {
      return ["Health & Medical", "Travel & Lodging"].includes(this.category);
    },
  },
  customAttributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});
module.exports = mongoose.model("Item", itemSchema);
