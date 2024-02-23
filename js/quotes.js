async function getQuotes() {
    const url = 'https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes?actor=Al%20Pacino';
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Token token=yd8WzkWNEEzGtqMSgiZBrwtt',
            'X-RapidAPI-Key': '788321e4bemsh539392ce40a9a84p1b73b7jsn448d3d49cf0b',
            'X-RapidAPI-Host': 'juanroldan1989-moviequotes-v1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getQuotes();