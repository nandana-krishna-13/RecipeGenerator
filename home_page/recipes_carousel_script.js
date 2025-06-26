// const recipes = [
//   {
//     title: "Paneer Tikka",
//     text: "To make Paneer Tikka, start by cutting paneer into cubes. In a bowl, mix thick yogurt with ginger-garlic paste, red chili powder, turmeric, garam masala, chaat masala, lemon juice, and salt. Add a little oil and mix well to make a smooth marinade. Add the paneer cubes along with sliced onions and bell peppers. Mix gently to coat and let it marinate for at least 30 minutes. Thread the marinated paneer and veggies onto skewers. Grill them on a pan, oven, or tandoor until charred and cooked. Serve hot with green chutney, onion rings, and lemon wedges.",
//     name: "Aarav",
//     place: "Delhi",
//     image: "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-1.jpg",
//     timestamp: new Date().toLocaleString(),
//     upvotes: 5,
//     downvotes: 1,
//     comments: [
//       { name: "Ravi", text: "Delicious recipe!", time: "2024-06-01 10:15" },
//       { name: "Anita", text: "I tried this and loved it.", time: "2024-06-02 14:30" }
//     ],
//     userVote: 'none' // 'none', 'upvote', 'downvote'
//   },
//   {
//     title: "Sushi Rolls",
//     text: "Start by cooking sushi rice and seasoning it with a mixture of rice vinegar, sugar, and salt. Let it cool to room temperature. Place a bamboo sushi mat on a flat surface and cover it with plastic wrap. Lay a nori sheet shiny side down. Spread a thin, even layer of the rice over the nori, leaving an inch gap at the top. Add sliced cucumber, avocado, and cooked seafood like crab sticks or shrimp in the center. Carefully roll the mat forward to shape the roll tightly. Wet the edge of the nori to seal the roll. Slice with a sharp, wet knife. Serve with soy sauce, pickled ginger, and wasabi.",
//     name: "Yuki",
//     place: "Tokyo",
//     image: "https://japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707913754&width=5760",
//     timestamp: new Date().toLocaleString(),
//     upvotes: 3,
//     downvotes: 0,
//     comments: [
//       { name: "Kenji", text: "Perfect sushi rolls!", time: "2024-06-03 09:00" }
//     ],
//     userVote: 'none'
//   },
//   {
//     title: "Spaghetti Carbonara",
//     text: "Boil spaghetti in salted water until al dente. In a separate pan, cook pancetta or bacon until crispy and set aside. In a bowl, whisk together eggs, grated Parmesan or Pecorino cheese, and a generous amount of freshly ground black pepper. Once the pasta is cooked, reserve some pasta water and drain the rest. Immediately add the hot pasta to the egg-cheese mixture, stirring vigorously to create a creamy sauce. Add a splash of pasta water if needed for consistency. Mix in the crispy pancetta. Serve immediately with more grated cheese and pepper on top.",
//     name: "Giulia",
//     place: "Rome",
//     image: "https://www.allrecipes.com/thmb/Y7ftij8uq7sM2VpxGt-RHZg3yaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-mfs-042-21d5decdffde4a1faa94a21725ce9cc3.jpg",
//     timestamp: new Date().toLocaleString(),
//     upvotes: 7,
//     downvotes: 2,
//     comments: [
//       { name: "Luca", text: "Authentic taste!", time: "2024-06-04 18:45" },
//       { name: "Maria", text: "My family loved it.", time: "2024-06-05 12:20" }
//     ],
//     userVote: 'none'
//   }
// ];

let recipes = [];

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

  upvoteCount.textContent = recipe.upvotes || 0;
  downvoteCount.textContent = recipe.downvotes || 0;

  upvoteBtn.classList.toggle('filled', recipe.userVote === 'upvote');
  upvoteBtn.classList.toggle('outline', recipe.userVote !== 'upvote');
  downvoteBtn.classList.toggle('filled', recipe.userVote === 'downvote');
  downvoteBtn.classList.toggle('outline', recipe.userVote !== 'downvote');

  saveBtn.classList.toggle('saved', recipe.saved);

  renderComments(recipe.comments || []);

  currentRecipeIndex = index;

  recipePreviewModal.classList.remove('hidden');
}

function closeRecipePreview() {
  recipePreviewModal.classList.add('hidden');
}

closePreviewBtn.addEventListener('click', closeRecipePreview);
recipePreviewModal.addEventListener('click', (e) => {
  if (e.target === recipePreviewModal) {
    closeRecipePreview();
  }
});

// saveBtn.addEventListener('click', () => {
//   if (currentRecipeIndex !== null) {
//     const recipe = recipes[currentRecipeIndex];
//     const wasSaved = recipe.saved;
//     recipe.saved = !recipe.saved;
//     saveBtn.classList.toggle('saved', recipe.saved);

//     if (!wasSaved && recipe.saved) {
//       const saveDialog = document.getElementById('save-dialog');
//       saveDialog.classList.remove('hidden');
//       if (saveDialog.timeoutId) clearTimeout(saveDialog.timeoutId);
//       saveDialog.timeoutId = setTimeout(() => {
//         saveDialog.classList.add('hidden');
//       }, 2000);
//     }
//   }
// });

