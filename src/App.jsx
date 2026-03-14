import { useEffect, useState } from 'react'
import RecipeForm from './components/RecipeForm'
import RecipeResult from './components/RecipeResult'

function App() {
  const [selectedMealType, setSelectedMealType] = useState('')
  const [submittedMealType, setSubmittedMealType] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false)
  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const [refreshCount, setRefreshCount] = useState(0)

  const chooseRandomRecipe = (recipeList) => {
    const randomIndex = Math.floor(Math.random() * recipeList.length)
    return recipeList[randomIndex]
  }

  const handleMealTypeSubmit = (event) => {
    event.preventDefault()
    setSubmittedMealType(selectedMealType)
  }

  const fetchAnotherRecipe = () => {
    if (submittedMealType) {
      setRefreshCount((currentCount) => currentCount + 1)
    }
  }

  useEffect(() => {
    if (!submittedMealType) {
      return
    }

    const loadRecipeByMealType = async () => {
      setIsLoadingRecipe(true)
      setRequestErrorMessage('')

      try {
        const response = await fetch(
          'https://dummyjson.com/recipes?limit=0'
        )

        if (!response.ok) {
          throw new Error('Unable to get recipes right now. Please try again.')
        }

        const recipeResponse = await response.json()

        if (!recipeResponse.recipes || recipeResponse.recipes.length === 0) {
          throw new Error('No recipes available right now.')
        }

        const recipesForMealType = recipeResponse.recipes.filter((recipeItem) =>
          recipeItem.mealType.includes(submittedMealType)
        )

        if (recipesForMealType.length === 0) {
          throw new Error('No recipes found for this meal type.')
        }

        const randomRecipe = chooseRandomRecipe(recipesForMealType)
        setSelectedRecipe(randomRecipe)
      } catch (requestError) {
        setSelectedRecipe(null)
        setRequestErrorMessage(requestError.message)
      } finally {
        setIsLoadingRecipe(false)
      }
    }

    loadRecipeByMealType()
  }, [submittedMealType, refreshCount])

  return (
    <main>
      <h1>React Recipe Finder</h1>
      <RecipeForm
        selectedMealType={selectedMealType}
        onMealTypeChange={setSelectedMealType}
        onSubmit={handleMealTypeSubmit}
      />
      <RecipeResult
        recipeData={selectedRecipe}
        isLoading={isLoadingRecipe}
        requestError={requestErrorMessage}
        onFindAnother={fetchAnotherRecipe}
      />
    </main>
  )
}

export default App
