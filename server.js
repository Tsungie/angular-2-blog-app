const express = require('express');
//declare a variable for our body-parser which we install through npm
const bodyParser = require('body-parser');
//create a variable for path which allows you to wor with files and folders
const path = require('path');
//create an http server
const http = require('http');
const app = express();
const api = require('./server/routes/api');

//setup our data for handling icoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))//it will tell the parser not to accept any nested objects

//we going to tell express to save static files from angulars dist folder
app.use(express.static(path.join(__dirname,'dist')));
app.use('/api',api);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
})

//Set Port
const port = process.env.PORT ||'3000';
app.set('port',port);

//create the http server
const server = http.createServer(app);

server.listen(port,()=>console.log(`Running on localhost:${port}`));