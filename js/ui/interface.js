/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var val="Bet Min";
$( "#scroller" ).draggable({
    axis: "x",
    containment: "parent", 
    drag: function( event, ui ) {}
});
$( "#scroller" ).on("drag", function( event, ui ) {
    val=parseInt($(this).css("left"));
    var finalAmt=Math.round((val/114)*glClientInfo.chips / 5) * 5;
    if(val==0) finalAmt=5;
    $('#betAmt').text("Bet " + finalAmt);
    $('#betAmt').data('betAmount',finalAmt);
});
