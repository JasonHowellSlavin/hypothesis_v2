const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');

// Routes
const apiRouter = require('./server/routes/api.js');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(cors());
//Static file declaration
app.use(express.static( './client/build'));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  //
  app.get('/', (req, res) => {
    res.sendfile('./client/build/index.html');
  })
}
//build mode
app.get('/', (req, res) => {
  res.sendFile('./client/public/index.html');
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})

// create a GET route
app.use('/api', apiRouter);
