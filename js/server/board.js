/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    positionClientID : [0,0,0,0,0,0,0],
    tablePositions : [1,0,0,0,0,0,0],  //Positions Dealer & Player 1-6
    numPlayers : 0,
    addPlayer : function(id,requestedPosition){
        console.log(id);
        if(this.numPlayers<=6)
        {
            var existingPlayerPosition=this.isCurrentPlayer(id);
            if(existingPlayerPosition>0)
            {
                this.positionClientID[existingPlayerPosition]=0;
                this.tablePositions[existingPlayerPosition]=0;
                this.numPlayers--;
            }
            if(this.tablePositions[requestedPosition]==0)
            {
                this.positionClientID[requestedPosition]=id;
                this.tablePositions[requestedPosition]=1;
                this.numPlayers++;
                return 1;
            }    
        } 
        return 0;
    },
    remPlayer : function(requestedPosition, id){
        if(this.tablePositions[requestedPosition]==id)
        {
            this.tablePositions[requestedPosition]=0;
            this.numPlayers--;
        }   
    },
    isCurrentPlayer : function(id){
        for(var i=1;i<this.positionClientID.length;i++)
        {
            if(this.positionClientID[i]===id){
                return i;
            }
        }
        return 0;
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