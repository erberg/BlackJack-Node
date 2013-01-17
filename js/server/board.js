/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    initialChips : 500,
    currentMessage : "",
    publicCards : [],
    positionClientID : [0,0,0,0,0,0,0],
    playerBets : [0,0,0,0,0,0,0],
    playerCards : [[[]],[[]],[[]],[[]],[[]],[[]],[[]]],
    playerChips : [0,0,0,0,0,0,0],
    tablePositions : [1,0,0,0,0,0,0],  //Positions Dealer & Player 1-6
    numPlayers : 0,
    placeBet : function(id,betAmt){
        var playerPosition=this.getPlayerIndex(id);
        if(playerPosition&&this.playerBets[playerPosition]===0)         //Client is Seated Player and Not Yet Placed a Bet
        {
            if(betAmt<=this.playerChips[playerPosition])                    
                {
                    this.playerBets[playerPosition]=betAmt;
                    this.playerChips[playerPosition]=this.playerChips[playerPosition]-betAmt;
                    return 1;
                }
        }
        return 0;
    },
    addPlayer : function(id,requestedPosition){
            if(this.getPlayerIndex(id)){this.remPlayer(id);}            //Remove player if already seated.
            if(this.tablePositions[requestedPosition]===0)              //Add Player if Empty Seat.
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
        this.numPlayers--;       
    },
    getPlayerIndex : function(id){
        var playerPosition=this.positionClientID.indexOf(id);
        return playerPosition;
    },
    getCards : function(deck){
        this.playerCards[0][0].push("XX");
        this.playerCards[0][0].push(deck.randomizedDeck.pop());
        for(var i=1;i<this.tablePositions.length;i++)  //# of current players will go here
        {
            if(this.tablePositions[i]==1)
            {
                this.playerCards[i][0].push(deck.randomizedDeck.pop());
                this.playerCards[i][0].push(deck.randomizedDeck.pop());
            }
        }
    },
    setMessage : function(msg){
        this.currentMessage = msg;
        console.log("BoardMessage: " + msg);
    }
};