const express = require('express');

const db = require('./db');

const path = require('path');

const app = express();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api', require('./api'));

const port = process.env.PORT || 3000;

//Add into syncAndSeed with .then

db.syncAndSeed()
  .then(()=> {
    app.listen(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
  })



