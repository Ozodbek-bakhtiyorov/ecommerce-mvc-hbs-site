const varMiddleware = require('./var');
const authMiddleware = require('./auth');
const userMiddleware = require('./user');
const errorMiddleware = require('./error');
const fileMiddleware = require('./file');
module.exports = {
  varMiddleware, 
  authMiddleware, 
  userMiddleware, 
  errorMiddleware, fileMiddleware
}