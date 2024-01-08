const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const BlogPost = require('./models/blogpostD');
const User = require('./models/userD');
const authMiddleware = require('./middleware/authMiddleware');
const url = 'mongodb://localhost:27017/blogpostDB'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected..')
})

app.use(express.json());

const userRouter = require('./routes/user');
const blogpostRouter = require('./routes/blogpost');
const commentRouter = require('./routes/comment');

app.use('/user',userRouter);
app.use('/blogpost', blogpostRouter);
app.use('/comment', commentRouter);

app.listen(9000, () => {
    console.log('Server Started')
})