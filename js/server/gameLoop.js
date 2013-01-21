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
        gameState.setState(this.loopOrder[this.loopIndex]);
        this.step();
    },
    step : function(){
        board.setMessage(gameState.getMessage());
        this.io.sockets.emit('updateTable', board);
        var thisParent=this;
        gameState.getState().beginState();
        setTimeout(function(){thisParent.delayedIncrement();},gameState.getWait());
    },
    delayedIncrement : function(){
            gameState.getState().endState();
            if(this.running)
            {
                this.loopIndex++;
                if(this.loopIndex===this.loopOrder.length) {this.loopIndex=0;}
                gameState.setState(this.loopOrder[this.loopIndex]);
                this.step();
            }
    },
    concludeRound : function(){ //Call from endstate function of gameState object
        this.loopIndex=3;
    },
    pauseLoop : function()
    {
        //clearTimeout(this.timeout);
        this.running=0;
    },
    unPauseLoop : function()
    {
        this.running=1;
        this.delayedIncrement();
        this.io.sockets.emit('updateTable', board);
    }
    
};