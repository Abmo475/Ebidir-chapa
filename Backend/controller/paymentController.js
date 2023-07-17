const { default: axios } = require("axios")
exports.config = {
    headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH }`
    }
}
exports.CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
exports.CALLBACK_URL = "http://localhost:3005/"
exports.RETURN_URL = "http://localhost:3005/api/payment-success"
exports.TEXT_REF = "tx-myecommerce12345-" + Date.now()
exports.pay=async (req, res) => {
   const data = {
       amount: '1060', 
       currency: 'ETB',
       email: 'abmo475@gmail.com',
       first_name: 'Abdi',
       last_name: 'Mohammed',
       tx_ref: this.TEXT_REF,
       callback_url: this.CALLBACK_URL + this.TEXT_REF,
       return_url: this.RETURN_URL
   }
   // post request to chapa
   await axios.post(this.CHAPA_URL, data, this.config)
       .then((response) => {
           res.redirect(response.data.data.checkout_url)
       })
       .catch((err) => console.log(err))
}
exports.verify=async (req, res) => {
    
    //verify the transaction 
    await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, this.config)
        .then((response) => {
            console.log("Payment was successfully verified")
        }) 
        .catch((err) => console.log("Payment can't be verfied", err))
}