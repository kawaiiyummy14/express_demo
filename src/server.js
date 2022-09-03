const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/client",express.static(path.resolve(__dirname, "../client")));



// require router
const apiRouter = require("./routes/api");

app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, "../client/index.html"));
});

// define route handler
app.use("/api", apiRouter);

//unknown error handler
app.use('*', (req, res) => {
  return res.status(404).send('The page you are looking for was not found');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred'},
  };
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
