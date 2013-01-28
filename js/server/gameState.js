
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
            placeBet : function(){},
            addPlayer : function(board,requestData){
                return board.addPlayer(requestData["clientID"],requestData["requestedPosition"]);   
            },
            splitRequest : function(){},
            message: "Waiting for players to join.",
            wait : 3000 
        },             
        acceptingBets:{
            beginState : function(){},
            endState : function(){
                    board.checkPlayerBets();
            },
            placeBet : function(requestData){return board.placeBet(requestData["clientID"],requestData["betAmt"]);},
            addPlayer : function(board,requestData){
                if(!gameLoop.running){
                    var addPlayerSuccess=board.addPlayer(requestData["clientID"],requestData["requestedPosition"]);
                    if(addPlayerSuccess){gameLoop.unPauseLoop();}
                    return addPlayerSuccess;
                } else {return 0;}
            },
            splitRequest : function(){},
            message: "Please place your bet.",
            wait : 3000
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
            placeBet : function(){},
            addPlayer : function(){},
            splitRequest : function(){},
            message: "Checking for dealer blackjack.",
            wait : 4000
        },   
        acceptingPlayerOptions:{
            beginState : function(){},
            endState : function(){},
            placeBet : function(){},
            addPlayer : function(){},
            splitRequest : function(){},
            message: "Accepting player options.",
            wait : 5000
        },       
        concludingRound:{
            beginState : function(){},
            endState : function(){
                gameLogic.payOutWinners();
                board.resetBoard();
                if(board.numPlayers===0){gameLoop.pauseLoop();}
            },
            placeBet : function(){},
            addPlayer : function(){},
            splitRequest : function(){},
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






