/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var gameLoop = {};
var deck=require('./js/server/deck.js');
var board=require('./js/server/board.js');

gameLoop.init = function() {
    return 1;
};

deck.fillDeck();
deck.randomizeDeck();
board.init(deck);
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
        socket.emit('displayCards', board.publicCards);
    });
  
});
