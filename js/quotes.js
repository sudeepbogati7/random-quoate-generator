const quoteText = document.querySelector('.quote');

const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const randBtn = document.querySelector('.random');
const authorName = document.querySelector(".author .name");

const copyIcon = document.querySelector("#copy-icon");
const copyText = document.querySelector(".copy-text");

const incFontIcon = document.getElementById("increase-font-icon");
const decFontIcon = document.getElementById("decrease-font-icon");
let currentFontSize = 20;

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
async function getAndDisplayQuotes(index){
    const quoteData = await getQuotes(url, options);
    quotes[index] = quoteData;
    displayQuotes(index);
    
}
function displayQuotes(index){
    quoteText.innerText = "Loading .....";
    const quote = quotes[index];
    quoteText.innerText = quote.content;
    authorName.innerText = quote.author;
}


// random button suffles the quote
randBtn.addEventListener("click", ()=>{
    copyText.innerText = "Copy";
    randBtn.innerText = "Loading quote...";
    getQuotes(url, options).then(data => {
        currentQuotesIndex = quotes.length;
        quotes.push(data);
        displayQuotes(currentQuotesIndex);
        randBtn.innerText= "Random";
    });
});

previousBtn.addEventListener("click" , () => {
    copyText.innerText = "Copy";
    if(currentQuotesIndex === null || currentQuotesIndex === 0 ){
        return ; // do nothing and exit
    }else {
        currentQuotesIndex --;
        displayQuotes(currentQuotesIndex); 
    }
});

nextBtn.addEventListener("click", () => {
    copyText.innerText= "Copy";
    nextBtn.innerText = "Loading ....";
    if(currentQuotesIndex === null || currentQuotesIndex === quotes.length - 1 ){
        getAndDisplayQuotes(quotes.length);
    }else{
        currentQuotesIndex++;
        displayQuotes(currentQuotesIndex);

    }
    nextBtn.innerText = "Next  >> ";

});

getAndDisplayQuotes(0); //initially 

// copy quote ------
copyIcon.addEventListener("click", async () => {
    try {
        const range = document.createRange();
        range.selectNodeContents(quoteText);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        await navigator.clipboard.writeText(quoteText.innerText);
        copyText.innerText = "Copied "
        // alert("Quote copied to clipboard!");
    } catch (error) {
        console.error("Error copying quote to clipboard:", error);
        alert("Failed to copy quote to clipboard. Please try again.");
    } finally {
        const selection = window.getSelection();
        selection.removeAllRanges();
        // copyText.innerText = "Copy";
    }
});


// font-size controller 

function increaseFontSize(){
    currentFontSize += 1;
    quoteText.style.fontSize = `${currentFontSize}px`;
}

function decreaseFontSize(){
    currentFontSize -= 1;
    quoteText.style.fontSize = `${currentFontSize}px`;
}

incFontIcon.addEventListener("click", () =>{
    increaseFontSize();
});
decFontIcon.addEventListener("click", () =>{
    decreaseFontSize();
});
console.log(quotes);