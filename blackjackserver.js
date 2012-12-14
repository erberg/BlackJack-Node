/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var gameLoop = {};
var deck=require('./js/server/deck.js');

gameLoop.init = function() {
    return 1;
};

deck.fillDeck();
deck.randomizeDeck();
gameLoop.init();

var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.emit('id', {
        id: socket.id
    });
    socket.on('join', function (data) {
        console.log(data);
    });
  
});
