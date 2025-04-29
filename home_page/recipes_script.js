// Recipe data array
const recipes = [];

// DOM elements
const recipeFeed = document.getElementById('recipe-feed');
const shareRecipeBtn = document.getElementById('share-recipe-btn');
const shareRecipeModal = document.getElementById('share-recipe-modal');
const shareRecipeForm = document.getElementById('share-recipe-form');
const cancelBtn = document.getElementById('cancel-btn');
const recipeImageInput = document.getElementById('recipe-image');

// Show modal
shareRecipeBtn.addEventListener('click', () => {
  shareRecipeModal.classList.remove('hidden');
});

// Hide modal
cancelBtn.addEventListener('click', () => {
  shareRecipeModal.classList.add('hidden');
  shareRecipeForm.reset();
});

// Render recipes feed
function renderRecipes() {
  recipeFeed.innerHTML = '';
  if (recipes.length === 0) {
    recipeFeed.innerHTML = '<p class="no-recipes">No recipes shared yet.</p>';
    return;
  }
  recipes.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.classList.add('cuisine-card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    // Front of card
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const img = document.createElement('img');
    img.classList.add('cuisine-img');
    img.src = recipe.image || 'https://via.placeholder.com/300x180?text=No+Image';
    img.alt = recipe.title;

    const title = document.createElement('h3');
    title.classList.add('cuisine-title');
    title.textContent = recipe.title;

    cardFront.appendChild(img);
    cardFront.appendChild(title);

    // Back of card
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const backTitle = document.createElement('h3');
    backTitle.textContent = recipe.title;

    const text = document.createElement('p');
    text.textContent = recipe.text;

    cardBack.appendChild(backTitle);
    cardBack.appendChild(text);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Flip card on click
    card.addEventListener('click', () => {
      cardInner.classList.toggle('flipped');
    });

    recipeFeed.appendChild(card);
  });
}

// Handle form submission
shareRecipeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('recipe-title').value.trim();
  const text = document.getElementById('recipe-text').value.trim();

  if (!title || !text) {
    alert('Please fill in the title and recipe text.');
    return;
  }

  const file = recipeImageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageDataUrl = event.target.result;
      addRecipe(title, text, imageDataUrl);
    };
    reader.readAsDataURL(file);
  } else {
    addRecipe(title, text, null);
  }
});

// Add recipe to array and update feed
function addRecipe(title, text, image) {
  recipes.unshift({ title, text, image });
  renderRecipes();
  shareRecipeModal.classList.add('hidden');
  shareRecipeForm.reset();
}

// Initial render
renderRecipes();
