function RecipeForm({ selectedMealType, onMealTypeChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="mealType">Choose a meal type: </label>
      <select
        id="mealType"
        value={selectedMealType}
        onChange={(event) => onMealTypeChange(event.target.value)}
      >
        <option value="">Select one</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
        <option value="Dessert">Dessert</option>
      </select>
      <button type="submit" disabled={!selectedMealType}>
        Find Recipe
      </button>
    </form>
  )
}

export default RecipeForm
