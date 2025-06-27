// Initial quote list
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Kindness is a language which the deaf can hear and the blind can see.", category: "Wisdom" }
];

// DOM references
const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote');
const categorySelect = document.getElementById('category-select');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Show a random quote based on selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found in this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
}

// Update category dropdown from unique categories
function updateCategoryOptions() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  // Clear and re-add
  categorySelect.innerHTML = `<option value="all">All</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Add a new quote
function createAddQuoteForm() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });

  newQuoteText.value = '';
  newQuoteCategory.value = '';

  updateCategoryOptions();
  alert("Quote added successfully!");
}

// Event bindings
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryOptions();
  showRandomQuote();
});

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
categorySelect.addEventListener('change', showRandomQuote);
