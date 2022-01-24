const {Schema, model } = require('mongoose');
const user = new Schema({
  email:{
    type:String, 
    required:true
  }, 
  name:{
    type:String,
    required:true
  }, 
  password:{
    type:String
  },
  avatarUrl:String,
  cart:{
    items:[
      {
       count:{ 
         type:Number, 
         required:true,
         default:1
       }, 
       nouteId :{
        type:Schema.Types.ObjectId, 
        ref:"Notebook",
        required:true
       }
      }
    ]
  }
});
user.methods.addToCart = function(notebook){
  let items = [...this.cart.items];
  const index = items.findIndex(el=>{
    return el.nouteId.toString() === notebook._id.toString();
  })
  if(index >= 0){
    items[index].count = items[index].count+1;
  }
  else{
    items.push({
      nouteId:notebook._id,
      count:1,
    })
  }
  this.cart = {items}//qisqartirilgan variant
  return this.save();
}
// bu yerga function ishlatishimiz kerak chunk contex this yoq arrow funcda

user.methods.removeFromCart = function(id){
  let items = [...this.cart.items];
  const index = items.findIndex(el=>el.nouteId.toString() === id.toString());
  console.log(index);
  if(items[index].count === 1){
    items = items.filter(el=>el.nouteId.toString()!==id.toString())
  }else{
    items[index].count--;
  }
  this.cart = {items};
  return this.save();
}

user.methods.cleanCart = function(){
  this.cart = {items:[]};
  return this.save();
  
}

module.exports = model("User", user);
