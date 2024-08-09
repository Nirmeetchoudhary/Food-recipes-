const apiId = '9a982aaf';
const apiKey = 'e6190cd307f1dee42974bfd218ee2f75';

function searchRecipe() {
    const query = document.getElementById('searchInput').value;
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${apiId}&app_key=${apiKey}&from=0&to=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching the recipes:', error);
        });
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(hit => {
        const recipe = hit.recipe;
        recipeContainer.innerHTML += `
            <div class="recipe-card">
                <h1>${recipe.label}</h1>
                <img src="${recipe.image}" alt="${recipe.label}">
                <div class="recipe-details">
                    <p><strong>Duration:</strong> ${recipe.totalTime} minutes</p>
                    <p><strong>Nutrition Information:</strong> ${Math.round(recipe.calories)} calories</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    <h2>Directions</h2>
                    <p>Follow the instructions on the recipe page: <a href="${recipe.url}" target="_blank">${recipe.url}</a></p>
                </div>
            </div>
        `;
    });
}
