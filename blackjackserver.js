/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var io = require('socket.io').listen(8080);

deck=require('./js/server/deck.js');
board=require('./js/server/board.js');
deck.fillDeck();
deck.randomizeDeck();
gameState=require('./js/server/gameState.js');
gameState.setState('waitingForPlayer');
gameLoop = require('./js/server/gameLoop.js');
io.sockets.on('connection', function (socket) {
    socket.emit('updateTable', board);
    socket.emit('id', {
        id: socket.id
    });
    
    socket.on('connect', function (data) {
        socket.emit('updateTable', board);
    });
    
    socket.on('updateRequest', function (data) {
        socket.emit('updateTable', board);
    });
     
    //var sendUpdate = setInterval(function() {   //Looking for better ways to do this (or a way to use io sockets from state module.
    //    socket.emit('updateTable', board);
    //}, 500);
            
    socket.on('addPlayerRequest', function (data) {  //If no players, kicks off game loop. 
        if(gameState.currentState.addPlayer())
        {
            if(board.addPlayer(data["clientID"],data["requestedPosition"]))
            {
                if(!gameLoop.running) 
                {
                    gameLoop.startLoop(io);
                }
            }
        }
        io.sockets.emit('updateTable', board);
    });
    
});

