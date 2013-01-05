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
    playerChips : [0,0,0,0,0,0,0],
    tablePositions : [1,0,0,0,0,0,0],  //Positions Dealer & Player 1-6
    numPlayers : 0,
    placeBet : function(id,betAmt){
        var existingPlayerPosition=this.isCurrentPlayer(id);
        if(existingPlayerPosition&&this.playerBets[existingPlayerPosition]==0) 
        {
            if(betAmt<=this.playerChips[existingPlayerPosition])
                {
                    this.playerBets[existingPlayerPosition]=betAmt;
                    this.playerChips[existingPlayerPosition]=this.playerChips[existingPlayerPosition]-betAmt;
                }
        }
    },
    addPlayer : function(id,requestedPosition){
        console.log(id);
        if(this.numPlayers<=6)
        {
            var existingPlayerPosition=this.isCurrentPlayer(id);
            this.remPlayer(id); //Remove player if already seated.
            if(this.tablePositions[requestedPosition]==0)
            {
                this.positionClientID[requestedPosition]=id;
                this.tablePositions[requestedPosition]=1;
                this.playerChips[requestedPosition]=this.initialChips;
                this.numPlayers++;
                return 1;
            }    
        } 
        return 0;
    },
    remPlayer : function(id){
        var playerPosition=this.positionClientID.indexOf(id);
        if(playerPosition)
        {
            this.positionClientID[playerPosition]=0;
            this.tablePositions[playerPosition]=0;
            this.numPlayers--;
        }   
    },
    isCurrentPlayer : function(id){
        var playerPosition=this.positionClientID.indexOf(id);
        return playerPosition;
    },
    init : function(deck){
        this.publicCards[0]="XX";
        this.publicCards[1]="XX";
        for(var i=1;i<this.tablePositions.length;i++)  //# of current players will go here
        {
            if(this.tablePositions[i]!==0)
            {
                this.publicCards.push(deck.randomizedDeck.pop());
                this.publicCards.push(deck.randomizedDeck.pop());
            }
        }
    },
    setMessage : function(msg){
        this.currentMessage = msg;
        console.log("BoardMessage: " + msg);
    }
};