import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
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
  {
    id: '4',
    name: 'Caprese Salad',
    ingredients: [
      '2 large tomatoes',
      '8 oz fresh mozzarella',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Slice tomatoes and mozzarella. Layer with basil leaves. Drizzle with olive oil, sprinkle with salt and pepper, and serve.',
    ],
  },
  {
    id: '5',
    name: 'Chicken Stir Fry',
    ingredients: [
      '2 chicken breasts',
      '2 cups mixed vegetables',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '1 clove garlic',
    ],
    instructions: [
      'Cut chicken into strips and cook in sesame oil. Add garlic and vegetables, stir fry, then add soy sauce and cook until done.',
    ],
  },
  {
    id: '6',
    name: 'Classic Pancakes',
    ingredients: [
      '1 cup flour',
      '2 tbsp sugar',
      '1 cup milk',
      '1 egg',
      '2 tbsp butter',
    ],
    instructions: [
      'Mix dry and wet ingredients separately, then combine. Cook on a griddle until golden brown on both sides.',
    ],
  },
  {
    id: '7',
    name: 'Greek Salad',
    ingredients: [
      '2 cups chopped cucumber',
      '2 cups chopped tomatoes',
      '1/2 cup feta cheese',
      '1/4 cup olives',
      '2 tbsp olive oil',
    ],
    instructions: [
      'Combine all ingredients in a bowl, toss with olive oil, and serve chilled.',
    ],
  },
  {
    id: '8',
    name: 'Vegetable Soup',
    ingredients: [
      '4 cups vegetable broth',
      '2 carrots',
      '2 celery stalks',
      '1 potato',
      '1 cup green beans',
    ],
    instructions: [
      'Chop all vegetables, add to broth, and simmer until tender.',
    ],
  },
]

const allRecipes = [
  ...mockRecipes,
  {
    id: '9',
    name: 'Egg Fried Rice',
    ingredients: [
      '2 cups cooked rice',
      '2 eggs',
      '1/2 cup peas',
      '2 tbsp soy sauce',
      '1 green onion',
    ],
    instructions: [
      'Scramble eggs in a pan, add rice, peas, and soy sauce. Stir fry and top with green onion.',
    ],
  },
  {
    id: '10',
    name: 'Beef Tacos',
    ingredients: [
      '1 lb ground beef',
      '8 taco shells',
      '1/2 cup shredded lettuce',
      '1/2 cup shredded cheese',
      '1 tomato',
    ],
    instructions: [
      'Cook beef with seasoning, fill taco shells, and top with lettuce, cheese, and tomato.',
    ],
  },
  {
    id: '11',
    name: 'Lemon Garlic Salmon',
    ingredients: [
      '2 salmon fillets',
      '1 lemon',
      '2 cloves garlic',
      '1 tbsp olive oil',
      'Salt and pepper',
    ],
    instructions: [
      'Season salmon, top with lemon and garlic, bake at 400°F for 15 minutes.',
    ],
  },
  {
    id: '12',
    name: 'Vegetarian Chili',
    ingredients: [
      '1 can kidney beans',
      '1 can black beans',
      '1 can diced tomatoes',
      '1 onion',
      '2 tbsp chili powder',
    ],
    instructions: [
      'Cook onion, add beans, tomatoes, and chili powder. Simmer for 20 minutes.',
    ],
  },
  {
    id: '13',
    name: 'Avocado Toast',
    ingredients: [
      '2 slices bread',
      '1 avocado',
      'Salt and pepper',
      'Chili flakes (optional)',
    ],
    instructions: [
      'Toast bread, mash avocado, spread on toast, season, and top with chili flakes.',
    ],
  },
  {
    id: '14',
    name: 'Tomato Basil Pasta',
    ingredients: [
      '8 oz pasta',
      '2 cups cherry tomatoes',
      '1/4 cup fresh basil',
      '2 cloves garlic',
      '2 tbsp olive oil',
    ],
    instructions: [
      'Cook pasta, sauté tomatoes and garlic, toss with pasta and basil.',
    ],
  },
  {
    id: '15',
    name: 'Miso Soup',
    ingredients: [
      '4 cups dashi broth',
      '2 tbsp miso paste',
      '1/2 cup tofu',
      '2 green onions',
      '1 sheet nori',
    ],
    instructions: [
      'Heat broth, dissolve miso, add tofu, green onions, and nori.',
    ],
  },
  {
    id: '16',
    name: 'Banana Bread',
    ingredients: [
      '3 ripe bananas',
      '2 cups flour',
      '1/2 cup sugar',
      '1/3 cup butter',
      '2 eggs',
    ],
    instructions: [
      'Mash bananas, mix with other ingredients, bake at 350°F for 50 minutes.',
    ],
  },
]

function getMatchingRecipes(prompt, excludeIds = []) {
  if (!prompt) {
    // If no prompt, return random recipes not in excludeIds
    return allRecipes.filter(r => !excludeIds.includes(r.id)).sort(() => 0.5 - Math.random()).slice(0, 3)
  }
  const lowerPrompt = prompt.toLowerCase()
  // Simple matching: check if prompt words are in recipe name or ingredients
  const matches = allRecipes.filter(r =>
    !excludeIds.includes(r.id) &&
    (r.name.toLowerCase().includes(lowerPrompt) ||
      r.ingredients.some(ing => ing.toLowerCase().includes(lowerPrompt)))
  )
  if (matches.length >= 3) return matches.slice(0, 3)
  // If not enough matches, fill with random recipes
  const others = allRecipes.filter(r => !excludeIds.includes(r.id) && !matches.includes(r))
  return [...matches, ...others.sort(() => 0.5 - Math.random()).slice(0, 3 - matches.length)]
}

function PromptScreen({ setPrompt, onGenerate }) {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPrompt(input)
    onGenerate(input)
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

function RecipesScreen({ prompt, shownRecipes, setShownRecipes }) {
  const navigate = useNavigate()
  const [excludeIds, setExcludeIds] = useState([])

  useEffect(() => {
    setExcludeIds([])
  }, [prompt])

  const handleExpand = (id) => {
    navigate(`/recipes/${id}`)
  }

  const handleGenerateDifferent = () => {
    const newExclude = [...excludeIds, ...shownRecipes.map(r => r.id)]
    const newRecipes = getMatchingRecipes(prompt, newExclude)
    setShownRecipes(newRecipes)
    setExcludeIds(newExclude)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="background recipes-screen">
      <div className="recipes-container">
        <h1 className="title">Your Recipes</h1>
        <div className="recipes-list">
          {shownRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.id}>
              <div className="recipe-info">
                <h2 className="recipe-name">{recipe.name}</h2>
                <div className="recipe-preview">
                  <p><strong>Ingredient:</strong> {recipe.ingredients[0]}</p>
                  <p><strong>Step:</strong> {recipe.instructions[0].split('.').slice(0,1)[0]}.</p>
                </div>
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

function RecipeDetailScreen({ shownRecipes }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = allRecipes.find(r => r.id === id)

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
  const [shownRecipes, setShownRecipes] = useState(() => getMatchingRecipes(''))

  const handleGenerate = (input) => {
    setShownRecipes(getMatchingRecipes(input))
  }

  return (
    <Routes>
      <Route path="/" element={<PromptScreen setPrompt={setPrompt} onGenerate={handleGenerate} />} />
      <Route path="/recipes" element={<RecipesScreen prompt={prompt} shownRecipes={shownRecipes} setShownRecipes={setShownRecipes} />} />
      <Route path="/recipes/:id" element={<RecipeDetailScreen shownRecipes={shownRecipes} />} />
    </Routes>
  )
}

export default App
