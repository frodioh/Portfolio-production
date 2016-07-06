//Модули
var fs = require('fs'), // Модуль для работы с файловой системой
    path = require('path'), // Модуль для работы с путями
    mime = require('mime'), // Модуль для работы с MIME-типами
    express = require('express');
//Создание сервера
var app = express();
//Обработка get запроса
app.get('/*', function(req, res) {
  //Получение MIME-типа и кодировки
  var mimeType = mime.lookup(req.url);
  var charset = mime.charsets.lookup(mimeType);
  //Установка заголовков
  res.setHeader('content-type', mimeType + '; charset=' + charset);
  var fileName = './site' + req.url;
  if (fs.existsSync(fileName)) {
    var content = fs.readFileSync(fileName, {encoding: charset});
    res.write(content);
  } else {
    var content = fs.readFileSync('./site/404.html', {encoding: charset});
    res.status(404);
    res.write(content);
  }
  res.end();
});
//Слушает запросы в фоновом режиме
app.listen(80);