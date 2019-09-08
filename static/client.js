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
    console.log(msg);
});
