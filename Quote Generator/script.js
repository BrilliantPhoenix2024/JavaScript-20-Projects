const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Show New Quote
function newQuote() {
  loading();
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
  complete();
}

// Get Quotes From API
// async function getQuote() {
//   loading();
//   const apiUrl = "https://type.fit/api/quotes";
//   try {
//     const response = await fetch(apiUrl);
//     apiQuotes = await response.json();
//     newQuote();

//     // Stop Loader , Show the Quote
//     // complete();
//   } catch (error) {
//     // Catch Error Here
// getQuote();
//     // console.log('Whoops, no quote', error)
//   }
// }

// Get Quotes From API
async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getquote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If Author field is blank and replace it with 'Unknown'
    // if (data.quoteAuthor === "") {
    //   authorText.textContent = "Unknown";
    // } else {
    //   authorText.textContent = data.quoteAuthor;
    // }
    // Reduce font size for long quotes
    // if (quote.text.length > 120) {
    //   quoteText.classList.add("long-quote");
    // } else {
    //   quoteText.classList.remove("long-quote");
    // }
    // quoteText.textContent = data.quoteText;
    // Stop Loader , Show the Quote
    // complete();
  } catch (error) {
    // Catch Error Here
    getQuote();
    console.log("Whoops, no quote", error);
  }
}

// Tweet Quote
// function tweetQuote() {
//   const quote = quoteText.innerText;
//   const author = authorText.innerText;
//   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
//   window.open(twitterUrl, "_blank");
// }

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
// twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
