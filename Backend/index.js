const express = require("express")
const { pay } = require("./controller/paymentController")
const app = express()
const axios = require("axios").default
require("dotenv").config()
const PORT = process.env.PORT || 4400
const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
const CHAPA_AUTH = process.env.CHAPA_AUTH // || register to chapa and get the key

app.set("view engine", "ejs")

// req header with chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`
    }
}
// entry for the front end
app.get('/', (req, res) => {
    res.render("index")
})

// initial payment endpoint
app.post("/api/pay",pay)

// verification endpoint
app.get("/api/verify-payment/:id", async (req, res) => {
    
        //verify the transaction 
        await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
            .then((response) => {
                console.log("Payment was successfully verified")
            }) 
            .catch((err) => console.log("Payment can't be verfied", err))
})

app.get("/api/payment-success", async (req, res) => {
    res.render("success")
})

app.listen(PORT, () => console.log("Server listening on port:", PORT))