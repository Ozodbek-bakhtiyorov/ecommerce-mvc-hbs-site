const homeRoutes = require('./home');
const addRoutes = require('./add');
const notebooksRoutes = require('./notebooks');
const cardRoutes = require('./cart');
const ordersRoutes = require("./Orders");
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
module.exports = {
  homeRoutes, 
  addRoutes,
  notebooksRoutes,
  cardRoutes,
  ordersRoutes, 
  authRoutes, 
  profileRoutes
}