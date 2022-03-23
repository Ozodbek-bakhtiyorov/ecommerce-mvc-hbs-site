require("dotenv").config({ path: "./config/config.env" });
require("colors");
const Handlebars = require("handlebars");
const path = require('path');
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const {varMiddleware, userMiddleware, errorMiddleware, fileMiddleware} = require('./middleware');
const flash = require('connect-flash');
//import Routes
const {
  homeRoutes,
  addRoutes,
  notebooksRoutes,
  cardRoutes,
  ordersRoutes,
  authRoutes,
  profileRoutes
} = require("./routes");
const { User } = require("./models");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers:require('./utils/hbsHelper'),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

//MongodbStore
const store = new MongoStore({
  collection:"sessions", 
  uri:process.env.MONGO_URI
});

app.use(session( {
  secret:"Ozodbek", 
  reseave:false,
  saveUninitialized:false, 
  store:store
}));

//settings
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//middlewares
app.use(fileMiddleware.single("avatar"))
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.use("/images",express.static(path.join(__dirname,"images")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userMiddleware);
app.use(varMiddleware);

//use Routes
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/cart", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use('/profile', profileRoutes);

app.use(errorMiddleware);

//server litener and connec to Mongodb
require("./utils/start")(app);
