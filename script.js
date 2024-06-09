const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function showloadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show New Quote
function newQuote(){
    showloadingSpinner();
    // pick a randome quate form apiQuotes array
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // check if auther field is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


//Get Quotes From API
async function getQuotes(){

    showloadingSpinner();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
            const response = await fetch(apiUrl)

            apiQuotes = await response.json();

            newQuote();

    }catch(error){
        console.log(error);
    }
}

//Tweet Quote
    function tweetQuote(){
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
        window.open(twitterUrl, "_blank");
    }

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuotes();