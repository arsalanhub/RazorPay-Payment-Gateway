const express = require('express');
const routers = express.Router();
const razorpay = require('razorpay');
const path = require('path');

const instance = new razorpay({
    key_id: 'rzp_test_2yHTJ5Z0gOpUwM',
    key_secret: 'E1QnGEBS03CG745rejvcsHCo'
})

const order = {
    order_id: ""
}

routers.get('/', (req, res) => {
    var options = {
        amount: 6*100,
        currency: 'INR',
    }

    instance.orders.create(options, function (err, order){
        if(err){
            console.log(err);
        }else{
            let val = path.join(__dirname, '/checkout.html');
            console.log(val);
            order.order_id = order.id;
            res.sendFile(val, {id: order.id});
        }
    })
})

module.exports = routers
// module.exports = order

