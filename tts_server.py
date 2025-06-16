# tts_server.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Python TTS!"

if __name__ == '__main__':
    # bind on all interfaces so Heroku can route to us
    app.run(host='0.0.0.0', port=5001)
