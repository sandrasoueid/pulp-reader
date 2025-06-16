# 1) Base image with Node
FROM node:16-slim

# 2) Install Python3, pip, build essentials for TTS
RUN apt-get update && \
    apt-get install -y python3 python3-pip build-essential git && \
    rm -rf /var/lib/apt/lists/*

# 3) Install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# 4) Copy Node app & install
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# 5) Copy all source
COPY . /app

# 6) Expose (internally) your TTS port & Heroku’s port
#    Note: Heroku will ignore EXPOSE and bind only to $PORT
EXPOSE 5001            # Python TTS
# Node will listen on $PORT

# 7) Start both services:
#    - TTS server on :5001
#    - Node server on $PORT
# Use a shell to background the Python service
CMD ["sh", "-c", "python3 tts_server.py & npm start"]
