const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');

// Routes
const apiRouter = require('./server/routes/api.js');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(cors());
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.use('/api', apiRouter);
