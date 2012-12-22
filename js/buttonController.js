/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

requestJoin();

function requestJoin()
{
     $(".joinButton").click(function(){
         var data = [$(".joinButton").index(this)+1,glClientID];
         socket.emit('joinRequest',data);
     });    
}
