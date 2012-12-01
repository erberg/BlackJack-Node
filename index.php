<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Blackjack Card-Counting Application, by Eric R. Berg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Le styles -->
        <link href="/css/bootstrap.css" rel="stylesheet">
        <style>
            body {
                padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
                height:100%;
                width:100%;
                background-color:whitesmoke;
            }
            .spacer{
                width:100%;
                min-height:200px;
                border:5px solid black;
                float:left;
            }

            .clearfix {
                display: inline-block;
            }
            
            .table-container{
                margin:auto;
                width:1000px;
            }
            .card-table{ 
                background-color: whitesmoke;
                position: absolute;
                width: 1000px;
                height: 500px;
                margin: auto;
                border: 5px solid red;
            }

            .left-card-table{
                width:500px;
                height:500px;
                border-radius:250px;
                font-size:20px;
                color:#fff;
                line-height:100px;
                background:greenyellow;
                position:absolute;
            }
            .right-card-table{
                width:500px;
                height:500px;
                border-radius:250px;
                font-size:20px;
                color:#fff;
                line-height:100px;
                background:greenyellow;
                position:absolute;
                left:500px;
            }
            .middle-card-table{
                width:500px;
                height:500px;
                font-size:20px;
                color:#fff;
                line-height:100px;
                background:greenyellow;
                position:absolute;
                left:250px;
            }
            .position-Dealer{
                background-size:cover;
                width:90px;
                height:125.2px;
                position:absolute;
            }
            .position-Player1{
                background-size:cover;
                width:90px;
                height:125.2px;
                position:absolute;
            }
            .card-container{
                background-size:cover;
                width:90px;
                height:125.2px;
            }
        </style>

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

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
                <div class="card-container" style="background-image: url(graphics/JC.png);"></div>
            </div>
        </div>

        <!-- Le javascript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="/js/jquery.js"></script>
        <script src="/js/bootstrap.js"></script>

    </body>
</html>
