
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    currentState : {},
    states : {
        waitingForPlayer : { //realize event handlers of state 'waitingforplayer'
            placeBet : function(){},
            addPlayer : function(board,requestData){
                return board.addPlayer(requestData["clientID"],requestData["requestedPosition"]);   
            },
            placeBet : function(){},
            message: "Waiting 10 seconds for other players to join.",
            wait : 10000 //think of it is minwait?
        },             //Wait For and Add New Players Upon Join
        acceptingBets:{
            placeBet : function(){return 1;},
            addPlayer : function(){},
            conclude : function(){

            },
            message: "Please place your bets.",
            wait : 10000
        },               
        dealingCards:{
            placeBet : function(){},
            addPlayer : function(){},
            wait : 5000
        },                    
        checkingForDealerBlackJack:{
            placeBet : function(){},
            addPlayer : function(){},
            wait : 5000
        },   
        acceptingPlayerOptions:{
            placeBet : function(){},
            addPlayer : function(){},
            wait : 5000
        },       
        concludingRound:{
            placeBet : function(){},
            addPlayer : function(){},
            wait : 5000
        }               //Includes Paying Out & Announcing Winner
    },
    setState : function(state){
        this.currentState=this.states[state];
        console.log('State set to ' + state);    //return this.currentState;
    },
    getState : function(){
        return this.currentState;
    },
    getWait : function(){
        return this.currentState.wait;
    },
    getMessage : function(){
        return this.currentState.message;
    }
};






