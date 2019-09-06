from flask import Flask,render_template,request,session
from flask_bootstrap import Bootstrap
import pandas as pd
import numpy as np
from flask_socketio import SocketIO

app=Flask(__name__)
bootstrap=Bootstrap(app)
socketio=SocketIO(app)

app.config['SECRET_KEY']="MY_KEY"

@app.route('/')
def login():
    return render_template('index.html')

@app.route('/message',methods=['GET','POST'])
def message():
    if(request.method=='POST'):
        data=request.form
        name=data['name']
        return render_template('message.html',name=name)
    else:
        return render_template('index.html')

@app.route('/videocall')
def videocall():
    return render_template('videocall.html')

@app.route('/voicecall')
def voicecall():
    return render_template('voicecall.html')

@socketio.on('connect')
def onconnect():
    print("connect")

@socketio.on('message')
def onmessage(message):
    print('message')

if(__name__=='__main__'):
	socketio.run(app)
