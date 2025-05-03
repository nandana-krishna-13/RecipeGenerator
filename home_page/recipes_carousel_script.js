const recipes = [
  {
    title: "Paneer Tikka",
    text: "To make Paneer Tikka, start by cutting paneer into cubes. In a bowl, mix thick yogurt with ginger-garlic paste, red chili powder, turmeric, garam masala, chaat masala, lemon juice, and salt. Add a little oil and mix well to make a smooth marinade. Add the paneer cubes along with sliced onions and bell peppers. Mix gently to coat and let it marinate for at least 30 minutes. Thread the marinated paneer and veggies onto skewers. Grill them on a pan, oven, or tandoor until charred and cooked. Serve hot with green chutney, onion rings, and lemon wedges.",
    name: "Aarav",
    place: "Delhi",
    image: "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-1.jpg",
    timestamp: new Date().toLocaleString(),
    upvotes: 5,
    downvotes: 1,
    comments: [
      { name: "Ravi", text: "Delicious recipe!", time: "2024-06-01 10:15" },
      { name: "Anita", text: "I tried this and loved it.", time: "2024-06-02 14:30" }
    ],
    userVote: 'none' // 'none', 'upvote', 'downvote'
  },
  {
    title: "Sushi Rolls",
    text: "Start by cooking sushi rice and seasoning it with a mixture of rice vinegar, sugar, and salt. Let it cool to room temperature. Place a bamboo sushi mat on a flat surface and cover it with plastic wrap. Lay a nori sheet shiny side down. Spread a thin, even layer of the rice over the nori, leaving an inch gap at the top. Add sliced cucumber, avocado, and cooked seafood like crab sticks or shrimp in the center. Carefully roll the mat forward to shape the roll tightly. Wet the edge of the nori to seal the roll. Slice with a sharp, wet knife. Serve with soy sauce, pickled ginger, and wasabi.",
    name: "Yuki",
    place: "Tokyo",
    image: "https://japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707913754&width=5760",
    timestamp: new Date().toLocaleString(),
    upvotes: 3,
    downvotes: 0,
    comments: [
      { name: "Kenji", text: "Perfect sushi rolls!", time: "2024-06-03 09:00" }
    ],
    userVote: 'none'
  },
  {
    title: "Spaghetti Carbonara",
    text: "Boil spaghetti in salted water until al dente. In a separate pan, cook pancetta or bacon until crispy and set aside. In a bowl, whisk together eggs, grated Parmesan or Pecorino cheese, and a generous amount of freshly ground black pepper. Once the pasta is cooked, reserve some pasta water and drain the rest. Immediately add the hot pasta to the egg-cheese mixture, stirring vigorously to create a creamy sauce. Add a splash of pasta water if needed for consistency. Mix in the crispy pancetta. Serve immediately with more grated cheese and pepper on top.",
    name: "Giulia",
    place: "Rome",
    image: "https://www.allrecipes.com/thmb/Y7ftij8uq7sM2VpxGt-RHZg3yaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-mfs-042-21d5decdffde4a1faa94a21725ce9cc3.jpg",
    timestamp: new Date().toLocaleString(),
    upvotes: 7,
    downvotes: 2,
    comments: [
      { name: "Luca", text: "Authentic taste!", time: "2024-06-04 18:45" },
      { name: "Maria", text: "My family loved it.", time: "2024-06-05 12:20" }
    ],
    userVote: 'none'
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

const saveBtn = document.getElementById('save-btn');

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
      openRecipePreview(recipe, index);
    });

    recipeFeed.appendChild(card);
  });
}

function openRecipePreview(recipe, index) {
  previewImage.src = recipe.image;
  previewImage.alt = recipe.title;
  previewTitle.textContent = recipe.title;
  previewText.textContent = recipe.text;
  previewName.textContent = recipe.name;
  previewPlace.textContent = recipe.place;
  previewTimestamp.textContent = recipe.timestamp;

  // Set vote counts
  upvoteCount.textContent = recipe.upvotes;
  downvoteCount.textContent = recipe.downvotes;

  // Set vote button styles based on userVote
  if (recipe.userVote === 'upvote') {
    upvoteBtn.classList.add('filled');
    upvoteBtn.classList.remove('outline');
    downvoteBtn.classList.add('outline');
    downvoteBtn.classList.remove('filled');
  } else if (recipe.userVote === 'downvote') {
    downvoteBtn.classList.add('filled');
    downvoteBtn.classList.remove('outline');
    upvoteBtn.classList.add('outline');
    upvoteBtn.classList.remove('filled');
  } else {
    upvoteBtn.classList.add('outline');
    upvoteBtn.classList.remove('filled');
    downvoteBtn.classList.add('outline');
    downvoteBtn.classList.remove('filled');
  }

  // Set save button style based on saved state
  if (recipe.saved) {
    saveBtn.classList.add('saved');
  } else {
    saveBtn.classList.remove('saved');
  }

  // Render comments
  renderComments(recipe.comments);

  // Store current recipe index for voting and commenting
  currentRecipeIndex = index;

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

saveBtn.addEventListener('click', () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    const wasSaved = recipe.saved;
    recipe.saved = !recipe.saved;
    saveBtn.classList.toggle('saved', recipe.saved);

    if (!wasSaved && recipe.saved) {
      // Show saved dialog only when saving, not unsaving
      const saveDialog = document.getElementById('save-dialog');
      saveDialog.classList.remove('hidden');

      // Clear any existing timeout
      if (saveDialog.timeoutId) {
        clearTimeout(saveDialog.timeoutId);
      }

      // Hide dialog after 2 seconds
      saveDialog.timeoutId = setTimeout(() => {
        saveDialog.classList.add('hidden');
      }, 2000);
    }
  }
});

