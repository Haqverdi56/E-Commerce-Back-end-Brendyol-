const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const productRouter = require('./routers/productRouter')
const categoryRouter = require('./routers/categoryRouter')
const commentRouter = require('./routers/commentRouter')
const ratingRouter = require('./routers/ratingRouter')
const userRouter = require('./routers/userRouter');
const { requireAuth } = require('./middleware/authMiddleware');


app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(cookieParser())
require("dotenv").config();
const port = process.env.PORT || 5000


mongoose.connect(process.env.SECRET_KEY)
.then(res=>{
    console.log("Connect");
}) 
.catch(err => {
    console.log("err", err);
})

app.get('/protected', requireAuth, (req, res) => {
    res.send({ message: 'This is a protected route' });
});

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/users', userRouter);
app.use('/', function(req, res) {
    res.send("Welcome E-Commerce DB")
});


app.listen(port, ()=>{
    console.log("Server running...");
});