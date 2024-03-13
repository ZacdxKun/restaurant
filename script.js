const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const favoritesBtn = document.getElementById('favoritesBtn')
const recipesContainer = document.getElementById('recipesContainer')

searchBtn.addEventListener('click', searchRecipe)
favoritesBtn.addEventListener('click', showFavorites)

function searchRecipe() {
    const searchTerm = searchInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => {
            
            return response.json()
        })
        .then(data => {
            if (data.meals) {
                displayRecipes(data.meals);
            } 
            else {
                recipesContainer.innerHTML = '<p>pas de  recette trouvée</p>'
            }
        })
        
}

function displayRecipes(recipes) {
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div')
        recipeCard.classList.add('recipe-card')
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h2>${recipe.strMeal}</h2>
            <div class="fav">
            <button id="fav" onclick="addToFavorites('${recipe.idMeal}', '${recipe.strMeal}', '${recipe.strMealThumb}')">Ajouter aux favoris</button>
            </div>
        `;
        recipesContainer.appendChild(recipeCard)
    });
}

function addToFavorites(id, name, imageUrl) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const recipeExists = favoriteRecipes.some(recipe => recipe.id === id);
    if (!recipeExists) {
        favoriteRecipes.push({ id, name, imageUrl })
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes))
       
    }
}

function showFavorites() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    displayRecipes(favoriteRecipes);
}