// Vote buttons and counts
const upvoteBtn = document.getElementById('upvote-btn');
const downvoteBtn = document.getElementById('downvote-btn');
const upvoteCount = document.getElementById('upvote-count');
const downvoteCount = document.getElementById('downvote-count');

// Comment elements
const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

let currentRecipeIndex = null;

// Upvote handler
upvoteBtn.addEventListener('click', () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    if (recipe.userVote === 'upvote') {
      // Remove upvote
      recipe.upvotes--;
      recipe.userVote = 'none';
      upvoteBtn.classList.remove('filled');
      upvoteBtn.classList.add('outline');
    } else {
      // Add upvote
      recipe.upvotes++;
      upvoteBtn.classList.remove('outline');
      upvoteBtn.classList.add('filled');

      // Remove downvote if previously downvoted
      if (recipe.userVote === 'downvote') {
        recipe.downvotes--;
        downvoteBtn.classList.remove('filled');
        downvoteBtn.classList.add('outline');
      }
      recipe.userVote = 'upvote';
    }
    // Update counts
    upvoteCount.textContent = recipe.upvotes;
    downvoteCount.textContent = recipe.downvotes;
  }
});

// Downvote handler
downvoteBtn.addEventListener('click', () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    if (recipe.userVote === 'downvote') {
      // Remove downvote
      recipe.downvotes--;
      recipe.userVote = 'none';
      downvoteBtn.classList.remove('filled');
      downvoteBtn.classList.add('outline');
    } else {
      // Add downvote
      recipe.downvotes++;
      downvoteBtn.classList.remove('outline');
      downvoteBtn.classList.add('filled');

      // Remove upvote if previously upvoted
      if (recipe.userVote === 'upvote') {
        recipe.upvotes--;
        upvoteBtn.classList.remove('filled');
        upvoteBtn.classList.add('outline');
      }
      recipe.userVote = 'downvote';
    }
    // Update counts
    upvoteCount.textContent = recipe.upvotes;
    downvoteCount.textContent = recipe.downvotes;
  }
});

// Render comments
function renderComments(comments) {
  commentList.innerHTML = '';
  if (comments.length === 0) {
    const noComments = document.createElement('li');
    noComments.textContent = 'No comments yet.';
    noComments.style.fontStyle = 'italic';
    commentList.appendChild(noComments);
    return;
  }
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.style.borderBottom = '1px solid var(--first-color-darken)';
    li.style.padding = '0.25rem 0';
    li.style.color = 'var(--white-color)';
    li.innerHTML = `<strong>${comment.name}</strong> <small style="color: var(--first-color-darken); font-size: 0.8rem;">${comment.time}</small><br>${comment.text}`;
    commentList.appendChild(li);
  });
}

// Handle comment form submit
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentRecipeIndex !== null) {
    const newCommentText = commentInput.value.trim();
    const commenterName = document.getElementById('commenter-name').value.trim();
    if (newCommentText && commenterName) {
      const now = new Date();
      const timestamp = now.getFullYear() + '-' +
                        String(now.getMonth() + 1).padStart(2, '0') + '-' +
                        String(now.getDate()).padStart(2, '0') + ' ' +
                        String(now.getHours()).padStart(2, '0') + ':' +
                        String(now.getMinutes()).padStart(2, '0');
      const newComment = {
        name: commenterName,
        text: newCommentText,
        time: timestamp
      };
      recipes[currentRecipeIndex].comments.push(newComment);
      renderComments(recipes[currentRecipeIndex].comments);
      commentInput.value = '';
      document.getElementById('commenter-name').value = '';
    }
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
        timestamp: new Date().toLocaleString(),
        upvotes: 0,
        downvotes: 0,
        comments: [],
        userVote: 'none'
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

const text = "Swap stories, swap recipes — one plate at a time.";
const typingTextElem = document.getElementById('typing-text');
let index = 0;

function type() {
  if (index < text.length) {
    typingTextElem.textContent += text.charAt(index);
    index++;
    setTimeout(type, 50);
  }
}

// Clear text and start typing animation on page load
window.onload = () => {
  typingTextElem.textContent = "";
  index = 0;
  type();
};

// Initial render
renderRecipes();
