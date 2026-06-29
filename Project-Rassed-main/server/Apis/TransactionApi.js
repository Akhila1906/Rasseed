const { GoogleGenAI } = require("@google/genai");
const exp = require("express");
const transactionApp = exp.Router();
const Transaction = require("../Models/transactionModel");
const Item = require("../Models/itemModel");
const User = require("../Models/userModel");
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log(GEMINI_API_KEY)
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// const prompt= You are a data-to-text conversion engine. You will be given one or more receipts in JSON format. Your task is to create a meaningful, self-contained, natural language summary for EACH purchased item.

// Instructions:
// 1. Use details from the following fields: items[], issuer, issuedDate, category, paymentMethod, currency, and quantities/prices.
// 2. Also incorporate relevant information from the receipt-level "summary" and "notes" fields to make the sentence more descriptive, if available.
// 3. Include:
//    - Item name
//    - Quantity
//    - Unit price (with currency symbol and decimal precision exactly as in data)
//    - Total item price (with currency symbol and decimal precision exactly as in data)
//    - Store/issuer name
//    - Purchase date
//    - Category (use from item; if null, use itemSubType; if both null, omit it)
//    - Payment method (exact as in data)
//    - Any relevant context from "summary" and "notes" without copying them word-for-word — integrate them meaningfully.

// 4. Make each summary a natural, easy-to-read sentence in this style:
//    "<itemName> was purchased from <issuer> on <issuedDate> for <currency><unitPrice> each (quantity <quantity>, total <currency><itemTotal>), falling under <category>. Payment was made via <paymentMethod>. <Any additional relevant info from summary/notes>"

// 5. Ensure every summary can be understood without referencing the rest of the receipt.

// 6. Output only valid JSON in the following format:
// [
//   {
//     "itemName": "<item name>",
//     "summary": "<generated meaningful summary>"
//   },
//   ...
// ]

// Do not include extra commentary, markdown, or explanation — only output the JSON array.

// ---

// Now process the following receipt JSON:
// <RECEIPT_JSON>
//

// const prompt= You are a receipt-to-summary converter.
// Your task is to read the structured receipt JSON and produce one self-contained natural language summary for each purchased item, formatted for high-accuracy semantic search in a vector database.

// You must:

// Use information from the receipt JSON fields directly.

// Also check the summary and notes fields for any extra useful context (e.g., tax details, brand names, special instructions) that can be added to make the item description more complete.

// Rules for the summary:

// Include these details:

// Quantity and unit (if available)

// Item name (as written in the receipt)

// Store/vendor name

// Purchase date (in full month-day-year format)

// Unit price (with currency)

// Total price (with currency)

// Category (if available)

// Payment method (if available)

// Any relevant details from summary or notes that make the item more descriptive

// Write in one complete grammatical sentence.

// Avoid abbreviations or shorthand (e.g., use “quantity” not “qty”).

// Ensure each summary is self-contained so it makes sense without the rest of the receipt.

// Keep a consistent structure:

// "[Quantity and unit] of [item name] purchased from [store name] on [date], unit price [unit price], total price [total price], category [category], paid via [payment method]. [Extra note if available.]"

// Output format: Return a JSON array where each element is an object with:

// [
//   {
//     "itemName": "Tomatoes",
//     "summary": "Two kilograms of tomatoes purchased from FRESH MART on July 10, 2025, unit price ₹40.00, total price ₹80.00, category Groceries, paid via credit card. Fresh produce, locally sourced."
//   }
// ]

// If data for a field is missing, omit that part of the sentence but keep grammar correct.
// Do not invent data

const prompt = `You are a receipt-to-summary converter.  
Your task is to read the structured receipt JSON and produce **one self-contained natural language summary** for each purchased item, optimized for **high-accuracy semantic search in a vector database**.

---

### Rules for the summary

- **Use exact data from the receipt JSON fields** without inventing missing information.

- Always **normalize formats**:
  - Dates:  Month DD, YYYY  (e.g., June 3, 2024)
  - Prices: include currency symbol and two decimal places (e.g., ₹31.00)
  - Units: spell out in full (“kilogram”, “gram”, “litre”), never abbreviations like “kg” or “gm”.

- Include **all alternate item names** and variations exactly as written in the receipt (retain text in parentheses or separated by dashes). This ensures synonyms are captured for search.

- Always include the **store/vendor name** and **category** near the start of the sentence for better query matching.

- Pull in **relevant receipt-level context** from  "summary"  or  "notes"  when it applies to all items, such as: “Part of a supermarket purchase including multiple grocery items.” or “Additional fees: Delivery Charges ₹0.00, Handling Charges ₹5.00.”

- Maintain **consistent sentence structure** across all items.

---

### Required summary structure:

"From [store name], [quantity and unit in full words] of [item name with all alternate names] purchased on [full date], unit price [unit price with currency], total price [total price with currency], category [category], paid via [payment method]. [Relevant extra context from receipt summary or notes.]"

If data for a field is missing, omit that part but keep the sentence grammatically correct.

---

### Output format:

Return a **JSON array** where each element is an object with:

[
  {
    "itemName": "[Exact item name from receipt]",
    "summary": "[Complete optimized sentence as per the structure]",
    "searchTerms": ["list", "of", "lowercase", "keywords", "and", "synonyms"]
  }
]
   

-  "searchTerms"  should be a lowercase array of useful keywords and synonyms for the item, vendor, and category to improve recall (e.g., for “Onion Red - Ullipaya - Pyaaz”, include  ["onion", "red onion", "ullipaya", "pyaaz", "vegetable", "grocery", "vijetha jsr mall"] ).

---

### Example

**Input receipt item:**
{
  "itemName": "Onion Red - Ullipaya - Pyaaz (1 kg)",
  "quantity": 1,
  "unitPrice": 31.0,
  "category": "Grocery & Essentials",
  "unitMeasure": {
    "value": 1,
    "unit": "kg"
  }
}

**Output:**
[
  {
    "itemName": "Onion Red - Ullipaya - Pyaaz (1 kg)",
    "summary": "From Vijetha JSR Mall, one kilogram of Onion Red - Ullipaya - Pyaaz purchased on June 3, 2024, unit price ₹31.00, total price ₹31.00, category Grocery & Essentials, paid via online. Part of a supermarket purchase including multiple grocery items. Additional fees: Delivery Charges ₹0.00, Handling Charges ₹5.00.",
    "searchTerms": ["onion", "red onion", "ullipaya", "pyaaz", "vegetable", "grocery", "vijetha jsr mall"]
  }
]`;

