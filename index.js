const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const stripe=require('stripe')(functions.config().stripe.testkey)


exports.stripePayments=functions.https.onRequest(async(req,res)=>{
   console.log('AMOUNT coming is ==>',req.body.amount)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,//1999,
        currency:'usd'
    },
        function(err,paymentIntent){
            if(err!=null){
                console.log('CLOUD FUNCTION error is ===> ',err)
            }else{
                res.json({
                    PaymentIntent: paymentIntent.client_secret
                })
            }
        }
    )
})