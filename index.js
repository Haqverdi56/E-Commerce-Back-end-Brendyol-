const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const productRouter = require('./routers/productRouter')
const categoryRouter = require('./routers/categoryRouter')
const commentRouter = require('./routers/commentRouter')
const ratingRouter = require('./routers/ratingRouter')
const userRouter = require('./routers/userRouter')


app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
const port = process.env.PORT || 5000
require("dotenv").config();


mongoose.connect(process.env.SECRET_KEY)
.then(res=>{
    console.log("Connect");
})
.catch(err => {
    console.log("err", err);
})

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/users', userRouter);
app.use('/', function(req, res) {
    res.send("Welcome E-Commerce DataBase")
});


app.listen(port, ()=>{
    console.log("Server running...");
});