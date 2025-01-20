const { port } = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');
// app.set("view engine", "ejs");
// const http = require('http');
// mongoose.connect();
// http.createServer(app).listen(port);
// console.log(`App is running on ${port}`)
// module.exports = app;

//
// const express = require('express');
// const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
