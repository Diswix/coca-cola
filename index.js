const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const dataPath = path.join(__dirname, 'data');

const server = http.createServer((req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.url == '/jokes' && req.method == 'GET') {
            getAllJokes(res, req);
        }

        if (req.url == '/jokes' && req.method == 'POST') {
            addJokes(res, req);
        }
        if (req.url.startsWith('/like')) {
            like(res, req);
        }
        if (req.url.startsWith('/dislike')) {
            dislike(res, req);
        }
    } catch (e) {
        res.statusCode = 500;
       return res.end('error 500');
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
function like(res, req) {
    const url = require('url');
    const params = url.parse(req.url, true).query;
    let id = params.id;
    if (id) {
        let filePath = path.join(dataPath, id + '.js');
        let file = fs.readFileSync(filePath);
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.likes++;
        fs.writeFileSync(filePath, JSON.stringify(joke));
    }
    res.end();
}
function dislike(res, req) {
    const url = require('url');
    const params = url.parse(req.url, true).query;
    let id = params.id;
    if (id) {
        let filePath = path.join(dataPath, id + '.js');
        let file = fs.readFileSync(filePath);
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.dislikes++;
        fs.writeFileSync(filePath, JSON.stringify(joke));
    }
    res.end();
}