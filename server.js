const express = require('express')
const dotenv = require('dotenv');

// const bodyParser=require('body-parser')
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/user',require('./routes/userRoutes'))


app.listen(port, () => {
    console.log(`server is running ${port} `)
})