package services

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type WebSocketService struct {}

func NewWebSocketService() *WebSocketService {
	return &WebSocketService{}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var userConnections = struct {
	sync.Mutex
	connections map[string]*websocket.Conn
}{connections: make(map[string]*websocket.Conn)}

func(s *WebSocketService) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()

	log.Println("Client connected!")
	userId := r.URL.Query().Get("userId")
	if userId == "" {
		log.Println("Missing userId in WebSocket connection")
		conn.Close()
		return
	}
	log.Println("userId:", userId)
	userConnections.Lock()
	userConnections.connections[userId] = conn
	userConnections.Unlock()

	log.Println("User connected")

	for {
		// Nhận tin nhắn từ client
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("User disconnected:", userId)
			userConnections.Lock()
			delete(userConnections.connections, userId)
			userConnections.Unlock()
			break
		}

		log.Printf("Received: %s of user %s", message, userId)

		// Gửi phản hồi lại client
		// err = conn.WriteMessage(messageType, append([]byte("Server: "), message...))
		// if err != nil {
		// 	log.Println("Write error:", err)
		// 	break
		// }
		
		var request map[string]interface{}
		if err := json.Unmarshal(message, &request); err != nil {
			log.Println("Invalid message format:", err)
			continue
		}
	}
}

func SendToUser(userId string, message []byte) {
	log.Println("Attempting to send message to user:", userId)
	userConnections.Lock()
	defer userConnections.Unlock()

	if conn, ok := userConnections.connections[userId]; ok {
		log.Println("Connection found for user:", userId)
		err := conn.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Println("Error sending message to user:", userId, "Error:", err)
			conn.Close()
			delete(userConnections.connections, userId)
		} else {
			log.Println("Message sent successfully to user:", userId)
		}
	} else {
		log.Println("No active connection found for user:", userId)
	}
}

func (s *WebSocketService) HandleOptimizeTask(userId string, status bool) {
	log.Printf("Starting optimization task for user %s...", userId)

	response := map[string]interface{}{
		"type":   "task_optimized",
		"userId": userId,
		"status": "success",
	}
	if !status{
		response["status"] = "failed"
		response["type"] = "task_failed"
	}

	responseBytes, err := json.Marshal(response)
	if err != nil {
		log.Println("Error marshaling response:", err)
		return
	}
	log.Println("Response:", string(responseBytes))
	SendToUser(userId, responseBytes)
}
