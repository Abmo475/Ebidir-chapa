const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 4400
const payment=require('./routes/paymentRoutes')
app.use('/',payment)
app.get('/',(req,res)=>{
    return res.send('Welcome to Ebidir Payment');
})
app.listen(PORT, () => console.log("Server listening on port:", PORT))