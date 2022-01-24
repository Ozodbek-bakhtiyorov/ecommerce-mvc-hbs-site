const { Router } = require("express");

const { Notebook } = require("../models");

const {authMiddleware} = require('../middleware')

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const notebooks = await Notebook.find().populate("userId", "email name").select("title img price description");

    res.render("notebooks", { title: "Notebooks", isNotebooks: true, notebooks, userId:req.user? req.user._id.toString():null });
  } catch (err) {
    console.log(err)
  }

});

router.post("/edit", authMiddleware,async (req, res) => {
  console.log(_id);
  const {title, price, description,img} = req.body;
  const notebook = {
    title, 
    price, 
    img,
    description
  }
  const notebooks = await Notebook.findByIdAndUpdate(_id,notebook);
  res.redirect("/notebooks");
});
router.get("/:id/edit",authMiddleware, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
try {
  const notebook = await Notebook.findById(req.params.id);
  res.render("notebook-edit", { notebook });
} catch (e) {
  console.log(e)
}
});

router.route("/:id").get(async (req, res) => {
  const notebook = await Notebook.findById(req.params.id);
  res.render("notebook", { notebook, layout: "detail" });
});
router.post("/remove",authMiddleware, async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.body._id);
    await Notebook.deleteOne({ _id: req.body._id });
    res.redirect('/notebooks')
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
