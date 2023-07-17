const { default: axios } = require("axios")

exports.pay=async (req, res) => {
    const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
   const CALLBACK_URL = "http://localhost:3005/"
   const RETURN_URL = "http://localhost:3005/api/payment-success"
   const TEXT_REF = "tx-myecommerce12345-" + Date.now()
   const config = {
    headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH }`
    }
}
   const data = {
       amount: '1060', 
       currency: 'ETB',
       email: 'abmo475@gmail.com',
       first_name: 'Abdi',
       last_name: 'Mohammed',
       tx_ref: TEXT_REF,
       callback_url: CALLBACK_URL + TEXT_REF,
       return_url: RETURN_URL
   }
   // post request to chapa
   await axios.post(CHAPA_URL, data, config)
       .then((response) => {
           res.redirect(response.data.data.checkout_url)
       })
       .catch((err) => console.log(err))
}