/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// note, io.listen(<port>) will create a http server
var io = require('socket.io').listen(8080);
io.set('log level', 1);
deck = require('./js/server/deck.js');
deck.refillDeck();
board = require('./js/server/board.js');
gameLogic = require('./js/server/gameLogic.js');
gameState = require('./js/server/gameState.js');
gameState.setState('waitingForPlayer');
gameLoop = require('./js/server/gameLoop.js');
boardOutput = require('./js/server/boardOutput.js');
GAMESTATETIMER = '0';
io.sockets.on('connection', function(socket) {
    socket.emit('id', {
        id: socket.id
    });

    socket.emit('updateTable', boardOutput.getBoard());

    socket.on('updateRequest', function(data) {
        socket.emit('updateTable', boardOutput.getBoard());
    });

    socket.on('addPlayerRequest', function(data) {
        if(gameState.currentState.addPlayer(board, data)) {
            if(!gameLoop.running) {
                gameLoop.startLoop(io);
            }
            io.sockets.emit('updateTable', boardOutput.getBoard());
            var clientInfo = getClientInfo(socket.id);
            socket.emit('clientInfoUpdate', clientInfo);
        }
    });

    socket.on('splitRequest', function(data) {
        if(gameState.currentState.splitRequest(data)) {
            io.sockets.emit('updateTable', boardOutput.getBoard());
        }
    });

    socket.on('hitRequest', function(data) {
        if(gameState.currentState.hitRequest(data)) {
            io.sockets.emit('updateTable', boardOutput.getBoard());
        }
    });

    socket.on('standRequest', function(data) {
        if(gameState.currentState.standRequest(data)) {
            io.sockets.emit('updateTable', boardOutput.getBoard());
        }
    });

    socket.on('doubleDownRequest', function(data) {
        if(gameState.currentState.doubleDownRequest(data)) {
            io.sockets.emit('updateTable', boardOutput.getBoard());
        }
    });

    socket.on('betRequest', function(data) {
        if(gameState.currentState.betRequest(data)) {
            if(!gameLoop.running) { //Handles the case that game has been paused.
                gameLoop.startLoop(io);
                var clientInfo = getClientInfo(socket.id);
                socket.emit('clientInfoUpdate', clientInfo);
            }
            io.sockets.emit('updateTable', boardOutput.getBoard());
        }
    });

});


function getClientInfo(id) {
    var clientInfo = {};
    if(clientInfo.position = board.getPlayerIndex(id)) {
        clientInfo.chips = board.playerChips[clientInfo.position];
    } else clientInfo.chips = 0;
    return clientInfo;
}