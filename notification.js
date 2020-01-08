require('dotenv').config();
const request = require('request');


exports.SendSms = (req,resp)=>{
    // 
    // var mssg = req.body.message;
    // var phonenumber = req.body.tosend;
    //
    //   var obj = {
    //   apikey:process.env.SMSAPIKEY,  //Put your way2sms api key
    //   secret:process.env.SMSSECRET,  // Put your way2sms secret key
    //   usetype:"stage",
    //   phone: phonenumber,
    //   message: mssg,
    //   senderid: process.env.EMAIL  //Put your way2sms senderid, mostly its your account email id
    //
    //   }
    //   request.post({
    //     url: 'https://www.sms4india.com/api/v1/sendCampaign',
    //     body: obj,
    //     json: true
    //   },function(err,res,body){
    //     if(err)console.log(err);
    //     else{
    //       console.log(res);
    //     resp.send(res);
    //     }
    // });
  }


exports.sendemail = (req,res)=>{


    //sending email logic

    res.send('EMAIL notification send');
}
