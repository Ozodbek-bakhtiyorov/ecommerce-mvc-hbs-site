 const  {Router} = require("express");
 const {Cart, Notebook} = require('../models');
 const {authMiddleware} = require('../middleware');

 const router = Router();

 function mapCart (cart){
   return cart.items.map(item=>({
     ...item.nouteId._doc,
     count:item.count
   }))
 }
 function computePrice(notebooks){
    return notebooks.reduce((total,{price, count})=>total+=price*count, 0)
 }

 router.get('/',authMiddleware, async(req, res)=>{
    const user = await req.user.populate("cart.items.nouteId");
    const notebooks = mapCart(user.cart)
   res.render('cart', {title:'Basket', isCart:true, notebooks, total_price:computePrice(notebooks)});
 })

router.delete('/remove/:id',async(req, res)=>{
 await req.user.removeFromCart(req.params.id);
 const user = await req.user.populate("cart.items.nouteId");
 const notebooks = mapCart(user.cart);
 const cart = {
   notebooks
 }
 res.status(200).json(cart);
});

 router.post('/add',authMiddleware, async(req, res)=>{
  const notebook = await Notebook.findById(req.body._id);
  console.log(req.user);
  await req.user.addToCart(notebook);
  res.redirect('/cart');
 });

 module.exports =router