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
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px" + playerDisplayState.getZIndex(playerPosition,hand) + " \'> </div>");
                        if(!playerDisplayState.activeHand(playerPosition,hand))
                            {cssobject.append("<div class='card-container' style=\'bottom: " + 25*card + "px; right: " + columnposition + "px; opacity: .35" + playerDisplayState.getZIndex(playerPosition,hand) + "\'> </div>");}
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
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px" + playerDisplayState.getZIndex(playerPosition,hand) + " \'> </div>");
                        if(!playerDisplayState.activeHand(playerPosition,hand))
                            {cssobject.append("<div class='card-container' style=\'bottom: " + 25*card + "px; right: " + columnposition + "px; opacity: .35" + playerDisplayState.getZIndex(playerPosition,hand) + "\'> </div>");}
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
                        + "\'"+ "style=\'bottom: " + 25*card + "px; right: " + columnposition + "px" + playerDisplayState.getZIndex(playerPosition,hand) + " \'> </div>");
                        if(!playerDisplayState.activeHand(playerPosition,hand))
                            {cssobject.append("<div class='card-container' style=\'bottom: " + 25*card + "px; right: " + columnposition + "px; opacity: .35" + playerDisplayState.getZIndex(playerPosition,hand) + "\'> </div>");}
                    }
                }     
            }
            
        },       
    },
    getZIndex : function(currentPosition,currentHand){
        //if(playerDisplayState.activeHand(currentPosition,currentHand)){var cssindex="; z-index: 3";} //PUTS ACTIVE CARDS IN FRONT... DOESNT LOOK VERY NICE
        //else {var cssindex="";}                                                                       //IF IT REVERSED STACK ORDER AS ACTIVEHAND CHANGED, THIS WOULD LOOK GOOD
        var cssindex="";
        return cssindex;
    },
    activeHand : function(currentPosition,currentHand){
        return !((currentPosition===glClientBoard.activePlayer) && (currentHand !== glClientBoard.activeHand) && (glClientInfo.position===currentPosition));
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