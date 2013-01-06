
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

requestJoin();
requestPlaceBet();

function requestJoin()
{
     $(".joinButton").click(function(){
         var data = {};
         data["requestedPosition"]=$(".joinButton").index(this)+1;
         data["clientID"]=glClientID;
         socket.emit('addPlayerRequest',data);
     });    
}

function requestPlaceBet()
{
     $("#betAmt").click(function(){
         var data = {};
         $('#betAmt').data('betAmount');
         data["betAmt"]=$('#betAmt').data('betAmount');
         data["clientID"]=glClientID;
         socket.emit('betRequest',data);
     });    
}
