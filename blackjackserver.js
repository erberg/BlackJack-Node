/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
