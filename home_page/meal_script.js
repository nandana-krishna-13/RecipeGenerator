// Sample dishes data
const dishes = [
  "Grilled Chicken",
  "Caesar Salad",
  "Spaghetti Bolognese",
  "Vegetable Stir Fry",
  "Beef Tacos",
  "Quinoa Salad",
  "Salmon with Asparagus",
  "Pancakes",
  "Omelette",
  "Fruit Smoothie"
];

const dishesList = document.getElementById('dishes-list');
const weekGrid = document.getElementById('week-grid');
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Initialize dishes list
function initDishes() {
  dishes.forEach(dish => {
    const dishEl = document.createElement('div');
    dishEl.classList.add('dish');
    dishEl.textContent = dish;
    dishEl.setAttribute('draggable', 'true');
    dishEl.addEventListener('dragstart', dragStart);
    dishEl.addEventListener('dragend', dragEnd);
    dishesList.appendChild(dishEl);
  });
}

// Initialize week grid with drop zones
function initWeekGrid() {
  daysOfWeek.forEach(day => {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');

    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');
    dayHeader.textContent = day;
    dayEl.appendChild(dayHeader);

    const dropzone = document.createElement('div');
    dropzone.classList.add('dropzone');
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', drop);
    dayEl.appendChild(dropzone);

    // Add edit button below each day
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-day-btn');
    editBtn.textContent = '✎'; // pencil/edit icon
    editBtn.title = `Edit ${day}`;
    dayEl.appendChild(editBtn);

    // Container for input and add button, hidden by default
    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');
    editContainer.style.display = 'none';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter dish name';

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';

    editContainer.appendChild(input);
    editContainer.appendChild(addBtn);
    dayEl.appendChild(editContainer);

    // Event listener for edit button to toggle input visibility
    editBtn.addEventListener('click', () => {
      if (editContainer.style.display === 'none') {
        editContainer.style.display = 'block';
        input.focus();
      } else {
        editContainer.style.display = 'none';
      }
    });

    // Event listener for add button to add dish to dropzone
    addBtn.addEventListener('click', () => {
      const dishName = input.value.trim();
      if (dishName) {
        addDishToDay(dropzone, dishName);
        input.value = '';
        editContainer.style.display = 'none';
      }
    });

    weekGrid.appendChild(dayEl);
  });
}

// Dish to ingredients mapping
const dishIngredientsMap = {
  "Grilled Chicken": ["Chicken", "Salt", "Pepper", "Olive Oil"],
  "Caesar Salad": ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
  "Spaghetti Bolognese": ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onion", "Garlic"],
  "Vegetable Stir Fry": ["Broccoli", "Carrot", "Bell Pepper", "Soy Sauce", "Garlic"],
  "Beef Tacos": ["Taco Shells", "Ground Beef", "Lettuce", "Cheese", "Salsa"],
  "Quinoa Salad": ["Quinoa", "Cucumber", "Tomato", "Feta Cheese", "Olive Oil"],
  "Salmon with Asparagus": ["Salmon", "Asparagus", "Lemon", "Salt", "Pepper"],
  "Pancakes": ["Flour", "Eggs", "Milk", "Baking Powder", "Sugar"],
  "Omelette": ["Eggs", "Cheese", "Salt", "Pepper", "Butter"],
  "Fruit Smoothie": ["Banana", "Strawberries", "Yogurt", "Honey"]
};

// Function to add dish to a day's dropzone and update ingredient checklist
function addDishToDay(dropzone, dishName) {
  // Add meal item to dropzone
  const mealItem = document.createElement('div');
  mealItem.classList.add('meal-item');
  mealItem.textContent = dishName;
  dropzone.appendChild(mealItem);

  // Update ingredient checklist for this dish
  updateIngredientChecklist(dishName);
}

// Update ingredient checklist based on dish name
function updateIngredientChecklist(dishName) {
  const ingredients = dishIngredientsMap[dishName] || [];
  renderIngredientChecklist(ingredients);
  if (!firstDishSelected) {
    firstDishSelected = true;
    showChecklistDialog();
  }
}

