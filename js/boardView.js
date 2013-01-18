/* 
 * This script is responsible for displaying appropriate card using "data-card" values found in index.php.
 * These functions convert text into spritesheet positions. 
 */
//playerCards=[[["AS","10C","9S","6S","6H"]],[["AS","10C","9S","6S","6H"]],[["AS","9S","6S"],["10C","9S"]],[["10C","6S","6H"],["6S","6H"],["AS","10C","9S"]],[["AS","10C","9S","6S","6H"],["AS","10C","9S"],["AS","6S","6H"]]];


function displayBoard()
{ 
    prepareCardDisplay();
    prepareButtonDisplay();
    prepareCardSpritePositions();
    prepareChipsDisplay();
    prepareBetDisplay();
    displayMessage();
}

function displayMessage()
{
    $(".message").empty().append('<p id="type">' + glClientBoard.currentMessage + '</p>');
}

function prepareCardDisplay()
{
$(".card-container").remove();
$("[class*='position-']").each(function(index){
    if(glClientBoard.tablePositions[index]===1){                        
        var numberOfHands = glClientBoard.playerCards[index].length;
        playerDisplayState.selectDisplayState(numberOfHands); 
        playerDisplayState.currentState.displayCards($(this),index);
    }
});
}

function prepareChipsDisplay()
{
    $(".chips-Player").each(function(index){
        if(glClientBoard.tablePositions[index+1]===0){ $(this).hide(); } //+1 compensates for dealer
        else{
                $(this).show();
                $(this).text('Chips: ' + glClientBoard.playerChips[index+1]);
            }
    });  
}

function prepareBetDisplay()
{
    $(".bet-Player").each(function(index){
        if(glClientBoard.playerBets[index+1]===0){ $(this).hide(); } //+1 compensates for dealer
        else{
                $(this).show();
                $(this).text('Bet: ' + glClientBoard.playerBets[index+1]);
            }
    });  
}


function prepareButtonDisplay()
{
    $(".joinButton").each(function(index){
        if(glClientBoard.tablePositions[index+1]===1){ //+1 compensates for dealer
            $(this).hide();
            glClientBoard.clientPosition=index+1;
        } else $(this).show();
    });
}

function prepareCardSpritePositions()
{
    var cardView = {
        getPosition: function(stringInput){
            var cardInput=stringInput.slice(0,-1);                  //everything but last char
            var suitInput=stringInput.slice(-1);                    //just last char
            if(cardInput + suitInput === "XX") {                     //XX Means Face Down Card
                var xPosition=0;
                var yPosition=-125.2*4;
            } 
            else{
                var xPosition=-90*this.Card.indexOf(cardInput);
                var yPosition=-125.2*this.Suit.indexOf(suitInput);
            }
            var spritePosition = {
                "x": [xPosition],
                "y": [yPosition]
            }
            return spritePosition;
        }
    }
    
    cardView.Card=["A","2","3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    cardView.Suit=["C", "H", "S", "D"];
                
    $(".card-container").each(function(){
        var cardString=String($(this).data('card'));
        var cardPosition=cardView.getPosition(cardString);
        $(this).css("background-position",cardPosition["x"] + "px " + cardPosition["y"]+ "px");
    });
    
    
}