/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

requestJoin();
requestBet();
requestSplit();
requestHit();
requestStand();
requestDoubleDown();

function requestJoin() {
    $(".joinButton").click(function() {
        var data = {};
        data["requestedPosition"] = $(".joinButton").index(this) + 1;
        data["clientID"] = glClientID;
        socket.emit('addPlayerRequest', data);
    });
}

function requestBet() {
    $("#betAmt").click(function() {
        var data = {};
        data["betAmt"] = $('#betAmt').data('betamount');
        data["clientID"] = glClientID;
        socket.emit('betRequest', data);
    });
}

function requestSplit() {
    $("#split").click(function() {
        var data = {};
        data["clientID"] = glClientID;
        socket.emit('splitRequest', data);
    });
}

function requestHit() {
    $("#hit").click(function() {
        var data = {};
        data["clientID"] = glClientID;
        socket.emit('hitRequest', data);
    });
}

function requestDoubleDown() {
    $("#doubledown").click(function() {
        var data = {};
        data["clientID"] = glClientID;
        socket.emit('doubleDownRequest', data);
    });
}

function requestStand() {
    $("#stand").click(function() {
        var data = {};
        data["clientID"] = glClientID;
        socket.emit('standRequest', data);
    });
}