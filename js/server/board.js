/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    initialChips : 500,
    currentMessage : "",
    positionClientID : [0,0,0,0,0,0,0],
    playerBets : [0,0,0,0,0,0,0],
    playerCards : [[[]],[[]],[[]],[[]],[[]],[[]],[[]]],
    playerChips : [0,0,0,0,0,0,0],
    playerSitoutCounter : [0,0,0,0,0,0,0],
    tablePositions : [1,0,0,0,0,0,0],  //Positions Dealer & Player 1-6
    numPlayers : 0,
    placeBet : function(id,betAmt){
        var playerPosition=this.getPlayerIndex(id);
        if(playerPosition&&this.playerBets[playerPosition]===0)         //Client is Seated Player and Has Not Yet Placed a Bet
        {
            if(betAmt<=this.playerChips[playerPosition])                    
                {
                    this.playerSitoutCounter[playerPosition]=0;
                    this.playerBets[playerPosition]=betAmt;
                    this.playerChips[playerPosition]=this.playerChips[playerPosition]-betAmt;
                    return 1;
                }
        }
        return 0;
    },
    addPlayer : function(id,requestedPosition){
            if(this.getPlayerIndex(id)>=0){this.remPlayer(id);}             //Remove player if already seated.
            if(this.tablePositions[requestedPosition]===0)                  //Add Player if Empty Seat Exists.
            {
                this.positionClientID[requestedPosition]=id;
                this.tablePositions[requestedPosition]=1;
                this.playerChips[requestedPosition]=this.initialChips;
                this.numPlayers++;
                return 1;
            }     
            else return 0;
    },
    remPlayer : function(id){
        var playerPosition=this.positionClientID.indexOf(id);
        this.positionClientID[playerPosition]=0;
        this.tablePositions[playerPosition]=0;
        this.playerSitoutCounter[playerPosition]=0;
        this.numPlayers--;       
    },
    getPlayerIndex : function(id){
        var playerPosition=this.positionClientID.indexOf(id);
        return playerPosition;
    },
    dealCards : function(deck){
        this.playerCards[0][0].push(deck.randomizedDeck.pop());
        this.playerCards[0][0].push(deck.randomizedDeck.pop());
        for(var playerIndex=1;playerIndex<7;playerIndex++)  
        {
            if(this.tablePositions[playerIndex]===1&&this.playerSitoutCounter[playerIndex]===0)
            {
                this.playerCards[playerIndex][0].push(deck.randomizedDeck.pop());
                this.playerCards[playerIndex][0].push(deck.randomizedDeck.pop());
            }
        }
    },
    setMessage : function(msg){
        this.currentMessage = msg;
        console.log("BoardMessage: " + msg);
    },
    resetBoard : function(){
        this.removeTimedOutPlayers();
        this.playerBets = [0,0,0,0,0,0,0];
        this.playerCards = [[[]],[[]],[[]],[[]],[[]],[[]],[[]]];
    },
    checkPlayerBets : function(){
        var countPlayersSittingOut=0;
        for(var playerIndex=1;playerIndex<7;playerIndex++){
            if(this.tablePositions[playerIndex]===1){
                if(this.playerBets[playerIndex]===0) {
                    countPlayersSittingOut++;
                } else {this.playerSitoutCounter[playerIndex]=0;}
            }
        }
        if(countPlayersSittingOut===this.numPlayers)     //all current players are sitting out
            {
                gameLoop.pauseLoop();
            }
    },
    incrementSitoutCounter : function(){
        for(var playerIndex=1;playerIndex<7;playerIndex++){
            if(this.tablePositions[playerIndex]===1&&this.playerBets[playerIndex]===0) {
            this.playerSitoutCounter[playerIndex]++;
            }
        }
    },
    removeTimedOutPlayers : function(){
        for(var playerIndex=1;playerIndex<7;playerIndex++){
            if(this.playerSitoutCounter[playerIndex]>=3) {console.log('removeTimedOutPlayers called!!!' + this.playerSitoutCounter[playerIndex] + ' for player index ' + playerIndex);this.remPlayer(this.positionClientID[playerIndex]);}
        }
    }

};