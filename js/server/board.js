/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    publicCards : [],
    init : function(deck){
        for(var i=0;i<14;i++)  //# of current players will go here
        {
            this.publicCards[i]=deck.randomizedDeck.pop();
        }
    }
};