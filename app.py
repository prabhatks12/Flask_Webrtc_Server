from flask import Flask,render_template,request,session
from flask_bootstrap import Bootstrap
import pandas as pd
import numpy as np
from flask_socketio import SocketIO

app=Flask(__name__)
bootstrap=Bootstrap(app)
socketio=SocketIO(app)

app.config['SECRET_KEY']="MY_KEY"
user={}

@app.route('/')
def login():
    return render_template('message.html')

@socketio.on('Connected')
def handle_connect(msg):
    print(msg)

@app.route('/videocall')
def videocall():
    return render_template('videocall.html')

def message():
    render_template('message.html')

@app.route('/voicecall')
def voicecall():
    return render_template('voicecall.html')

@socketio.on('RegisterFirstUser')
def firstuser_handler(first_name):
    user[first_name]=request.sid
    print('First user:  name= ' + first_name + 'sid= '+ request.sid)
    socketio.emit('AvailableUsers',user)

@socketio.on('ReceiveMessage')
def ReceiveMessage(msg,id):
    print(msg)
    print(id)

if(__name__=='__main__'):
	socketio.run(app)
