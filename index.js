const express = require("express");
const _ = require("lodash");
const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));

const url =
"https://newsapi.org/v2/top-headlines?country=us&apiKey=7951be79a6c041c19329b686edd325d0";

let blogs = [];
const rand = (d, e) => {
  return _.sampleSize(d, e)
}


async function getArticles () {
  await fetch(url)
  .then(res => res.json())
  .then(d => {d.articles.map((e, i) => {
  if (e.content && e.urlToImage !== null) {
    let word = e.content.split(" ")
    word.pop()
    word.pop()
    e.content = word.join(" ")
    e.id = i
    blogs.push(e)
  }})
})}

// getArticles()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  getArticles()
  console.log(`App is listening on port ${port}...`)
  
});

app.get("/", (req, res) => {
  res.render("index", {title: "Home", blogs, rand})
});

app.get("/blogs", (req, res) => {
  res.render("blogs", {title: "Blogs", blogs, rand})
});

 app.get("/blog/:id", (req, res) => {
   let id = req.params.id;
   blog = blogs.find((e) => e.id == id)
   res.render("blog", {title: "Blog", blogs, blog, rand})
 });

app.use((req, res) => {
  res.status(404).send("error 404")
})

module.exports = app
