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
    if(val<5) val=5;
    $( "#betAmt" ).text("Bet " + Math.round((val/114)*100 / 5) * 5);
});
