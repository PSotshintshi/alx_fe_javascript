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
  saveQuotes();
  newQuoteText.value = '';
  newQuoteCategory.value = '';
 const newEntry = { text, category };
  quotes.push(newEntry);
 // updateCategoryOptions();//
  alert("Quote added successfully!");
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
   // quotes.forEach(displayQuote);//
  }
}
// Session storage: display last viewed quote
function updateLastViewedDisplay() {
  const lastViewed = sessionStorage.getItem("lastViewed");
  const display = document.getElementById("lastViewedQuote");
  if (display && lastViewed) {
    const { text, category } = JSON.parse(lastViewed);
    display.textContent = `"${text}" — ${category}`;
  }
}

// Event bindings
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryOptions();
  showRandomQuote();
  showRandomQuote();
  updateLastViewedDisplay();
});

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
categorySelect.addEventListener('change', showRandomQuote);

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        importedQuotes.forEach(displayQuote);
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format. Expected an array of quotes.");
      }
    } catch (e) {
      alert("Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


