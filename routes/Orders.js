const { Router } = require("express");

const router = Router();

const {authMiddleware} = require('../middleware');

const { Order } = require("../models");
router.get("/",authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate(
      "user.userId"
    );
    res.render("orders", {
      isOrder: true,
      title: "Orders",
      orders: orders.map((order) => ({
        ...order._doc,
        price: order.notebooks.reduce((total, c) =>total+=c.notebook.price*c.count,0),
        date:order.date.toDateString()
      })),
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/",authMiddleware, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.nouteId");
    const notebooks = user.cart.items.map((el) => ({
      count: el.count,
      notebook: { ...el.nouteId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      notebooks,
    });
    await order.save();
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
