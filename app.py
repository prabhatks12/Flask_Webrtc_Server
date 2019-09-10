from flask import Flask,render_template,request,session
from flask_bootstrap import Bootstrap
import pandas as pd
import numpy as np
from flask_socketio import SocketIO
import json
app=Flask(__name__)
bootstrap=Bootstrap(app)
socketio=SocketIO(app)

app.config['SECRET_KEY']="MY_KEY"
user={}

@app.route('/')
def login():
    return render_template('message.html')


#to check for connection
@socketio.on('connected')
def onConnection(message):
    print(message)

#register every client
@socketio.on('registerUser')
def registerUser(data):
    name=data['user']
    user[name]=request.sid
    session['firstuser']=name
    socketio.emit('availableUsers',json.dumps(user))

#send message in peer to peer
@socketio.on('sendMessage')
def sendMessage(msg,id):
    socketio.emit('receiveMessage',msg,room=id)

#send message for broadcast
@socketio.on('sendBroadCast')
def sendBroadCast(msg):
    socketio.emit('receiveBroadcast',msg,broadcast=True,include_self=False)


if(__name__=='__main__'):
	socketio.run(app)
