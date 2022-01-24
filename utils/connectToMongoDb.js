const mongoose = require('mongoose');

const {User} = require('../models');

module.exports =async (url)=>{
  
await mongoose.connect(url,{useNewUrlParser:true},(err)=>{
  if(!err){
    console.log(`Connected to MongoDB successfully...`.green)
  }
  else throw err
});
// const candidate = await User.findOne();
// if(!candidate){
//   const user =  new User({
//     email:"ozod@gmail.com", 
//     name:"Ozod", 
//     cart:{
//       items:[ ]
//     }
//   })
//   await user.save();
// }

}

