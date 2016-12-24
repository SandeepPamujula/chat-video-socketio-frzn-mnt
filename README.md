# chat-video-socketio-frzn-mnt

docker build -t nodechatvideo .

docker run -d -p 8080:8080 --name nodechatvideo nodechatvideo 

// rm -r -f nodechatvideo 

docker rm -f nodechatvideo 

docker rmi nodechatvideo 