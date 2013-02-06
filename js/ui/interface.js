/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$("#scroller").draggable({
	axis: "x",
	containment: "parent",
	drag: function(event, ui) {}
});

$("#scroller").on("drag", function(event, ui) {
	var val = parseInt($(this).css("left"));
	var playerChips = glClientBoard.playerChips[glClientInfo.position];
	var finalAmt = Math.min(Math.round((val / 112) * playerChips / 5) * 5, playerChips);
	if(val == 0) finalAmt = 5;
	$('#betAmt').text("Bet " + finalAmt);
	$('#betAmt').data('betamount', finalAmt);
});