saveBtn.addEventListener('click', async () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    const wasSaved = recipe.saved;
    recipe.saved = !recipe.saved;
    saveBtn.classList.toggle('saved', recipe.saved);

    if (!wasSaved && recipe.saved) {
      // 🔁 POST to backend
      try {
        await fetch('http://localhost:5000/api/interactions/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: localStorage.getItem('userId'), recipeId: recipe._id })
        });
      } catch (err) {
        console.error("❌ Failed to save recipe", err);
      }

      // Show “Saved” popup
      const saveDialog = document.getElementById('save-dialog');
      saveDialog.classList.remove('hidden');
      if (saveDialog.timeoutId) clearTimeout(saveDialog.timeoutId);
      saveDialog.timeoutId = setTimeout(() => {
        saveDialog.classList.add('hidden');
      }, 2000);
    }
  }
});


const upvoteBtn = document.getElementById('upvote-btn');
const downvoteBtn = document.getElementById('downvote-btn');
const upvoteCount = document.getElementById('upvote-count');
const downvoteCount = document.getElementById('downvote-count');

const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

let currentRecipeIndex = null;

// upvoteBtn.addEventListener('click', async () => {
//   if (currentRecipeIndex !== null) {
//     const recipe = recipes[currentRecipeIndex];
//     const recipeId = recipe._id;
//     const prevAction = recipe.userVote;

//     let action;
//     if (prevAction === 'upvote') {
//       recipe.upvotes--;
//       recipe.userVote = 'none';
//       action = 'undo-upvote';
//     } else {
//       recipe.upvotes++;
//       if (prevAction === 'downvote') recipe.downvotes--;
//       recipe.userVote = 'upvote';
//       action = 'upvote';
//     }

//     try {
//       await fetch(`http://localhost:5000/api/shared/vote/${recipeId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action, prevAction })
//       });

//       renderRecipes();
//       openRecipePreview(recipe, currentRecipeIndex);
//     } catch (err) {
//       console.error("❌ Error upvoting", err);
//     }
//   }
// });

upvoteBtn.addEventListener('click', async () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    const recipeId = recipe._id;
    const userId = localStorage.getItem('userId');
    const prevAction = recipe.userVote;

    let action;
    if (prevAction === 'upvote') {
      recipe.upvotes--;
      recipe.userVote = 'none';
      action = 'undo-upvote';
    } else {
      recipe.upvotes++;
      if (prevAction === 'downvote') recipe.downvotes--;
      recipe.userVote = 'upvote';
      action = 'upvote';
    }

    try {
      // 1. Update vote counts in recipe DB
      await fetch(`http://localhost:5000/api/shared/vote/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, prevAction })
      });

      // 2. If newly liked, track it in interactions DB
      if (action === 'upvote') {
        await fetch('http://localhost:5000/api/interactions/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, recipeId })
        });
      }

      renderRecipes();
      openRecipePreview(recipe, currentRecipeIndex);
    } catch (err) {
      console.error("❌ Error in upvote process", err);
    }
  }
});

downvoteBtn.addEventListener('click', async () => {
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    const recipeId = recipe._id;
    const prevAction = recipe.userVote;

    let action;
    if (prevAction === 'downvote') {
      recipe.downvotes--;
      recipe.userVote = 'none';
      action = 'undo-downvote';
    } else {
      recipe.downvotes++;
      if (prevAction === 'upvote') recipe.upvotes--;
      recipe.userVote = 'downvote';
      action = 'downvote';
    }

    try {
      await fetch(`http://localhost:5000/api/shared/vote/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, prevAction })
      });

      renderRecipes();
      openRecipePreview(recipe, currentRecipeIndex);
    } catch (err) {
      console.error("❌ Error downvoting", err);
    }
  }
});



function renderComments(comments) {
  commentList.innerHTML = '';
  if (!comments || comments.length === 0) {
    const noComments = document.createElement('li');
    noComments.textContent = 'No comments yet.';
    noComments.style.fontStyle = 'italic';
    commentList.appendChild(noComments);
    return;
  }
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${comment.name}</strong> <small>${comment.time}</small><br>${comment.text}`;
    commentList.appendChild(li);
  });
}

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (currentRecipeIndex !== null) {
    const recipe = recipes[currentRecipeIndex];
    const text = commentInput.value.trim();
    const name = document.getElementById('commenter-name').value.trim();

    if (text && name) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const newComment = { name, text, time: timestamp };

      try {
        const res = await fetch(`http://localhost:5000/api/shared/comment/${recipe._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newComment)
        });
        const updatedComments = await res.json();
        recipes[currentRecipeIndex].comments = updatedComments;
        renderComments(updatedComments);
        commentInput.value = '';
        document.getElementById('commenter-name').value = '';
      } catch (err) {
        console.error("❌ Failed to post comment", err);
      }
    }
  }
});


