function getQuotes(){
    fetch('https://api.quotable.dev/quotes')
        .then((res) => {
            if(!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.error("Error fetching quotes", err);
        });
}

getQuotes();