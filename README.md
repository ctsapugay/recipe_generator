# Recipe Generator

## Overview
Recipe Generator is an AI-powered web application that generates personalized meal recipes based on user input. Enter the flavors or types of food you're craving, and the app uses OpenAI's GPT-3.5 to create three unique, delicious recipes tailored to your preferences. Each recipe includes ingredients, measurements, and step-by-step cooking instructions.

## ⚠️ Security Warning
**Never commit your OpenAI API key to the repository!** 
- The `.env` file containing your API key is automatically ignored by Git
- If you accidentally commit your API key, immediately rotate it in your OpenAI account
- Use `.env.example` as a template for your own `.env` file

## Features
- **AI-Powered Recipe Generation**: Uses OpenAI's GPT-3.5 to create unique recipes based on your input
- **Dynamic Content**: Recipes are generated in real-time based on your flavor preferences
- **Smart Matching**: Enter any cuisine, ingredient, or flavor profile (e.g., "spicy Mexican", "Italian comfort food", "quick breakfast")
- **Recipe Previews**: See a preview of each recipe before expanding
- **Full Recipe Details**: Expand any recipe to view complete ingredients and step-by-step instructions
- **Generate Different Recipes**: Get new AI-generated recipes with a single click
- **Responsive Design**: Clean, modern UI that works on all devices
- **Fallback System**: Gracefully handles API errors with curated fallback recipes

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-3.5-turbo API
- **Styling**: CSS with responsive design

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- OpenAI API key (get one at [OpenAI Platform](https://platform.openai.com/account/api-keys))

### 1. Clone and Setup Frontend
```sh
git clone https://github.com/ctsapugay/recipe_generator.git
cd recipe_generator/recipe_generator
npm install
```

### 2. Setup Backend
```sh
cd ../backend
npm install
```

### 3. Configure OpenAI API
**Important**: Create your own `.env` file in the `backend` directory:
```sh
cd backend
cp .env.example .env
# Then edit .env and replace 'your_api_key_here' with your actual OpenAI API key
```

Or manually create the `.env` file:
```sh
echo "OPENAI_API_KEY=your_actual_openai_api_key_here" > .env
```

### 4. Start the Servers

**Start the Backend (API Server):**
```sh
cd backend
npm start
```
The backend will run on `http://localhost:3001`

**Start the Frontend (in a new terminal):**
```sh
cd recipe_generator/recipe_generator
npm run dev
```
The frontend will run on `http://localhost:5173`

### 5. Usage
1. Open `http://localhost:5173` in your browser
2. Enter a flavor prompt (e.g., "spicy Mexican", "Italian comfort food", "quick breakfast")
3. Click **Generate Recipes** to get AI-generated recipes
4. Browse the three suggested recipes with previews
5. Click **Expand** to see full ingredients and instructions
6. Click **Generate Different Recipes** to get new AI suggestions
7. Click **Back to Prompt Screen** to try a new flavor

## API Endpoints

### POST `/api/generate-recipes`
Generates 3 unique recipes based on user input.

**Request Body:**
```json
{
  "prompt": "spicy Mexican"
}
```

**Response:**
```json
{
  "recipes": [
    {
      "id": "1234567890",
      "name": "Recipe Name",
      "ingredients": ["ingredient 1", "ingredient 2", ...],
      "instructions": ["step 1", "step 2", ...]
    }
  ]
}
```

## Customization
- **Add More Recipes**: Extend the fallback recipes in `src/App.jsx`
- **Modify AI Prompts**: Update the system prompt in `backend/server.js`
- **Change AI Model**: Switch to GPT-4 or other OpenAI models in `backend/server.js`
- **Add Features**: Implement recipe saving, sharing, or dietary restrictions

## Troubleshooting
- **API Errors**: Check your OpenAI API key and billing status
- **Connection Issues**: Ensure both frontend and backend servers are running
- **CORS Errors**: The backend includes CORS configuration for local development

## Cost Considerations
- OpenAI API charges per token (words in/out)
- GPT-3.5-turbo is very affordable (~$0.002 per 1K tokens)
- New users get free trial credits
- See [OpenAI Pricing](https://openai.com/pricing) for current rates

---

**Enjoy discovering new meal ideas with AI-powered Recipe Generator!** 🍳✨
