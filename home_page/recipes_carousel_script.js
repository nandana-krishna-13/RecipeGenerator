const recipes = [
  {
    title: "Paneer Tikka",
    text: "To make Paneer Tikka, start by cutting paneer into cubes. In a bowl, mix thick yogurt with ginger-garlic paste, red chili powder, turmeric, garam masala, chaat masala, lemon juice, and salt. Add a little oil and mix well to make a smooth marinade. Add the paneer cubes along with sliced onions and bell peppers. Mix gently to coat and let it marinate for at least 30 minutes. Thread the marinated paneer and veggies onto skewers. Grill them on a pan, oven, or tandoor until charred and cooked. Serve hot with green chutney, onion rings, and lemon wedges.",
    name: "Aarav",
    place: "Delhi",
    image: "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-1.jpg",
    timestamp: new Date().toLocaleString()
  },
  {
    title: "Sushi Rolls",
    text: "Start by cooking sushi rice and seasoning it with a mixture of rice vinegar, sugar, and salt. Let it cool to room temperature. Place a bamboo sushi mat on a flat surface and cover it with plastic wrap. Lay a nori sheet shiny side down. Spread a thin, even layer of the rice over the nori, leaving an inch gap at the top. Add sliced cucumber, avocado, and cooked seafood like crab sticks or shrimp in the center. Carefully roll the mat forward to shape the roll tightly. Wet the edge of the nori to seal the roll. Slice with a sharp, wet knife. Serve with soy sauce, pickled ginger, and wasabi.",
    name: "Yuki",
    place: "Tokyo",
    image: "https://japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707913754&width=5760",
    timestamp: new Date().toLocaleString()
  },
  {
    title: "Spaghetti Carbonara",
    text: "Boil spaghetti in salted water until al dente. In a separate pan, cook pancetta or bacon until crispy and set aside. In a bowl, whisk together eggs, grated Parmesan or Pecorino cheese, and a generous amount of freshly ground black pepper. Once the pasta is cooked, reserve some pasta water and drain the rest. Immediately add the hot pasta to the egg-cheese mixture, stirring vigorously to create a creamy sauce. Add a splash of pasta water if needed for consistency. Mix in the crispy pancetta. Serve immediately with more grated cheese and pepper on top.",
    name: "Giulia",
    place: "Rome",
    image: "https://www.allrecipes.com/thmb/Y7ftij8uq7sM2VpxGt-RHZg3yaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-mfs-042-21d5decdffde4a1faa94a21725ce9cc3.jpg",
    timestamp: new Date().toLocaleString()
  }
];

const recipeFeed = document.getElementById('recipe-feed');
const shareRecipeBtn = document.getElementById('share-recipe-btn');
const shareRecipeModal = document.getElementById('share-recipe-modal');
const shareRecipeForm = document.getElementById('share-recipe-form');
const cancelBtn = document.getElementById('cancel-btn');

const recipePreviewModal = document.getElementById('recipe-preview-modal');
const closePreviewBtn = document.getElementById('close-preview-btn');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const previewText = document.getElementById('preview-text');
const previewName = document.getElementById('preview-name');
const previewPlace = document.getElementById('preview-place');
const previewTimestamp = document.getElementById('preview-timestamp');

// Show modal on button click
shareRecipeBtn.addEventListener('click', () => {
  shareRecipeModal.classList.remove('hidden');
});

// Hide modal on cancel
cancelBtn.addEventListener('click', () => {
  shareRecipeModal.classList.add('hidden');
  shareRecipeForm.reset();
});

// Render all recipes to the feed
function renderRecipes() {
  recipeFeed.innerHTML = '';
  if (recipes.length === 0) {
    const noRecipesMsg = document.createElement('p');
    noRecipesMsg.className = 'no-recipes';
    noRecipesMsg.textContent = 'No recipes shared yet.';
    recipeFeed.appendChild(noRecipesMsg);
    return;
  }
  recipes.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.className = 'cuisine-card';

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="cuisine-img" />
      <h3 class="cuisine-title">${recipe.title}</h3>
      <p><strong>By:</strong> ${recipe.name} from ${recipe.place}</p>
      <p class="timestamp">${recipe.timestamp}</p>
    `;

    card.addEventListener('click', () => {
      openRecipePreview(recipe);
    });

    recipeFeed.appendChild(card);
  });
}

function openRecipePreview(recipe) {
  previewImage.src = recipe.image;
  previewImage.alt = recipe.title;
  previewTitle.textContent = recipe.title;
  previewText.textContent = recipe.text;
  previewName.textContent = recipe.name;
  previewPlace.textContent = recipe.place;
  previewTimestamp.textContent = recipe.timestamp;
  recipePreviewModal.classList.remove('hidden');
}

function closeRecipePreview() {
  recipePreviewModal.classList.add('hidden');
}

// Close preview modal on close button click
closePreviewBtn.addEventListener('click', closeRecipePreview);

// Close preview modal on outside click
recipePreviewModal.addEventListener('click', (e) => {
  if (e.target === recipePreviewModal) {
    closeRecipePreview();
  }
});

// Handle recipe form submit
shareRecipeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('recipe-title').value.trim();
  const text = document.getElementById('recipe-text').value.trim();
  const name = document.getElementById('recipe-name').value.trim();
  const place = document.getElementById('recipe-place').value.trim();
  const imageInput = document.getElementById('recipe-image');
  const imageFile = imageInput.files[0];

  if (!title || !text || !name || !place) {
    alert('Please fill out all fields.');
    return;
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = e.target.result; // base64 image URL

      const newRecipe = {
        title,
        text,
        name,
        place,
        image,
        timestamp: new Date().toLocaleString()
      };

      recipes.unshift(newRecipe);     // Add new recipe to top
      renderRecipes();                // Refresh carousel
      shareRecipeForm.reset();        // Clear form
      shareRecipeModal.classList.add('hidden'); // Hide modal
    };

    reader.readAsDataURL(imageFile); // Read the image as base64
  } else {
    // If no image uploaded, use a placeholder or alert
    alert('Please upload an image.');
  }
});

// Carousel navigation
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

prevBtn.addEventListener('click', () => {
  recipeFeed.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

nextBtn.addEventListener('click', () => {
  recipeFeed.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});

// Initial render
renderRecipes();
