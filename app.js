const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const MyData = require("./models/myDataSchema")
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  MyData.find()
  .then((result) => {console.log(result)})
  .catch((err) => {console.log(err)})


  res.render('home', { mytitle: 'Home' })
})
app.get('/index.html', (req, res) => {
  res.send("<h1>done<h1>")
})




mongoose
  .connect('mongodb+srv://ayoubbelme2003:gUl0vGRZQaLt9bdM@cluster0.09dm5s3.mongodb.net/alldata?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) });

app.post('/', (req, res) => {
  console.log(req.body);
  const myData = new MyData(req.body);
  myData.save().then(() => {
    res.redirect('index.html');
  }).catch(
    (err) => {
      console.log(err);
    }
  );

}) 