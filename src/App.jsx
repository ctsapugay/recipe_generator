import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Fallback recipes in case API is not available
const fallbackRecipes = [
  {
    id: '1',
    name: 'Spaghetti alla Puttanesca',
    ingredients: [
      '2 tablespoons olive oil',
      '1/2 cup chopped onion',
      '3 cloves garlic',
      '4 canned anchovies',
      '2 tablespoons tomato paste',
      '1/2 teaspoon red pepper flakes',
      '1 can crushed tomatoes',
      '2 teaspoons dried oregano',
      '2 tablespoons capers',
      '3/4 cup pitted olives',
      '1 pound spaghetti',
    ],
    instructions: [
      'Bring a large pot of salted water to a boil and cook the pasta until al dente.',
      "Heat the olive oil over medium heat in a large, deep sauté pan. When the oil is hot, cook the onions until they're soft and translucent, about 4 to 5 minutes. While the onions are cooking, add in the chopped anchovies along with some of their oil from the can. Add the finely chopped garlic and cook another minute.",
      'Mix in the tomato paste and cook for 2 minutes, stirring occasionally. Add the crushed tomatoes, oregano, chili pepper flakes, olives, and capers. Bring the sauce to a simmer, then lower the heat to low to maintain a gentle simmer, 10 to 15 minutes.',
      'Pour the sauce over the pasta and enjoy!',
    ],
  },
  {
    id: '2',
    name: 'Blueberry Muffins',
    ingredients: [
      '1 1/2 cups all-purpose flour',
      '3/4 cup sugar',
      '1/2 teaspoon salt',
      '2 teaspoons baking powder',
      '1/3 cup vegetable oil',
      '1 egg',
      '1/3 cup milk',
      '1 cup fresh blueberries',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Grease a muffin pan or line with muffin liners.',
      'Combine flour, sugar, salt, and baking powder in a bowl.',
      'In another bowl, mix vegetable oil, egg, and milk. Add to dry ingredients and mix until just combined.',
      'Fold in blueberries. Fill muffin cups and bake for 20-25 minutes.',
    ],
  },
  {
    id: '3',
    name: 'Shrimp Tacos',
    ingredients: [
      '1 pound shrimp, peeled and deveined',
      '2 tablespoons olive oil',
      '1 teaspoon chili powder',
      '1/2 teaspoon cumin',
      '1/2 teaspoon garlic powder',
      '1/4 teaspoon cayenne pepper',
      '8 small tortillas',
      '1 cup shredded cabbage',
      '1/2 cup sour cream',
      '1 lime, cut into wedges',
    ],
    instructions: [
      'Toss shrimp with olive oil and spices. Cook in a skillet over medium-high heat until pink, about 2-3 minutes per side.',
      'Warm tortillas. Fill with shrimp, cabbage, and a dollop of sour cream. Serve with lime wedges.',
    ],
  },
]

async function generateRecipesFromAPI(prompt) {
  try {
    console.log('Calling API with prompt:', prompt);
    
    const response = await fetch('http://localhost:3001/api/generate-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.recipes || !Array.isArray(data.recipes)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid response format from API');
    }
    
    return data.recipes;
  } catch (error) {
    console.error('Error calling API:', error);
    console.log('Falling back to mock recipes');
    // Return fallback recipes if API fails
    return fallbackRecipes;
  }
}

function PromptScreen({ setPrompt, onGenerate, setIsLoading }) {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setPrompt(input)
    
    try {
      const recipes = await generateRecipesFromAPI(input)
      onGenerate(input, recipes)
    } catch (error) {
      console.error('Failed to generate recipes:', error)
      onGenerate(input, fallbackRecipes)
    } finally {
      setIsLoading(false)
    }
    
    navigate('/recipes')
  }

  return (
    <div className="background prompt-screen">
      <div className="prompt-container">
        <h1 className="title">Recipe Generator</h1>
        <h2 className="subtitle">What flavors are you feeling today?</h2>
        <form onSubmit={handleSubmit} className="prompt-form">
          <input
            type="text"
            className="prompt-input"
            placeholder="e.g. spicy, sweet, Italian, comfort food..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <button type="submit" className="generate-btn">Generate Recipes</button>
        </form>
      </div>
    </div>
  )
}

function RecipesScreen({ prompt, shownRecipes, setShownRecipes, isLoading, setIsLoading }) {
  const navigate = useNavigate()

  const handleGenerateDifferent = async () => {
    setIsLoading(true)
    try {
      const recipes = await generateRecipesFromAPI(prompt)
      setShownRecipes(recipes)
    } catch (error) {
      console.error('Failed to generate different recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="background recipes-screen">
        <div className="recipes-container">
          <h1 className="title">Generating Recipes...</h1>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="background recipes-screen">
      <div className="recipes-container">
        <h1 className="title">Your Recipes</h1>
        {prompt && <p className="prompt-display">Based on: "{prompt}"</p>}
        <div className="recipes-list">
          {shownRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.id}>
              <div className="recipe-info">
                <h2 className="recipe-name">{recipe.name}</h2>
                <div className="recipe-preview">
                  <p><strong>Ingredient:</strong> {recipe.ingredients[0]}</p>
                  <p><strong>Step:</strong> {recipe.instructions[0].split('.').slice(0,1)[0]}.</p>
                </div>
                <button className="expand-btn" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                  Expand
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="recipes-actions">
          <button className="generate-btn" onClick={handleGenerateDifferent}>Generate Different Recipes</button>
          <button className="back-btn" onClick={handleBack}>Back to Prompt Screen</button>
        </div>
      </div>
    </div>
  )
}

function RecipeDetailScreen({ shownRecipes }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = shownRecipes.find(r => r.id === id)

  if (!recipe) {
    return <div className="background"><div className="prompt-container"><h2>Recipe not found.</h2></div></div>
  }

  const handleBack = () => {
    navigate('/recipes')
  }
  const handleGenerateDifferent = () => {
    window.location.reload()
  }
  const handlePromptScreen = () => {
    navigate('/')
  }

  return (
    <div className="background detail-screen">
      <div className="detail-container">
        <h1 className="title">{recipe.name}</h1>
        <div className="detail-content">
          <div className="detail-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
          <div className="detail-section">
            <h2>Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          </div>
        </div>
        <div className="recipes-actions">
          <button className="back-btn" onClick={handleBack}>Back</button>
          <button className="generate-btn" onClick={handleGenerateDifferent}>Generate Different Recipes</button>
          <button className="back-btn" onClick={handlePromptScreen}>Back to Prompt Screen</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [shownRecipes, setShownRecipes] = useState(fallbackRecipes)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = (input, recipes) => {
    setShownRecipes(recipes)
  }

  return (
    <Routes>
      <Route path="/" element={<PromptScreen setPrompt={setPrompt} onGenerate={handleGenerate} setIsLoading={setIsLoading} />} />
      <Route path="/recipes" element={<RecipesScreen prompt={prompt} shownRecipes={shownRecipes} setShownRecipes={setShownRecipes} isLoading={isLoading} setIsLoading={setIsLoading} />} />
      <Route path="/recipes/:id" element={<RecipeDetailScreen shownRecipes={shownRecipes} />} />
    </Routes>
  )
}

export default App
