module.exports = function(req, res, next){
  res.status(404).render("not_found", {
    title:"Page Not Found"
  })
}