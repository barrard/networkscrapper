require('net').createServer(function (socket) {
    console.log("connected");

    socket.on('data', function (data) {
        console.log(data.toString());
    });

    socket.write('data', function(){
    	console.log('callback data?? socket wirte')
    })
})

.listen(5454, function(){
	console.log('port 5454')
});






