
const server = http.createServer((req, res) => {
    if(req.url == '/jokes' && req.method == 'GET') {
        getAllJokes(res,req);
}});
server.listen(3000);