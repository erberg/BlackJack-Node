/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    running : 0,
    loopOrder : ["waitingForPlayer","acceptingBets","checkingForDealerBlackJack","acceptingPlayerOptions","concludingRound"],
    loopIndex : 0,
    startLoop : function(ioInput){
        this.io=ioInput;
        this.running = 1;
        this.step();
    },
    step : function(){
        if(this.running===0&&this.loopIndex===0){console.log('Loop has ended.');}
        else if(this.running===1){this.loop();}
        board.setMessage(gameState.getMessage());
        this.io.sockets.emit('updateTable', board);
    },
    loop : function(){                          //Statechange occurs on every loop.
        var thisParent=this;
        gameState.getState().beginState();
        setTimeout(function(){thisParent.delayedIncrement();},gameState.getWait());
    },
    delayedIncrement : function(){
            gameState.getState().endState();
            this.loopIndex++;
            if(this.loopIndex===this.loopOrder.length) {this.loopIndex=0;}
            gameState.setState(this.loopOrder[this.loopIndex]);
            this.step();
    },
    concludeRound : function(){ //Call from endstate function of gameState object
        this.loopIndex=3;
    },
    pauseLoop : function()
    {
        this.running=0;
    }
    
};