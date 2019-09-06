
const ws =io.connect(window.location.href)

ws.on('connect', function() {
  console.log("Connection estalished")
  ws.send("adsd",broadcast=true)
});
