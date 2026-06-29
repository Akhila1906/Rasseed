const { GoogleGenAI } = require("@google/genai");
const exp = require("express");
const vectorApp = exp.Router();

const GEMINI_API_KEY=process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});

const prompt= `You are a receipt-to-summary converter.  
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
]`

