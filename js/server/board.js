/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    initialChips : 500,
    currentMessage : "",
    positionClientID : [0,0,0,0,0,0,0],
    activePlayer : 1,
    activeHand : 0,
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
            if(this.tablePositions[requestedPosition]===0&&id!==-1)                  //Add Player if Empty Seat Exists.
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
            if(this.playerSitoutCounter[playerIndex]>=3) {this.remPlayer(this.positionClientID[playerIndex]);}
        }
    },
    splitRequest : function(id){
        playerIndex=this.getPlayerIndex(id);
        handIndex=parseInt(this.activeHand);
        if(playerIndex===this.activePlayer && this.playerChips[playerIndex]>=(this.playerBets[playerIndex]*this.playerCards[playerIndex].length)
                                           && gameLogic.checkIfCardsSplittable(this.playerCards[playerIndex][handIndex]))
        {
            for(var newHandIndex=handIndex+1;newHandIndex<=3;newHandIndex++)
            {
            if(this.playerCards[playerIndex][newHandIndex]===undefined)
                {
                this.performSplit(playerIndex,handIndex,newHandIndex);
                return 1;
                }
            }
        }   
        return 0;
    },
    performSplit: function(playerIndex,handIndex,newHandIndex){
        this.playerCards[playerIndex][newHandIndex]=[];
        this.playerCards[playerIndex][newHandIndex][0]=this.playerCards[playerIndex][handIndex].pop(); 
        this.playerCards[playerIndex][handIndex].push(deck.randomizedDeck.pop());
        this.playerCards[playerIndex][newHandIndex][1]=deck.randomizedDeck.pop();
        this.playerChips[playerIndex]=this.playerChips[playerIndex]-this.playerBets[playerIndex];
    },
    resetCounters : function()
    {
        this.activePlayer=1;
        this.activeHand=0;
    },
    nextPlayerOption : function()
    {
        nextPlayerIndex=parseInt(this.activePlayer)+1;
        nextHandIndex=parseInt(this.activeHand)+1;
        for(nextHandIndex;nextHandIndex<=3;nextHandIndex++){                    
            if(this.playerCards[this.activePlayer][nextHandIndex]===undefined){        //If There Are No More Hands For Current Player...
                for(nextPlayerIndex;nextPlayerIndex<7;nextPlayerIndex++){       //Look For Another Player
                    if(this.tablePositions[nextPlayerIndex]===1&&this.playerSitoutCounter[nextPlayerIndex]===0){
                        this.activePlayer=nextPlayerIndex;
                        this.activeHand=0;
                        return 1;
                    }
                }
            }
            else {                                                              //Otherwise Set New Hand 
                this.activeHand=nextHandIndex;                                  
                return 1;
            }

        }
    return 0;
    },
    setFirstPlayer : function()
    {
        for(var i=1;i<7;i++){if(this.tablePositions[i]===1&&this.playerSitoutCounter[i]===0){this.activePlayer=i;return 1;}}
        return 0;
    }

};