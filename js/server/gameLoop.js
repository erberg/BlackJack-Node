/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    running : 0,
    startLoop : function(){
        this.running = 1;
        this.step();
    },
    step : function(){
        if(this.running){
            this.loop();
        }
    },
    loop : function(){
        setTimeout(function(){
            if(gameState.getState().name==='waitingForPlayer')
                gameState.setState('acceptingBets');
            else
                gameState.setState('waitingForPlayer');
            gameLoop.step();
        },5000);
    }
    
};