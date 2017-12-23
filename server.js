const http  = require('http');
const fs = require('fs');
const PORT = 8000;
const getContentType=function(file){
  let contentTypes = {
    '.js':'text/javascript',
    '.html':'text/html',
    '.css':'text/css',
    '.ico':"image/ico"
  }
  let fileExtension = file.slice(file.lastIndexOf('.'));
  return contentTypes[fileExtension];
}

const sendResponse = function(res,content,contentType,statusCode){
  res.statusCode = statusCode;
  res.setHeader('Content-type',contentType);
  res.write(content);
}

const requestHandler = function(req,res){
  let file = req.url=='/'? 'snake.html' :req.url.slice(1);
  if(fs.existsSync(file)){
    let contentType = getContentType(file);
    let content = fs.readFileSync(file);
    sendResponse(res,content,contentType,200);
}else{
  sendResponse(res,`${file} not found`,'text/plain',404);
  }
  res.end();
}
const server = http.createServer(requestHandler);
server.listen(PORT);
console.log(`server is listening on port ${PORT}`);
console.log(`open browser and type localhost:${PORT} to play game`);
