const http = require('http');
const fs = require('fs');
const path = require('path');

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
};

function addJokes(res, req) {
    let data = '';  

    req.on('data', function (chunk) {
        data += chunk;
    });
    
    req.on('end', function () {
        let joke = JSON.parse(data);
        joke.likes = 0;
        joke.dislikes = 0;

        let files = fs.readdirSync(dataPath);
        let fileName = dir.length + '.js';
        fs.writeFileSync = path.join(dataPath, fileName);
        fs.writeFileSync(dataPath, JSON.stringify(joke));

        res.end();
    });
}


