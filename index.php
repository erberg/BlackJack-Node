<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <title>Blackjack Card-Counting Application, by Eric R. Berg</title>
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
                    <a class="brand" href="#">Blackjack Card-Counting Application</a>
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
                <div class="card-container position-Player1" style="background-image: url(graphics/JC.png);">
                    <div class="username-Player">playernamegoeshere</div>    
                </div>
                <div class="card-container position-Player2" style="background-image: url(graphics/JS.png);"><div class="username-Player">playernamegoeshere</div> </div>
                <div class="card-container position-Player3" style="background-image: url(graphics/JD.png);"><div class="username-Player">playernamegoeshere</div> </div>
                <div class="card-container position-Player4" style="background-image: url(graphics/JH.png);"><div class="username-Player">playernamegoeshere</div> </div>
                <div class="card-container position-Player5" style="background-image: url(graphics/AS.png);"><div class="username-Player">playernamegoeshere</div> </div>
                <div class="card-container position-Player6" style="background-image: url(graphics/KS.png);"><div class="username-Player">playernamegoeshere</div> </div>
                <div class="card-container position-Dealer" style="background-image: url(graphics/KS.png);"><div class="username-Dealer">Dealer</div></div>
            </div>
        </div>
        <script src="/js/jquery.js"></script>
        <script src="/js/bootstrap.js"></script>
        <script src="socket.io.js"></script>
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
