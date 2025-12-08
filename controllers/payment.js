const https = require("https")
const {Products} = require("../models/user");
const { default: axios } = require("axios");

// Call the function



const qs = require('qs');
const { checkEligibility } = require("./api");

// Replace these with your actual credentials and endpoint
const tokenUrl = 'https://api.mtn.com/v1/oauth/access_token?grant_type=client_credentials';
const clientId = '3EKiybDnteaJ2skHsXVGUUNMtGLlvgk2';
const clientSecret ='akgfShZqdCgbMp3f';






const payment =(q,r)=>{
  
  const {email,amount,name} = q?.body
  const params = JSON.stringify({
  "email": email,
  "amount": amount *100,
  "name":name
   
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.LIVE_KEY}`,
    'Content-Type': 'application/json'
  }
}

const req = https.request(options, res => {
  let data = ''
 
  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
   const response = JSON.parse(data)
    r.json(response)
  })
}).on('error', error => {
  console.error(error)
})

req.write(params)
req.end()
}







const total = async(email,add)=>{

     const user = await Products.findOne({email:email})
     const sums = user?.total
     const id = user?._id

     const divid =()=>{return add/100}
     const adds = divid()
    try {
                    const sum =()=>{

                            if(add){ return Number(sums) + Number(adds)}
                           else{ return sums }

                            }

                    const plus = sum()

      await Products.findByIdAndUpdate({_id:id},{total:plus})
                          

    } catch (error) {
          console.log(error.message)
    }
  

}
const total2 = async(id,minus)=>{

     const user = await Products.findById({_id:id})
     const sums = user?.total

  
    try {
                    const sum =()=>{
                            if(minus){ return Number(sums) - Number(minus)
                            }else{ return sums }

                            }

                    const plus = sum()

      await Products.findByIdAndUpdate({_id:id},{total:plus})
                          

    } catch (error) {
          res.json(error.message)
    }
  

}


const transaction = async(object,_id,status,date,amount,size,network)=>{
   try { 
                 await Products.findByIdAndUpdate({_id:_id},{
                    $push:{
                      [`${object}`]:[
                        {
                           size:size,
                            network:network,
                            amount:amount,
                            date:date,
                            status:status
                        }]
                    }
                })
                res.sendStatus(200)
   
    } catch (error) {
         console.log(error.message)
    }
  
}
const order = async(req,res)=>{
  const {userId,date,amount,size,network,phone} = req.body
   try { 
                 await Products.findByIdAndUpdate({_id:userId},{
                    $push:{
                      ["order"]:[
                        {
                           size:size,
                            network:network,
                            amount:amount,
                            date:date,
                            phone:phone
                        }]
                    }
                })
                res.sendStatus(200)
   
    } catch (error) {
         console.log(error.message)
    }
  
}


module.exports = {order,transaction,total,payment,total2}