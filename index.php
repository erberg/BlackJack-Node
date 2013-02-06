<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <title>Blackjack Application, by Eric R. Berg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="/css/bootstrap.css" rel="stylesheet">
        <link href="/css/blackjack.css" rel="stylesheet">

    </head>

    <body>

        <div class="table-container">
            <div class="card-table">
                <div class="left-card-table"></div>
                <div class="middle-card-table"></div>
                <div class="right-card-table"></div>
                <div class="position-Dealer"><div class="username-Player">Dealer</div></div>
                <div class="position-Player1"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 1</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="position-Player2"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 2</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="position-Player3"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 3</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="position-Player4"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 4</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="position-Player5"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 5</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="position-Player6"><div class="btn joinButton btn-primary">Join Table</div><div class="btn sitOutButton btn-inverse disabled">Sitting Out</div><div class="username-Player">Player 6</div><div class="chips-Player">$$$</div><div class="bet-Player">$$$</div></div>
                <div class="message"></div>
                <div class="btn-container">
                    <div class="btn-group">
                        <button id="betAmt" data-betAmount="5" class="btn btn-primary" style="width:85px;text-align:left;">Bet 5 </button>
                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li style="margin-right:10px;margin-left:10px;background-image: url(graphics/scroller.png);">
                                <div id="scroller" class="btn btn-primary"></div>
                            </li>
                        </ul>
                        <button id="hit" class="btn btn-primary">Hit</button>
                        <button id="stand" class="btn btn-primary">Stand</button>
                        <button id="doubledown" class="btn btn-primary">Double-Down</button>
                        <button id="split" class="btn btn-primary">Split</button>

                    </div>
                </div>
            </div>
        </div>
        <ul class="socket"> </ul>
        <script src="/js/jquery.js"></script>
        <script src="/js/ui/jquery.ui.core.js"></script>
        <script src="/js/ui/jquery.ui.widget.js"></script>
        <script src="/js/ui/jquery.ui.mouse.js"></script>
        <script src="/js/ui/jquery.ui.draggable.js"></script>
        <script src="/js/ui/interface.js"></script>
        <script src="/js/bootstrap.js"></script>
        <script src="socket.io.js"></script>
        <script src="/js/boardView.js"></script>
        <script src="/js/buttonController.js"></script>
        <script src="/js/playerDisplayState.js"></script>

        <script>
            var glClientID = -1;
            var socket = io.connect('http://www.ericrberg.com:8080');
            var glClientBoard = {};
            var glClientInfo = {};

            socket.on('id', function(data) {
                //$(".socket").append("<li>My ClientID: " + data.id + "</li>");
                glClientID = data.id;
            });


            socket.on('updateTable', function(board) {
                glClientBoard = board;
                //$(".socket").append("<li>Message: " + board.currentMessage + "</li>");
                displayBoard();
            })

             socket.on('clientInfoUpdate', function(clientInfoFromServer) {
                glClientInfo = clientInfoFromServer;
            })
            
        </script>
    </body>
</html>
