import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

const mockRecipes = [
  {
    id: '1',
    name: 'Spaghetti alla Puttanesca',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
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

function PromptScreen() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
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
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            required
          />
          <button type="submit" className="generate-btn">Generate Recipes</button>
        </form>
      </div>
    </div>
  )
}

function RecipesScreen() {
  const navigate = useNavigate()

  const handleExpand = (id) => {
    navigate(`/recipes/${id}`)
  }

  const handleGenerateDifferent = () => {
    window.location.reload()
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="background recipes-screen">
      <div className="recipes-container">
        <h1 className="title">Your Recipes</h1>
        <div className="recipes-list">
          {mockRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <div className="recipe-info">
                <h2 className="recipe-name">{recipe.name}</h2>
                <button className="expand-btn" onClick={() => handleExpand(recipe.id)}>
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

function RecipeDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = mockRecipes.find(r => r.id === id)

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
        <img src={recipe.image} alt={recipe.name} className="detail-image" />
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
  return (
    <Routes>
      <Route path="/" element={<PromptScreen />} />
      <Route path="/recipes" element={<RecipesScreen />} />
      <Route path="/recipes/:id" element={<RecipeDetailScreen />} />
    </Routes>
  )
}

export default App
