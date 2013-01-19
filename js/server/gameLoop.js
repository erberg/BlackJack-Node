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
        if(this.running===0&&this.loopIndex===0){console.log('OUTOFLOOP');board.setMessage(gameState.getMessage());}
        else if(this.running===1){this.loop();}
        this.io.sockets.emit('updateTable', board);
    },
    loop : function(){                          //Statechange occurs on every loop.
        var thisParent=this;
        board.setMessage(gameState.getMessage());
        gameState.getState().beginState();
        setTimeout(function(){thisParent.delayedIncrement();},gameState.getWait());
    },
    concludeRound : function(){ //Call from endstate function of gameState object
        this.loopIndex=3;
    },
    delayedIncrement : function(){
            gameState.getState().endState();
            this.loopIndex++;
            if(this.loopIndex===this.loopOrder.length) {this.loopIndex=0;}
            gameState.setState(this.loopOrder[this.loopIndex]);
            this.step();
    },
    pauseLoop : function()
    {
        this.running=0;
    }
    
};