// Override drop function to add first dish selection logic and update checklist
function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.remove('dragover');
    if (draggedItem) {
      const dishName = draggedItem.textContent;

      // Clone the dragged dish to add to the dropzone
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.textContent = dishName;

      // Add animation
      mealItem.style.opacity = '0';
      e.target.appendChild(mealItem);
      setTimeout(() => {
        mealItem.style.opacity = '0.9';
      }, 10);

      // Update ingredient checklist for this dish
      updateIngredientChecklist(dishName);
    }
  }
}

// Drag and Drop Handlers
let draggedItem = null;

function dragStart(e) {
  draggedItem = e.target;
  setTimeout(() => {
    e.target.style.display = 'none';
  }, 0);
}

function dragEnd(e) {
  e.target.style.display = 'block';
  draggedItem = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.add('dragover');
  }
}

function dragLeave(e) {
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.remove('dragover');
  }
}

function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.remove('dragover');
    if (draggedItem) {
      // Clone the dragged dish to add to the dropzone
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.textContent = draggedItem.textContent;

      // Add animation
      mealItem.style.opacity = '0';
      e.target.appendChild(mealItem);
      setTimeout(() => {
        mealItem.style.opacity = '0.9';
      }, 10);
    }
  }
}

let firstDishSelected = false;

const ingredientChecklistSection = document.getElementById('ingredient-checklist-section');
const ingredientChecklist = document.getElementById('ingredient-checklist');
const checklistDialog = document.getElementById('checklist-dialog');

// Sample ingredients for demonstration
const sampleIngredients = [
  "Chicken",
  "Lettuce",
  "Tomato",
  "Pasta",
  "Beef",
  "Quinoa",
  "Salmon",
  "Eggs",
  "Flour",
  "Milk"
];

// Function to render ingredient checklist items
function renderIngredientChecklist(ingredients) {
  ingredientChecklist.innerHTML = '';
  ingredients.forEach(ingredient => {
    const item = document.createElement('div');
    item.classList.add('ingredient-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `ingredient-${ingredient}`;
    checkbox.name = ingredient;

    const label = document.createElement('label');
    label.htmlFor = `ingredient-${ingredient}`;
    label.textContent = ingredient;

    item.appendChild(checkbox);
    item.appendChild(label);
    ingredientChecklist.appendChild(item);
  });
}

// Show dialog box near ingredient checklist
function showChecklistDialog() {
  checklistDialog.classList.remove('hidden');
  setTimeout(() => {
    checklistDialog.classList.add('hidden');
  }, 4000); // Hide after 4 seconds
}

// Override drop function to add first dish selection logic
function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropzone')) {
    e.target.classList.remove('dragover');
    if (draggedItem) {
      // Clone the dragged dish to add to the dropzone
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.textContent = draggedItem.textContent;

      // Add animation
      mealItem.style.opacity = '0';
      e.target.appendChild(mealItem);
      setTimeout(() => {
        mealItem.style.opacity = '0.9';
      }, 10);

      // If first dish selected, show dialog and render checklist
      if (!firstDishSelected) {
        firstDishSelected = true;
        showChecklistDialog();
        renderIngredientChecklist(sampleIngredients);
      }
    }
  }
}

const newDishInput = document.getElementById('new-dish-input');
const addDishButton = document.getElementById('add-dish-button');

addDishButton.addEventListener('click', () => {
  const dishName = newDishInput.value.trim();
  if (dishName && !dishes.includes(dishName)) {
    dishes.push(dishName);
    addDishToList(dishName);
    newDishInput.value = '';
  }
});

// Function to add a dish to the dishes list with draggable functionality
function addDishToList(dishName) {
  const dishEl = document.createElement('div');
  dishEl.classList.add('dish');
  dishEl.textContent = dishName;
  dishEl.setAttribute('draggable', 'true');
  dishEl.addEventListener('dragstart', dragStart);
  dishEl.addEventListener('dragend', dragEnd);
  dishesList.appendChild(dishEl);
}

// Initialize the page
initDishes();
initWeekGrid();
