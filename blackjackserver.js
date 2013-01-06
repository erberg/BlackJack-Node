/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var io = require('socket.io').listen(8080);
//io.set('log level', 1);
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
            
    socket.on('addPlayerRequest', function (data) {  
        if(gameState.currentState.addPlayer(board,data))
        {
            if(!gameLoop.running) { gameLoop.startLoop(io); } 
            io.sockets.emit('updateTable', board);   
        }
    });

    socket.on('betRequest', function (data) {
        if(gameState.currentState.placeBet())
        {
            board.placeBet(data["clientID"],data["betAmt"]);                    //Will Likely move logic into states.
            io.sockets.emit('updateTable', board);
        }
    });
    
});

