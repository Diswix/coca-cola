const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const dataPath = path.join(__dirname, 'data');

const server = http.createServer((req, res) => {
    if (req.url == '/jokes' && req.method == 'GET') {
        getAllJokes(res, req);
    }

    if (req.url == '/jokes' && req.method == 'POST') {
        addJokes(res, req);
    }
});

server.listen(3000);

function getAllJokes(res, req) {

    let dir = fs.readdirSync(dataPath);
    let allJokes = [];

    for (let i = 0; i < dir.length; i++) {
        let file = fs.readFileSync(
            path.join(dataPath, i + '.js')
        );

        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        
        joke.id = i;

        allJokes.push(joke);
    }

    res.end(JSON.stringify(allJokes));
}


