/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var gameLoop = {};

var deck=require('./js/server/deck.js');
var board=require('./js/server/board.js');

deck.fillDeck();
deck.randomizeDeck();
board.init(deck);

gameLoop.init = function() {
    while(board.numPlayers>0)
        {
            //deal, bet, check dealer bj, options loop til stand bust or timeout
        }
};


var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    
    socket.emit('news', {
        hello: 'world'
    });
    
    socket.emit('id', {
        id: socket.id
    });
    
    socket.on('connect', function (data) {
        socket.emit('updateTable', board);
    });
    
    socket.on('joinRequest', function (data) {
        board.addPlayer(data[0],data[1]);
    });
    
});
