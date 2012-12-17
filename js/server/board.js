/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    privateCards : [],
    tablePositions : [1,1,1,1,0,0,0],  //Positions Dealer & Player 1-6
    init : function(deck){
        for(var i=0;i<this.tablePositions.length;i++)  //# of current players will go here
        {
            if(this.tablePositions[i])
                {
                    this.privateCards.push(deck.randomizedDeck.pop());
                    this.privateCards.push(deck.randomizedDeck.pop());
                }
        }
        this.publicCards=this.privateCards.slice(0);
        this.publicCards[0]="XX";
        this.publicCards[1]="XX";
    }
};