const request = require('request')
const fs = require('fs') 
const urlAndPath = process.argv.slice(2)  
const url = urlAndPath[0]  //enoent
const path = urlAndPath[1]

//Use the request library to make the HTTP request
request(url,(error, response, body) => {
  if(error) console.log('error:', error) 
  if(response) console.log('statusCode', response && response.statusCode)  
  if(response.statusCode >= 300 || response.statusCode < 200) {  //check if status code in 200s
    console.log('Something went wrong')
    return 0 
  }
  fs.writeFile(path, body, function(err) {
    if (err.code === 'ENOENT') {           //Check if file path ios valid
      console.log("Directery doesnt exist") 
      return 0
    }
    if (err) throw err  
      const stats = fs.statSync(path)
      const fileSizeInBytes = stats["size"]     //get file size in bytes
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${path}`)
  })
})