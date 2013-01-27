/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$( "#scroller" ).draggable({
    axis: "x",
    containment: "parent", 
    drag: function( event, ui ) {}
});

$( "#scroller" ).on("drag", function( event, ui ) {
    val=parseInt($(this).css("left"));
    var finalAmt=Math.round((val/113)*glClientBoard.playerChips[glClientInfo.position] / 5) * 5;
    if(val==0) finalAmt=5;
    $('#betAmt').text("Bet " + finalAmt);
    $('#betAmt').data('betamount',finalAmt);
});