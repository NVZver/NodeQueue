# NodeQueue
Задача: 
Получить данные по каждому из неограниченного количества объектов с удаленного сервиса.
Записать информацию по каждому в файл и отправить на ftp.

Проблемы:

Сервис может отдавать только по одной записи
После 100 запросов от нашего сервера, отфильтровывает его, как DDOS атаку
Плохое решение:

Каждые 100 запросов делать setTimeout(fun, 1000)

Нормальное решение:
Использовать методы модуля async такие как: waterfall, map, mapSeries и parallel.

Исходные данные:

Массив: objectsList, длиной 4500 записей
Функция, которая получает данные по одному элементу: getObjectData(object, callback){}
Цель:

Создать массив функций, для каждого элемента из массива objectsList, разбить полученный массив на чанки длиной 100,
последовательно запускать каждый чанк, в котором параллельно выполнять все функции.

Чтобы контролировать выполнение функций, будем использовать async.waterfall - функция,
которая принимает массив функций и callback. В процессе выполнения, функции из массива вызываются последовательно. 
При этом, результат выполнения каждой функции передается в следующую.
Если хоть в одной из функций возникнет ошибка, то процесс выполнения сразу перейдет в callback,
в который будет передана ошибка.