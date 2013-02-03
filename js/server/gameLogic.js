module.exports = {
payOutWinners : function(){
    var dealerHandValue=this.handValue(board.playerCards[0][0]);
    for(var playerIndex=1;playerIndex<7;playerIndex++){
        if(board.tablePositions[playerIndex]===1)
        {
            for(var handIndex=0;handIndex<board.playerCards[playerIndex].length;handIndex++){
                var currentHand=board.playerCards[playerIndex][handIndex];
                if(this.handValue(currentHand)>dealerHandValue){board.playerChips[playerIndex]+=2*board.playerBets[playerIndex];}
                else if(this.handValue(currentHand)===dealerHandValue){board.playerChips[playerIndex]+=board.playerBets[playerIndex];}
            }
        }
    }
},
checkDealerBlackjack : function(){
    var dealerHand=board.playerCards[0][0];
    return (this.handValue(dealerHand)===21);
},
handValue : function(cardArray){
        var cardTotal=0;
        var aceCount=0;
        if(cardArray.length>0) {
            for(var cardIndex=0;cardIndex<cardArray.length;cardIndex++){
                cardTotal+=this.cardValue(cardArray[cardIndex]);
                if(this.cardValue(cardArray[cardIndex])===11){aceCount++;}
            }
            while(aceCount>0&&cardTotal>21){
                cardTotal-=10;
                aceCount--;
               }
        return cardTotal;
        }
        else return 0;
    },
cardValue : function(cardString){
    card=String(cardString).slice(0, -1); //remove suit
    if(card==="A"){return 11;}
    else if(isNaN(card)){return 10;}
    else {return parseInt(card);}
    },
checkIfCardsSplittable : function(cardArray){
    if(cardArray.length==2)
    {
    cardOneStripped=String(cardArray[0]).slice(0, -1);
    cardTwoStripped=String(cardArray[1]).slice(0, -1);
    return (cardOneStripped===cardTwoStripped);
    } else {return 0;}
}
};
