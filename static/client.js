//~~~~~~~~~~~~~~~~~~~~~~~~~~ 1. Registering User ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const socket=io()

socket.on('connect',function(){
    console.log("connected");
    socket.emit('connected','Connected on flask side');
});

function registerUser(){
var user=document.getElementById("user").value;
socket.emit('registerUser',{'user':user});
document.getElementById('socketio').style.display="block";
}

//~~~~~~~~~~~~~~~~~~~~~~~~~ 2. Display All Clients ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

socket.on('availableUsers',function(msg){
  localStorage.clear();
  localStorage.setItem('message',msg);
  var table='<tr><th>Name</th><th>Sid</th><th>Start Chat</th></tr>'
  obj=JSON.parse(msg)
  user=document.getElementById("user").value;
  for(name in obj)
  {
      if(user==name)
      table+='<tr><td>'+name+'</td><td>'+obj[name]+'</td><td>You</td></tr>';
      else
      table+='<tr><td>'+name+'</td><td>'+obj[name]+'</td><td><button class="blue_button" onclick=\'chatWith("'+name+'","'+obj[name]+'")\'>Chat</button></td></tr>';
  }
  document.getElementById("table").innerHTML=table;
});


//~~~~~~~~~~~~~~~~~~~~~~~~ 3. Peer to Peer Communication ~~~~~~~~~~~~~~~~~~~~~~~

function chatWith(name,id){
  document.getElementById('talkto').innerHTML='Texting with '+name;
  user=document.getElementById("user").value;
  localStorage.setItem(user+'destid',id);
}

socket.on('receiveMessage',function(msg){
  document.getElementById("dispalyMessage").innerHTML+=msg['user']+": "+msg['message']+"<br>";
});

function sendMessage(){
  text=document.getElementById("sendMessageText");
  msg=text.value;
  user=document.getElementById("user").value;
  socket.emit('sendMessage',{'message':msg,'user':user},room=localStorage.getItem(user+'destid'));
  document.getElementById("dispalyMessage").innerHTML+="You: "+msg+"<br>";
}


//~~~~~~~~~~~~~~~~~~~~~~~~ 4. Broadcast Communication ~~~~~~~~~~~~~~~~~~~~~~~~~~


socket.on('receiveBroadcast',function(msg){
  document.getElementById("dispalyBroadCast").innerHTML+=msg['user']+": "+msg['message']+"<br>";
});

function broadCast(){
  text=document.getElementById("sendText");
  msg=text.value;
  user=document.getElementById("user").value;
  socket.emit('sendBroadCast',{'message':msg,'user':user});
  document.getElementById("dispalyBroadCast").innerHTML+="You: "+msg+"<br>";
}
