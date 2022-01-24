const fs = require('fs');

module.exports = path=>{
  
  return new Promise((resolve, reject)=>{
    fs.readFile(path,"utf-8", (err, content)=>{
      if(err){
        reject(err);
      }
      else{
          resolve(JSON.parse(content));
      }
    })
  })
}