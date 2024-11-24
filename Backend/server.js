const bodyParser = require('body-parser')
const express=require('express')
const app=express()
require('dotenv').config()
require('./models/db')
const cors = require('cors');
const Authroute=require('./router/Authroute')

const PORT=process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',Authroute)
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})