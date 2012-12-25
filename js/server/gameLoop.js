/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    positionClientID : [0,0,0,0,0,0,0],
    tablePositions : [1,1,1,0,0,0,0],  //Positions Dealer & Player 1-6
    numPlayers : 0,
    addPlayer : function(requestedPosition, id){
        if(this.tablePositions[requestedPosition]==0)
        {
            this.positionClientID[requestedPosition]=id;
            this.tablePositions[requestedPosition]=1;
            this.numPlayers++;
        }   
    },
    remPlayer : function(requestedPosition, id){
        if(this.tablePositions[requestedPosition]==id)
        {
            this.tablePositions[requestedPosition]=0;
            this.numPlayers--;
        }   
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
    }
};