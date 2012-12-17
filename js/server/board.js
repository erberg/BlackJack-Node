/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    tablePositions : [1,1,1,1,0,0,0],  //Positions Dealer & Player 1-6
    init : function(deck){
        this.publicCards[0]="XX";
        this.publicCards[1]="XX";
        for(var i=1;i<this.tablePositions.length;i++)  //# of current players will go here
        {
            if(this.tablePositions[i])
                {
                    this.publicCards.push(deck.randomizedDeck.pop());
                    this.publicCards.push(deck.randomizedDeck.pop());
                }
        }
    }
};