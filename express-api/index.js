const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Post = require('./models/post')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

mongoose.connect('mongodb://localhost:27017/express-love-api');

const db = mongoose.connection
db.on('error',console.log)
db.once('open', () => {
  let post = new Post({title: 'mongoose usage'})
  console.log('save post')
  post.save(function(err){
    if(err) console.log(err)
  })
  console.log('success!')
})

app.get('/posts', (req, res) => {
  console.log('GET /posts........')
  Post.find().sort({'createdAt': -1}).exec(function(err, posts) {
    if (err) return res.status(500).json({error: err.message})
    res.json({ posts })
  })
})

app.get('/faq', () => {
  res.send('this is faq page')
})

app.listen(3000, () => {
  console.log('running on port 3000...')
})
