// const http = require('http');
const express = require('express');
const app = express();
const helper = require('./hepler')
const pokemon = require('./route/pokemon.route')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/pokemon', pokemon)

app.get('/', function(request, response){
    response.send('Hello from the express server. It says: ' + helper.returnRandomString())
})

app.post('/', function(request, response){
    response.send('Hello from POST api first.')
}) // the first one takes priority. 
// app.post('/', function(request, response){
//     response.send('Hello from POST api.')
// })

app.listen(3000, function(){
    console.log('Server sarted...')
})

// const server = http.createServer(function(request, response){
//     response.writeHead(404, {'Content-Type': 'text/plain'});
//     // response.write(200, {'Content-Type':'text/plain'});
//     // response.end('Hello from my Node server :)')
//     response.end('Hello from my Node server :)');
// });

// server.listen(3000, "127.0.0.1", function(){
//     console.log("Starting server...");
// })