import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";


type DataPoint = {
    id: string,
    number: number;
    timestamp: string;
  };

export function useSocket(socketUrl: string) {
    const [ socket, setSocket ] = useState<Socket>()
    const [ isConnected, setIsConnected ] = useState(socket?.connected)
    const [ eventHistory, setEventHistory ] = useState<DataPoint[]>([]);
    
    // Handle socket connection
    useEffect(() => {
      const currentSocket: Socket = io(socketUrl, {
        autoConnect: false
      })
      setSocket(currentSocket)
    },[socketUrl])
    
    // Handle event history
    useEffect(() => {    
      socket?.on('randomNumber', (data: DataPoint) => {
        setEventHistory((prevEventHistory) => {
            const history = [...prevEventHistory, data];
            const historyQueue = history.length > 20 ? history.slice(-20) : history;

            return historyQueue;
        });
      })
    },[socket])
  
    const connectSocket = () => {
      if (!isConnected) {
        socket?.connect();
        setIsConnected(true)
      }
    }
  
    const disconnectSocket = () => {
      if (isConnected) {
        socket?.disconnect();
        setIsConnected(false)
      }
    }

    return { socket, isConnected, eventHistory, connectSocket, disconnectSocket}
}