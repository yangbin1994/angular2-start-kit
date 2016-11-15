var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static('./'));

// 加载api
fs.readdirSync('./apis').forEach(function (fileName) {
	var match = fileName.replace('.js', '').split('-')
	var method = match[0]
	var apiName = match[1]
	var rspFunc = require(path.resolve('apis', fileName))
	app[method]('/' + apiName, rspFunc)
});


// 启动
app.listen(8888, function () {
	console.log('app server launch at', 8888);
});