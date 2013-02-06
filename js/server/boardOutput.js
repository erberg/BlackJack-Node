module.exports = {
    boardOut: {},
    getBoard: function() {
        this.boardOut.initialChips = board.initialChips;
        this.boardOut.currentMessage = board.currentMessage;
        this.boardOut.positionClientID = board.positionClientID;
        this.boardOut.activePlayer = board.activePlayer;
        this.boardOut.activeHand = board.activeHand;
        this.boardOut.playerBets = board.playerBets;
        this.boardOut.playerChips = board.playerChips;
        this.boardOut.playerSitoutCounter = board.playerSitoutCounter;
        this.boardOut.tablePositions = board.tablePositions;
        this.boardOut.numPlayers = board.numPlayers;
        this.fillCardArray();
        if(typeof this.boardOut.playerCards[0][0][0] !== 'undefined' && gameState.currentState.hideDealerCard) {
            this.boardOut.playerCards[0][0][0] = "XX";
            console.log("drawing over first card!");
        }
        return this.boardOut;
    },
    fillCardArray: function() {
        var cardsOut=[[[]],[[]],[[]],[[]],[[]],[[]],[[]]];
        for(var player = 0; player < board.playerCards.length; player++) {
            var handArray = board.playerCards[player].slice();
            for(var hand = 0; hand < handArray.length; hand++) {
                var cardArray = board.playerCards[player][hand].slice();
                cardsOut[player][hand] = cardArray.slice();
            }
        }
        this.boardOut.playerCards = cardsOut;
    }
};