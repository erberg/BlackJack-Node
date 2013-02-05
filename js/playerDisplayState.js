var playerDisplayState = {
    currentState : {},
    states : {
        
        oneHand : {
            displayCards : function(cssobject, playerPosition)
            {
                for(var card=0;card<glClientBoard.playerCards[playerPosition][0].length;card++) {
                    cssobject.append("<div class='card-container' data-card=\'" + glClientBoard.playerCards[playerPosition][0][card] 
                        + "\'"+ "style=\'bottom: " + 10*card + "px; left: " + 14*card + "px \'> </div>");        
                    }
            }
        },

        twoHands:{
            displayCards : function(cssobject,playerPosition){
                var columnposition;
                for(var hand=(glClientBoard.playerCards[playerPosition].length-1);hand>=0;hand--){
                    columnposition=30-hand*45;
                    for(var card=0;card<glClientBoard.playerCards[playerPosition][hand].length;card++){
                        cssobject.append("<div class='card-container' data-card=\'" + glClientBoard.playerCards[playerPosition][hand][card] 
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px \'> </div>");
                    }
                }
            }
        },       

        threeHands:{
            displayCards : function(cssobject,playerPosition){
                var columnposition;
                for(var hand=(glClientBoard.playerCards[playerPosition].length-1);hand>=0;hand--){
                    columnposition=30-hand*21;
                    for(var card=0;card<glClientBoard.playerCards[playerPosition][hand].length;card++){
                        cssobject.append("<div class='card-container' data-card=\'" + glClientBoard.playerCards[playerPosition][hand][card] 
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px; "+ playerDisplayState.getHandStyle(playerPosition,hand) + "\'> </div>");
                    }
                }     
            }
        },  

        fourHands: {
            displayCards : function(cssobject,playerPosition){
                var columnposition;
                for(var hand=(glClientBoard.playerCards[playerPosition].length-1);hand>=0;hand--){
                    columnposition=30-hand*15;
                    for(var card=0;card<glClientBoard.playerCards[playerPosition][hand].length;card++){
                        cssobject.append("<div class='card-container' data-card=\'" + glClientBoard.playerCards[playerPosition][hand][card] 
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px \'> </div>");
                    }
                }     
            }
            
        },       
    },
    notActiveHand : function(currentPosition,currentHand){
        return ((currentPosition===glClientBoard.activePlayer) && (currentHand !== glClientBoard.activeHand) && (glClientInfo.position===currentPosition));
    },
    getHandStyle : function(currentPosition,currentHand){
        if(this.notActiveHand(currentPosition,currentHand)) {return "opacity: .70";}
    },

    setState : function(state){
        this.currentState=this.states[state];
    },

    selectDisplayState : function(hands)
    {
         switch(hands){
            case 1:
            this.setState("oneHand");
            break;
            case 2:
            this.setState("twoHands");
            break;
            case 3:
            this.setState("threeHands");
            break;
            case 4:
            this.setState("fourHands");
            break;
        }
    },

    getState : function(){
        return this.currentState;
    }
};