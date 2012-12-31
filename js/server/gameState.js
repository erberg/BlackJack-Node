/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    currentState : {},
    states : {
        waitingForPlayer : { //realize event handlers of state 'waitingforplayer'
            addPlayer : function(){
                console.log('wfp addPlayer() called');
            }
        },             //Wait For and Add New Players Upon Join
        acceptingBets:{
            addPlayer : function(){
                console.log('AB addPlayer() called');
            }
        },               
        dealingCards:{},                    
        checkingForDealerBlackJack:{},   
        acceptingPlayerOptions:{},       
        concludingRound:{}               //Includes Paying Out & Announcing Winner
    },
    setState : function(state){
        this.currentState=this.states[state];
        //return this.currentState;
    },
    getState : function(){
        return this.currentState;
    }
};






