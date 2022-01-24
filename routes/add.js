const { Router } = require("express");

const { Notebook } = require("../models");

const {authMiddleware} = require('../middleware');
const {validationResult} = require('express-validator');
const {notebookValidators} = require('../utils/validators');

const router = Router();

router.get('/',authMiddleware,(req, res) => {
    res.render("add", { title: "Add New Notebook", isNew: true });
  })

router.post('/',authMiddleware,notebookValidators,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(422).render('add',{ title: "Add New Notebook", isNew: true, error:errors.array()[0].msg, data:req.body })
    }
    try {
      const notebook = await new Notebook({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        img:req.body.img, 
        userId: req.user._id
      });
      await notebook.save();
      res.redirect("/notebooks");
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
