const fs = require('fs');

module.exports = (file_directory,data)=>{
  return new Promise((resolve, reject)=>{
    fs.writeFile(
      file_directory, 
      JSON.stringify(data),
      (err)=>{
        if(err) {reject(err)}
        else{
          resolve(data)
        }
      }
    )
  })
}