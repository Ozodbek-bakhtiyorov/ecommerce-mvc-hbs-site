const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, "images")
  }, 
  filename(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g,"-") + "" + file.originalname)
  }
});

const imgFilter = ["image/jpeg","image/png","image/jpg", "image/svg" ]

const fileFilter = (req, file, cb)=>{
  if(imgFilter.includes(file.mimetype)){
    cb(null, true)
  }
  else{
    cb(null, false);
  }
}

module.exports = multer({
  storage, fileFilter
})