//Реализация:
// Обрабатываемый массив

var async = require('async');
var chunkSize = 2
var objectsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

getObjectListData()

// Запускаем функции в нужной последовательности
function getObjectListData(){
	async.waterfall([
	createFnArray,
	createChunks,
	runMapSeries,
    ], sendToFTP)
}

// Создаем массив функий, для кажого элемента из массива objectsList
function createFnArray(callback){
	async.map(objectsList, makeFn, function(err, fnArray){
        if ( err != null ) callback(err, null)
		callback(null, fnArray)
    })
}

// Создаем функцию
function makeFn(obj, callback){
	callback(null, function(callback){
	    getObjectData(obj, callback);
    })
}

// Получаем данные об объекте
function getObjectData(obj, callback){
    obj += 1
    callback(null, obj)
}

// Создаем чанки
function createChunks(fnArray, callback){
  var j = fnArray.length;
  chunks = [];
  for(var i=0; i<j; i+=chunkSize){
      chunk = fnArray.slice(i, i+chunkSize);
      chunks.push(chunk);
  }
  callback(null, chunks)
}

// Перебираем полученные чанки
function runMapSeries(chunks, callback){
	async.mapSeries(chunks, runFuncitons, function(err, result){
        if ( err != null ) callback(err, null)
		callback(null, result)
})
}

// Запускаем параллельно все функции в чанке
function runFuncitons(chunk, callback){
	async.parallel(chunk, function(err, results){
	if ( err != null ) callback(err, null)
	callback(null, results)
})
}

// Отправляем полученные данные на FTP сервер
function sendToFTP(err, result) {
	// Релизация
    console.log(result)
}