transactionApp.get("/transactions", async (req, res) => {
  const result = await Transaction.find();

  res.send({ mes: "data", payload: result });
});

transactionApp.get("/test", async (req, res) => {
  const response = await axios.post("http://127.0.0.1:8000/process", {
    name: "Korasikha",
    age: 20,
  });

  // console.log("Response:", response.data);
  res.send({ mes: "hello", payload: response.data });
});

// transactionApp.post("/bill", async (req, res) => {
//   try {
//     const data = req.body;
//     const roi = await User.findOne({ clerkId: data.userId });
//     data.userId = roi._id;
//     // console.log("updated data",data);
//     if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
//       return res.status(400).json({ error: "At least one item is required." });
//     }
//     const savedItemIds = [];
//     for (const item of data.items) {
//       const itemDoc = new Item({
//         ...item,
//         billId: null,
//       });
//       const savedItem = await itemDoc.save();
//       savedItemIds.push(savedItem._id);
//     }
//     const transaction = new Transaction({
//       ...data,
//       items: savedItemIds,
//     });

//     const savedTransaction = await transaction.save();
//     await Item.updateMany(
//       { _id: { $in: savedItemIds } },
//       { $set: { billId: savedTransaction._id } }
//     );
//     const fullContent = prompt + JSON.stringify(data);
//     console.log(fullContent);

//     console.log("start");
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash-lite",
//       contents: fullContent,
//     });

//     const cleanText = response.text
//       .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
//       .trim();
//     console.log(response.text);
//     console.log(cleanText);

//     const dataObj = JSON.parse(cleanText);
//     console.log(dataObj);
//     const updated = dataObj.map((obj) => {
//       const match = Item.find(
//         (it) =>
//           it.itemName === obj.itemName &&
//           it.billId.$oid === savedTransaction._id.$oid
//       );

//       return {
//         ...obj,
//         itemId: match ? match._id.$oid : null,
//       };
//     });
//     updated.billId=savedTransaction._id.$oid

//     const pyres = await axios.post("http://127.0.0.1:8000/process", updated);

//     res.status(201).json({
//       message: "Transaction created successfully",
//       transaction: savedTransaction,
//     });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
transactionApp.post("/bill", async (req, res) => {
  try {
    const data = req.body;
    const roi = await User.findOne({ clerkId: data.userId });
    data.userId = roi._id;

    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return res.status(400).json({ error: "At least one item is required." });
    }

    const savedItemIds = [];
    for (const item of data.items) {
      const itemDoc = new Item({
        ...item,
        billId: null,
      });
      const savedItem = await itemDoc.save();
      savedItemIds.push(savedItem._id);
    }

    const transaction = new Transaction({
      ...data,
      items: savedItemIds,
    });

    const savedTransaction = await transaction.save();

    await Item.updateMany(
      { _id: { $in: savedItemIds } },
      { $set: { billId: savedTransaction._id } }
    );

    const fullContent = prompt + JSON.stringify(data);
    console.log(fullContent);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: fullContent,
    });

    const cleanText = response.text
      .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
      .trim();

    const dataObj = JSON.parse(cleanText);

    // ✅ Fetch all items of this bill ONCE
    const itemsList = await Item.find({ billId: savedTransaction._id });

    // ✅ Match each obj to the correct item doc
    const updated = dataObj.map((obj) => {
      const match = itemsList.find((it) => it.itemName === obj.itemName);

      return {
        ...obj,
        itemId: match ? match._id.toString() : null,
      };
    });

    // add billId once (not on array, but attach as property)
    const payload = { billId: savedTransaction._id.toString(), items: updated };

    console.log(payload);
    

    const pyres = await axios.post("http://127.0.0.1:8000/process", payload);

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = transactionApp;
