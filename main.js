//Модули
var fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    express = require('express');
//Создание сервера
var app = express();
//Обработка get запроса
app.get('/*', function(req, res) {
  //Сохранение имени файла
  var fileName = './site' + req.url;
  if(fileName === './site/') fileName = fileName + 'index.html';
  //Получение MIME-типа
  var mimeType = mime.lookup(fileName),
      charset = mime.charsets.lookup(mimeType);
  //Установка заголовков
  res.setHeader('Content-Type', mimeType + '; charset=' + charset);
  console.log(fileName);
  if(fs.existsSync(fileName)) {
    var content = fs.readFileSync(fileName, {encoding: charset});
    res.write(content);
  } else {
    var content = fs.readFileSync('./site/404.html', {encoding: 'utf8'});
    res.status(404);
    res.write(content);
  }
  res.end();
});
//Слушает запросы в фоновом режиме
app.listen(80);