const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
var allRoutes = require('./routes/allRoutes');
app.use( allRoutes);
const addUserRoute = require("./routes/addUser");
app.use( "/user/add.html",addUserRoute);

//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
const { errorMonitor } = require('stream');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});




mongoose
  .connect('mongodb+srv://ayoubbelme2003:gUl0vGRZQaLt9bdM@cluster0.09dm5s3.mongodb.net/alldata?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) });
