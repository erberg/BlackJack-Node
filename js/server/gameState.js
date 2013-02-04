
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    currentState : {},
    states : {
        waitingForPlayer : { 
            beginState : function(){},
            endState : function(){},
            betRequest : function(){},
            addPlayer : function(board,requestData){
                return board.addPlayer(requestData["clientID"],requestData["requestedPosition"]);   
            },
            splitRequest : function(){},
            hitRequest : function(){},
            standRequest : function(){},
            doubleDownRequest : function(){},
            hideDealerCard : 1,
            message: "Waiting for players to join.",
            wait : 5000//3000 
        },             
        acceptingBets:{
            beginState : function(){},
            endState : function(){
                    board.checkPlayerBets();
            },
            betRequest : function(requestData){return board.betRequest(requestData["clientID"],requestData["betAmt"]);},
            addPlayer : function(board,requestData){
                if(!gameLoop.running){
                    var addPlayerSuccess=board.addPlayer(requestData["clientID"],requestData["requestedPosition"]);
                    if(addPlayerSuccess){gameLoop.unPauseLoop();}
                    return addPlayerSuccess;
                } else {return 0;}
            },
            splitRequest : function(){},
            hitRequest : function(){},
            standRequest : function(){},
            doubleDownRequest : function(){},
            hideDealerCard : 1,
            message: "Please place your bet.",
            wait : 5000
        },                    
        checkingForDealerBlackJack:{
            beginState : function(){board.incrementSitoutCounter();board.dealCards(deck);},
            endState : function(){
                if(gameLogic.checkDealerBlackjack()){
                    console.log('Dealer has blackjack. Ending round early.');
                    gameLoop.concludeRound();
                }
                else {console.log('No Dealer BlackJack.');}
            },
            betRequest : function(){},
            addPlayer : function(){},
            splitRequest : function(){},
            hitRequest : function(){},
            standRequest : function(){},
            doubleDownRequest : function(){},
            hideDealerCard : 1,
            message: "Checking for dealer blackjack.",
            wait : 1000//4000
        },   
        acceptingPlayerOptions:{
            playerOptionTimer : "0",
            playerOptionTimeout : function(){
            if(board.nextPlayerOption()){
                console.log("playertimeouthasbeencalled");
                gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000);
                }
            else {gameLoop.unPauseLoop();}
            },
            beginState : function(){
               gameLoop.pauseLoop();
               board.setFirstPlayer();
               gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000); //call default player action
            },
            endState : function(){},
            betRequest : function(){},
            addPlayer : function(){},
            splitRequest : function(requestData){
                var splitSuccess=board.splitRequest(requestData["clientID"]);
                if(splitSuccess){
                    clearTimeout(gameState.currentState.playerOptionTimer);
                    gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000);
                    }
                return splitSuccess;
            },
            hitRequest : function(requestData){
                var hitSuccess=board.hitRequest(requestData["clientID"]);
                if(hitSuccess){
                    if(gameLogic.handValue(board.getActiveHand())>=21){board.nextPlayerOption();}
                    clearTimeout(gameState.currentState.playerOptionTimer);
                    gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000); 
                }
                return hitSuccess;
            },
            standRequest : function(requestData){
                var standSuccess=board.standRequest(requestData["clientID"]);
                if(standSuccess){
                    board.nextPlayerOption();
                    clearTimeout(gameState.currentState.playerOptionTimer);
                    gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000); 
                }
                return standSuccess;
            },
            doubleDownRequest : function(requestData){
                var doubleDownSuccess=board.doubleDownRequest(requestData["clientID"]);
                if(doubleDownSuccess){
                    board.nextPlayerOption();
                    clearTimeout(gameState.currentState.playerOptionTimer);
                    gameState.currentState.playerOptionTimer=setTimeout(gameState.currentState.playerOptionTimeout,5000);
                }
                return doubleDownSuccess;
            },
            hideDealerCard : 1,
            message: "Accepting player options.",
            wait : 1000
        },
        drawingForDealer:{
            dealerOptionTimer : "0",
            dealerOptionTimeout : function(){
            if(gameLogic.handValue(board.playerCards[0][0])<17){
                board.drawDealerCard();
                gameLoop.io.sockets.emit('updateTable', boardOutput.getBoard());
                gameState.currentState.dealerOptionTimer=setTimeout(gameState.currentState.dealerOptionTimeout,2000);
                }
            else {gameLoop.unPauseLoop();}
            },
            beginState : function(){
               gameLoop.pauseLoop();
               gameState.currentState.dealerOptionTimer=setTimeout(gameState.currentState.dealerOptionTimeout,2000); //call default player action
            },
            endState : function(){},
            betRequest : function(){},
            addPlayer : function(){},
            splitRequest : function(requestData){},
            hitRequest : function(requestData){},
            standRequest : function(){},
            doubleDownRequest : function(){},
            hideDealerCard : 0,
            message: "Dealer is drawing cards.",
            wait : 2000
        },        
        concludingRound:{
            beginState : function(){board.resetCounters();},
            endState : function(){
                gameLogic.payOutWinners();
                board.resetBoard();
                if(board.numPlayers===0){gameLoop.pauseLoop();}
            },
            betRequest : function(){},
            addPlayer : function(){},
            splitRequest : function(){},
            hitRequest : function(){},
            standRequest : function(){},
            doubleDownRequest : function(){},
            hideDealerCard : 0,
            message: "Ending Round.",
            wait : 1000
        }               //Includes Paying Out & Announcing Winner
    },
    setState : function(state){
        this.currentState=this.states[state];
        //console.log('State set to ' + state);    //return this.currentState;
    },
    getState : function(){
        return this.currentState;
    },
    getWait : function(){
        return this.currentState.wait;
    },
    getMessage : function(){
        return this.currentState.message;
    },
    callStart : function(){
        this.currentState.beginState();
    },
    callEnd : function(){
        this.currentState.endState();
    }
};