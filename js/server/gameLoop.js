/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    running : 0,
    loopOrder : ["waitingForPlayer","acceptingBets","dealingCards","checkingForDealerBlackJack","acceptingPlayerOptions","concludingRound"],
    loopIndex : 0,
    startLoop : function(){
        this.running = 1;
        this.step();
    },
    step : function(){
        if(this.running){
            this.loop();
        }
    },
    loop : function(){                          //Statechange occurs on every loop.
        var thisParent=this;
        board.setMessage(""+thisParent.loopIndex);
        setTimeout(function(){
            thisParent.loopIndex++;
            if(thisParent.loopIndex===thisParent.loopOrder.length) {thisParent.loopIndex=0;}
            gameState.setState(thisParent.loopOrder[thisParent.loopIndex]);
            thisParent.step();
        },gameState.getWait());
    }
    
};