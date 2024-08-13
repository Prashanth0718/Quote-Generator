const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".name");
const quoteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

function randomQuote() {
    // Fetching random quotes from the Type.fit API
    fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then(quotes => {
            // Picking a random quote from the array of quotes
            let randomIndex = Math.floor(Math.random() * quotes.length);
            let quote = quotes[randomIndex];
            // Updating quote and author text
            quoteText.innerText = quote.text;
            authorName.innerText = quote.author ? quote.author : "Unknown";
        });
}

// Event listeners for the buttons
quoteBtn.addEventListener("click", randomQuote);
soundBtn.addEventListener("click", () => {
    // Speech Synthesis API to speak the quote
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", () => {
    // Copy the quote to the clipboard
    navigator.clipboard.writeText(quoteText.innerText);
});
twitterBtn.addEventListener("click", () => {
    // Sharing the quote on Twitter
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} - ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

// Fetch the first quote when the page loads
randomQuote();