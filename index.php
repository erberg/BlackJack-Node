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

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Blackjack Application</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container"><div class="spacer"></div></div>

        <div class="table-container">
            <div class="card-table">
                <div class="left-card-table"></div>
                <div class="middle-card-table"></div>
                <div class="right-card-table"></div>
                <div class="position-Player1"><div data-card="JC" class="card-container"></div><div data-card="5D" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Player2"><div data-card="JS" class="card-container"></div><div data-card="8C" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Player3"><div data-card="QD" class="card-container"></div><div data-card="KC" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Player4"><div data-card="2H" class="card-container"></div><div data-card="9S" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Player5"><div data-card="10H" class="card-container"></div><div data-card="10D" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Player6"><div data-card="AD" class="card-container"></div><div data-card="QH" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="position-Dealer"><div data-card="5C" class="card-container"></div><div data-card="10D" class="card-container card-offset"></div><div class="username-Player">playernamegoeshere</div></div>
                <div class="btn-container">
                    <div class="btn-group">
                        <button id="betAmt" class="btn btn-primary" style="width:85px;text-align:left;">Bet 5 </button>
                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li style="margin-right:10px;margin-left:10px;">
                                <div id="scroller" class="btn btn-primary"></div>
                            </li>
                        </ul>
                        <button class="btn btn-primary">Stand</button>
                        <button class="btn btn-primary">Hit</button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="socket">
            <li>Connected?</li>
        </ul>
        <script src="/js/jquery.js"></script>
	<script src="js/ui/jquery.ui.core.js"></script>
	<script src="js/ui/jquery.ui.widget.js"></script>
	<script src="js/ui/jquery.ui.mouse.js"></script>
	<script src="js/ui/jquery.ui.draggable.js"></script>
        <script src="/js/bootstrap.js"></script>
        <script src="socket.io.js"></script>
        <script src="/js/cardView.js"></script>
        
        <script>
        $( "#scroller" ).draggable({ axis: "x",containment: "parent", drag: function( event, ui ) {}});
        var val="Bet Min";
        $( "#scroller" ).on("drag", function( event, ui ) {
            val=parseInt($(this).css("left"));
            if(val<5) val=5;
            $( "#betAmt" ).text("Bet " + Math.round((val/114)*100 / 5) * 5);
        });
        </script>
        
        <script>
            var socket = io.connect('http://192.168.2.7:8080');
            socket.on('news', function (data) {
                $(".socket").append("<li>booom</li>");
                console.log(data);
                socket.emit('my other event', { my: 'data' });
            });
        </script>
    </body>
</html>
