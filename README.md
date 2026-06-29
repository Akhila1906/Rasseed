# RASSED – Smart Receipt & Expense Intelligence System

## Project Overview
RASSED is an AI-powered receipt management and expense analysis platform designed to help users organize their spending digitally and gain meaningful financial insights. The system uses OCR-based extraction to read uploaded bills and receipts, classifies purchased items into categories, stores structured data in a database, and provides intelligent summaries and search capabilities.

The platform helps users understand:
- Monthly and category-wise expenses
- Frequently purchased products
- Essential vs non-essential spending patterns
- Purchase trends and spending habits
- Semantic search over historical receipt data
- 
## Key Functionalities
- OCR-based receipt text extraction
- Intelligent expense classification
- Semantic search over receipt data
- AI-powered spending analysis
- Category-wise expense tracking
- Purchase trend and financial habit analysis

## Technologies Used
- React.js
- Vite
- Tailwind CSS
- Material UI
- Node.js
- Express.js
- MongoDB
- Google Generative AI
- OCR-based data extraction
- Semantic search and vector-based retrieval

## GitHub Repository
Repository Link: https://github.com/akhila1906/rasseed

## Project Structure
- Frontend: Rassed/
- Backend: server/
- Database models: server/Models/
- API routes: server/Apis/

## Setup Instructions
### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Project-Rassed
```

### 2. Frontend setup
```bash
cd Rassed
npm install
npm run dev
```

The frontend will run on the Vite local development server.

### 3. Backend setup
```bash
cd ../server
npm install
node server.js
```

The backend server will start on the configured port (default: 4000).

```

## Additional Notes
- The application is designed for smart receipt digitization and expense intelligence.
- The backend currently handles user sync, transaction storage, and AI-assisted receipt processing.
- Make sure MongoDB is reachable before running the server.
- If you plan to extend semantic search features, additional vector database and embedding services may be integrated in future versions.

## Results Achieved
- Automated bill data extraction and expense tracking
- Improved search experience using semantic similarity matching
- Faster retrieval of purchase information from large datasets
- Meaningful spending insights for users
- Scalable AI-driven expense intelligence platform
