const {Schema, model} = require("mongoose");

const notebook = new Schema({
  title:{
    type:String,
    required:true
  }, 
  price:{
    type:Number, 
    required:true
  },
  description:{
    type:String, 
    required:true
  }, 
  img:{
    type:String, 
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

module.exports = model("Notebook", notebook);
