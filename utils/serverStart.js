require('dotenv').config({path:'./config/config.env'});
const port = process.env.PORT || 5000;

module.exports  = (app)=>{
  app.listen(port,()=>console.log(`Server has been started on development in port ${port} successfully :)...`.rainbow))
}