// Handle recipe form submit and send to MongoDB
// shareRecipeForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const title = document.getElementById('recipe-title').value.trim();
//   const text = document.getElementById('recipe-text').value.trim();
//   const name = document.getElementById('recipe-name').value.trim();
//   const place = document.getElementById('recipe-place').value.trim();
//   const imageInput = document.getElementById('recipe-image');
//   const imageFile = imageInput.files[0];

//   if (!title || !text || !name || !place || !imageFile) {
//     alert('Please fill out all fields and upload an image.');
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = async function (e) {
//     const image = e.target.result;
//     const newRecipe = {
//       title, text, name, place, image,
//       timestamp: new Date().toLocaleString(),
//       upvotes: 0,
//       downvotes: 0,
//       comments: [],
//       userVote: 'none'
//     };

//     try {
//         const res = await fetch('http://localhost:5000/api/shared/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newRecipe)
//       });

//       if (res.ok) {
//         await fetchRecipesFromDB();
//         shareRecipeForm.reset();
//         shareRecipeModal.classList.add('hidden');
//       } else {
//         alert('Error submitting recipe.');
//       }
//     } catch (err) {
//       console.error("Error posting recipe:", err);
//       alert('Error submitting recipe.');
//     }
//   };
//   reader.readAsDataURL(imageFile);
// });

// shareRecipeForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const title = document.getElementById('recipe-title').value.trim();
//   const text = document.getElementById('recipe-text').value.trim();
//   const name = document.getElementById('recipe-name').value.trim();
//   const place = document.getElementById('recipe-place').value.trim();
//   const imageInput = document.getElementById('recipe-image');
//   const imageFile = imageInput.files[0];
//   const userId = localStorage.getItem('userId'); // 👈 Retrieve userId

//   if (!title || !text || !name || !place || !imageFile) {
//     alert('Please fill out all fields and upload an image.');
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = async function (e) {
//     const image = e.target.result;
//     const newRecipe = {
//       title, text, name, place, image,
//       timestamp: new Date().toLocaleString(),
//       upvotes: 0,
//       downvotes: 0,
//       comments: [],
//       userVote: 'none'
//     };

//     try {
//       // 1. Save recipe to DB
//       const res = await fetch('http://localhost:5000/api/shared/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newRecipe)
//       });

//       const createdRecipe = await res.json();

//       // 2. Register in postedRecipes of user
//       await fetch('http://localhost:5000/api/interactions/post', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, recipeId: createdRecipe._id })
//       });

//       // 3. UI updates
//       await fetchRecipesFromDB();
//       shareRecipeForm.reset();
//       shareRecipeModal.classList.add('hidden');

//     } catch (err) {
//       console.error("Error posting recipe:", err);
//       alert('Error submitting recipe.');
//     }
//   };

//   reader.readAsDataURL(imageFile);
// });

shareRecipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('recipe-title').value.trim();
  const text = document.getElementById('recipe-text').value.trim();
  const name = document.getElementById('recipe-name').value.trim();
  const place = document.getElementById('recipe-place').value.trim();
  const imageInput = document.getElementById('recipe-image');
  const imageFile = imageInput.files[0];
  const userId = localStorage.getItem('userId'); // 👈 Get logged-in user ID

  if (!title || !text || !name || !place || !imageFile) {
    alert('Please fill out all fields and upload an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (e) {
    const image = e.target.result;
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

    try {
      // 1. Save recipe to MongoDB
      const res = await fetch('http://localhost:5000/api/shared/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("❌ Recipe not created:", result.error || result.message);
        alert('❌ Failed to save recipe.');
        return;
      }

      const recipeId = result._id || result.recipe?._id;
      if (!recipeId) {
        console.error("❌ Recipe ID not returned.");
        return;
      }

      // 2. Log it under user's postedRecipes
      if (userId) {
        await fetch('http://localhost:5000/api/interactions/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, recipeId })
        });
      } else {
        console.warn("User ID not found. Recipe won't be recorded under postedRecipes.");
      }

      // 3. Refresh UI
      await fetchRecipesFromDB();
      shareRecipeForm.reset();
      shareRecipeModal.classList.add('hidden');

    } catch (err) {
      console.error("❌ Error saving recipe:", err);
      alert('❌ Error submitting recipe.');
    }
  };

  reader.readAsDataURL(imageFile);
});


// Fetch all recipes from MongoDB
async function fetchRecipesFromDB() {
  try {
    const res = await fetch('http://localhost:5000/api/shared');
    const data = await res.json();
    recipes = data.map(r => ({ ...r, userVote: 'none', saved: false }));
    renderRecipes();
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
  }
}

// Typing animation
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

// Initial load: fetch + animate
window.onload = async () => {
  typingTextElem.textContent = "";
  index = 0;
  type();
  await fetchRecipesFromDB();
};

// Carousel
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
prevBtn.addEventListener('click', () => {
  recipeFeed.scrollBy({ left: -300, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
  recipeFeed.scrollBy({ left: 300, behavior: 'smooth' });
});
