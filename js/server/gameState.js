/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    currentState : {},
    states : {
        waitingForPlayer : { //realize event handlers of state 'waitingforplayer'
            addPlayer : function(){
                console.log('waitingForPlayer.addPlayer() called.');
                return 1;
            },
            name: "waitingForPlayer",
            wait : 5000
        },             //Wait For and Add New Players Upon Join
        acceptingBets:{
            addPlayer : function(){},
            wait : 10000
        },               
        dealingCards:{
            addPlayer : function(){},
            wait : 5000
        },                    
        checkingForDealerBlackJack:{
            addPlayer : function(){},
            wait : 5000
        },   
        acceptingPlayerOptions:{
            addPlayer : function(){},
            wait : 5000
        },       
        concludingRound:{
            addPlayer : function(){},
            wait : 5000
        }               //Includes Paying Out & Announcing Winner
    },
    setState : function(state){
        this.currentState=this.states[state];
        console.log('State set to ' + state);
    //return this.currentState;
    },
    getState : function(){
        return this.currentState;
    },
    getWait : function(){
        return this.currentState.wait;
    }
};






