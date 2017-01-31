var express = require('express');
var request = require('request');
var http = require('http');


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
// var s = require('net').Socket();
// var socketConnectionInterval = setInterval(function(){
// 	s.connect(5454)
// 		.on('connect', socketConnect)
// 		.on('error', socketError)
// },2000) 
// function tryReconnectSocket(){
// 	this.removeListener('close', tryReconnectSocket)
// 	this.removeListener('error', socketError)
// 	this.removeListener('connect', socketConnect)
// 	 socketConnectionInterval = setInterval(function(){
// 		s.connect(5454)
// 			.on('connect', socketConnect)
// 			.on('error', socketError)
// 	},2000) 
// }
// function socketConnect(){
// 	clearInterval(socketConnectionInterval)
// 	this.removeListener('error', socketError)
// 	this.removeListener('connect', socketConnect)
// 	console.log('socket connection')
// 	this.on('close', tryReconnectSocket)
// }
// function socketError(){
// 	this.removeListener('error', socketError)
// 	this.removeListener('connect', socketConnect)
// 	console.log('error')
// }


var bodyParser = require('body-parser');

var databaseFunctions = require('./databaseFunctions.js')

app.use(express.static('assets'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.listen(3232, function(){
	console.log('listening on 3232 dirName__: '+ __dirname)
})

var scrapeSocket = io.of('/scrape').on('connection', function(socket){
		console.log('socket scraping')
		socket.emit('gogetit', 'data')
})



app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html')
})




app.post('/getIPdata', function(req, res){
  var id=req.body.id
  var asis=req.body.asis
  console.log('Got request for IP data')
  var dataObj={}
  var query = {'id':id,
             'asis':asis}
  databaseFunctions.FindInCollection('IPTraffic', query, function(resultObj){
    res.send(resultObj)
  })

})



function emitDatetoSocket(data, socket){
	socket.emit('newNetworkData', data)
}



// var request = require('request')
// var cheerio = require('cheerio')
// var MongoClient = require('mongodb').MongoClient
// var url = 'http://192.168.200.1/xslt?PAGE=C_1_0'
// var dbUrl = 'mongodb://localhost:27017/users'
// var count = 0
// socketConnectonsArray=[]
// require('net').createServer(function (socket) {
//     console.log("connected");
//     socketConnectonsArray.push(socket)
//     socket.on('data', function (data) {
//         console.log(data.toString());
//     });
// })

// .listen(5454, function(){
// 	console.log('port 5454')
// });
// setInterval(function(){
//  count++
// request(url, function(error, response, body) {
//       console.log('requesting '+url)
//         if (!error && response.statusCode === 200) {
//             if (body) {
//                 var chee = cheerio.load(body)
//                 tableData = chee('table').eq(3).html()
//                 var table3 = cheerio.load(tableData)
//                   // IP_Trafic_data0 = table3('tr').eq(0).html()
//                   IP_Trafic_data1 = table3('tr').eq(1).html()
//                   IP_Trafic_data2 = table3('tr').eq(2).html()
//                   IP_Trafic_data3 = table3('tr').eq(3).html()
//                   IP_Trafic_data4 = table3('tr').eq(4).html()
//                   IP_Trafic_data5 = table3('tr').eq(5).html()
//                   IP_Trafic_data6 = table3('tr').eq(6).html()
// 				IPDataArray = [IP_Trafic_data1, IP_Trafic_data2, IP_Trafic_data3, IP_Trafic_data4, IP_Trafic_data5, IP_Trafic_data6]
// 				var final_IP_Data = []
//                 for(var x = 0;x<IPDataArray.length;x++){
//                   var type, asis;
//                   var $ = cheerio.load(IPDataArray[x])
//                   //skip x = 2 and 3
//                   if(x === 2|| x===3){continue}

//                   if(x===0){
//                     console.log('transmit IP traffic')
//                     type = 'transmit'
//                     asis = 'IP'
//                   }
//                   if(x===1){
//                     console.log('Receive IP traffic')
//                     type = 'receive'
//                     asis = 'IP'
//   }
//                   if(x===4){
//                     console.log('Transmit ATM traffic')
//                     type = 'transmit'
//                     asis = 'ATM'

//                   }
//                   if(x===5){
//                     console.log('Receive ATM traffic')
//                     type = 'receive'
//                     asis = 'ATM'

//                   }
//                   var ID = $('td').eq(0).text()
//                   var Bytes = $('td').eq(1).text()
//                   var Packets = $('td').eq(2).text()
//                   var Errors = $('td').eq(3).text()
//                   var Percent = $('td').eq(4).text()
//                   console.log(ID)
//                   console.log(Bytes)
//                   console.log(Packets)
//                   console.log(Errors)
//                   console.log(Percent)
//                   var data = {
//                     id :ID,
//                     type:type,
//                     asis:asis,
//                     bytes:Bytes,
//                     packets:Packets,
//                     errors:Errors,
//                     perc:Percent,
//                     dateTime:new Date()
//                   }
//                   final_IP_Data.push(data)

//                 }
//   				console.log(final_IP_Data)
//   				for(var x = 0;x<socketConnectonsArray;x++){
//   					socketConnectonsArray[x].emit(final_IP_Data)
//   				}
//                 var url = 'mongodb://localhost:27017/users';
//                 MongoClient.connect(dbUrl, function(err, db) {
//                   if(err){console.log('error final ip data')}
//                     else{
//                       var collection = db.collection('IPTraffic');
//                       for(var x = 0;x<final_IP_Data.length;x++){
//                         collection.insert(final_IP_Data[x], function(err, result){
//                           if(err){console.log(err)}
//                             else{console.log(result)}
//                         })
//                       }
//                     }
//                 })//mongo
//             }else{
//               console.log('no body?')
//             }
//           }else{
//             socket.emit('serverResponse', error)
//             console.log(error)
//           }
//         })
// console.log(count)
// },1000*60)
