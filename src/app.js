const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

// const mongoURI = 'mongodb+srv://cagoncil:k3QZ33w5r195e4qp@cluster0.09cz09s.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require router
const apiRouter = require('./routes/api');

// serve static assets
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// define route handler
app.use('/', apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));