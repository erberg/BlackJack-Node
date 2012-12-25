/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

requestJoin();

function requestJoin()
{
     $(".joinButton").click(function(){
         var data = {};
         data["requestedPosition"]=$(".joinButton").index(this)+1;
         data["clientID"]=glClientID;
         socket.emit('joinRequest',data);
     });    
}
