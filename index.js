const express = require('express')
const app = express()
const path = require('path')
// const { v4:uuidv4 } = require('uuid');
var uniqid = require('uniqid');
const methodOverride = require('method-override')

const port = 8080

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(methodOverride('_method'))

let posts = [
    {
        name: "Anant",
        age: 25,
        id: uniqid(),
        content: "I love Coding"
    },
    {
        name: "Anu",
        age: 23,
        id: uniqid(),
        content: "Iam Master at coding"
    },
    {
        name: "Raksha",
        age: 24,
        id: uniqid(),
        content: "Live Love Laugh Code"
    }
]

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
})

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
})

app.post('/posts', (req, res) => {
    let { age, name, content } = req.body
    posts.push({ id: uniqid(), name, age, content })
    // console.log(req.params)
    res.redirect("/posts")

})

app.get('/posts/:id', (req, res) => {
    // console.log("request received at posts/id")
    let { id } = req.params
    let post = posts.find((p) => (id == p.id))
    // console.log(post)
    res.render("edit.ejs", { post });
})

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params
    let { content } = req.body
    let post = posts.find((p) => (id == p.id))
    // console.log(post)
    post.content = content
    res.redirect("/posts")

})

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params
    // let {content} = req.body
    posts = posts.filter((p) => (id != p.id))
    console.log(post)
    // posts.pop(post)
    res.redirect("/posts")

})


app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})