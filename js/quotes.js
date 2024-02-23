const quoteText = document.querySelector('.quote');
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const randBtn = document.querySelector('.random');
const authorName = document.querySelector(".author .name");

const url = 'https://api.quotable.io/random';
const options = {method: 'GET'};

// declare and initialze global variables
let currentQuotesIndex = null;
let quotes = [];

async function getQuotes(url , options){
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
    }
}

// fetch the quoets and display 
async function getAndDisplay(index){
    const quoteData = await getQuotes(url, options);
    quotes[index] = quoteData;
    displayQuote(index);
    
}
function displayQuotes(index){
    const quote = quotes[index];
    quoteText.innerText = quote.content;
    authorName.innerText = quote.author;
}


// random button suffles the quote
randBtn.addEventListener("click", ()=>{
    randBtn.innerText = "Loading quote...";
    getQuotes(url, options).then(data => {
        currentQuotesIndex = null;
        quotes.push(data);
        displayQuotes(quotes.length - 1);
        randBtn.innerText= "random";
    });
});

