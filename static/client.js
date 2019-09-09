const socket=io()

socket.on('connect',function(){
    console.log("Connected");
    socket.emit('Connected','Connected on flask side')
});

function RegisterUser(){
  var user=document.getElementById("first_user").value;
  socket.emit('RegisterFirstUser',user);
}

socket.on('AvailableUsers',function(msg){
//msg is an object with key=name and value=sid
  var table='<tr><th>name</th><th>id</th><th>Chat</th></tr>'
  for(name in msg)
    {
      table+='<tr><td>'+name+'</td><td>'+msg[name]+'</td><td><button onclick=\'Chat("'+name+'","'+msg[name]+'")\'>Chat</button></td></tr>';
    }
  document.getElementById("table").innerHTML=table;
});


function Chat(name,id){

  const configuration = {
  iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }]
  }

  connection = new RTCPeerConnection(configuration)

  // Create the data channel and establish its event listeners
  sendChannel = connection.createDataChannel("sendChannel");
  sendChannel.onopen = (event) => {
    console.log("send channel opened")

    sendChannel.send("HOLA yo")
  };

  sendChannel.onclose = (event) => {
        console.log("send channel closed")
  };



  socket.emit('ReceiveMessage',"hey",room=id);
  console.log(id);
}

socket.on('ReceiveMessage',function(msg,id){
console.log("Called");
console.log("receieved",msg);
});
