const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes From API -1
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();

    // Stop Loader , Show the Quote
    removeLoadingSpinner();
    throw new Error("Oops");
  } catch (error) {
    // Catch Error Here
    alert(error);
    // getQuote();
  }
}

// Get Quotes From API -2
// async function getQuote() {
//   showLoadingSpinner();
//   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//   const apiUrl =
//     "https://api.forismatic.com/api/1.0/?method=getquote&lang=en&format=json";
//   try {
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();

//     // If Author field is blank, add 'Unknown'
//     if (data.quoteAuthor === "") {
//       authorText.innerText = "Unknown";
//     } else {
//       authorText.innerText = data.quoteAuthor;
//     }

//     // Reduce font size for long quotes
//     if (data.quoteText.length > 120) {
//       quoteText.classList.add("long-quote");
//     } else {
//       quoteText.classList.remove("long-quote");
//     }
//     quoteText.innerText = data.quoteText;

//     //  Stop Loader , Show the Quote
//     removeLoadingSpinner();
// throw new Error("Oops");
//   } catch (error) {
//     // Catch Error Here
// alert(error);
//     getQuote();
//   }
// }

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
