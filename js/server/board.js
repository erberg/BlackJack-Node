/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    playerPositions : [1,1,1,0,0,0,0],  //Player Positions 1-6
    init : function(deck){
        for(var i=0;i<this.playerPositions.length;i++)  //# of current players will go here
        {
            if(this.playerPositions[i])
                {
                    this.publicCards.push(deck.randomizedDeck.pop());
                    this.publicCards.push(deck.randomizedDeck.pop());
                }
            else
            {
            this.publicCards.push("XX");
            this.publicCards.push("XX");
            }
        }
    }
};