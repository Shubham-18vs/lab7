function RecipeResult({ recipeData, isLoading, requestError, onFindAnother }) {
  if (isLoading) {
    return <p>Loading recipe...</p>
  }

  if (requestError) {
    return <p>{requestError}</p>
  }

  if (!recipeData) {
    return <p>Select a meal type and submit the form to see a recipe.</p>
  }

  return (
    <section>
      <h2>{recipeData.name}</h2>
      <img src={recipeData.image} alt={recipeData.name} width="280" />
      <p>
        <strong>Cuisine:</strong> {recipeData.cuisine}
      </p>
      <p>
        <strong>Difficulty:</strong> {recipeData.difficulty}
      </p>
      <p>
        <strong>Prep Time:</strong> {recipeData.prepTimeMinutes} minutes
      </p>
      <p>
        <strong>Cook Time:</strong> {recipeData.cookTimeMinutes} minutes
      </p>
      <p>
        <strong>Rating:</strong> {recipeData.rating}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {recipeData.ingredients.map((ingredientName) => (
          <li key={ingredientName}>{ingredientName}</li>
        ))}
      </ul>
      <button type="button" onClick={onFindAnother}>
        Find Another Recipe
      </button>
    </section>
  )
}

export default RecipeResult
