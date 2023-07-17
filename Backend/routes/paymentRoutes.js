const express=require('express');
const { pay, verify } = require('../controller/paymentController');
const router=express.Router();

router.route("/api/pay").post(pay);
router.route("/api/verify-payment/:id").get(verify)
module.exports=router;