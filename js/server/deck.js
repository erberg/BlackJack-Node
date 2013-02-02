/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    Cards : ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    Suits : ["C", "H", "S", "D"],
    filledDeck : [],
    randomizedDeck : [],
    numberOfDecks : 6,
    fillDeck:function(){
        for(var h=0;h<this.numberOfDecks;h++)
        {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 13; j++) {
                    this.filledDeck.push(this.Cards[j] + "" + this.Suits[i]);  
                //document.write(this.Cards[j] + "" + this.Suits[i] + " ");
                }
            }
        }
    },

    randomizeDeck:function(){
        var sacrificialDeck=this.filledDeck.slice(0);
        //document.write(sacrificialDeck.length);
        for(var i=0;i<this.filledDeck.length;i++)
        {
            rand=Math.floor(Math.random()*sacrificialDeck.length);
            this.randomizedDeck.push(sacrificialDeck.splice(rand,1));
        }        
        this.randomizedDeck.push("4D");                 //THESE ARE TEMP FOR TESTING PURPOSES!!! (testing a split)
        this.randomizedDeck.push("4C");                 //THESE ARE TEMP FOR TESTING PURPOSES!!!
        this.randomizedDeck.push("5H");                 //THESE ARE TEMP FOR TESTING PURPOSES!!!
        this.randomizedDeck.push("10C");                //THESE ARE TEMP FOR TESTING PURPOSES!!!
    },

    getCard:function(){
        if(this.filledDeck.length>0) {return this.randomizedDeck.pop();}
        else return 0;
    }

};


