module.exports = async (app, url)=>{
  await require('./connectToMongoDb')(process.env.MONGO_URI);
  require('./serverStart')(app)
}