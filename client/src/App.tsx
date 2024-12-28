import React, { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import StreamingDataChart from './components/StreamingChart';
import StreamingDataGrid from './components/DataGrid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Button, Box } from '@mui/material';
import './App.css';

type DataPoint = {
  id: string,
  number: number;
  timestamp: string;
};

function App() {
  const [ socket, setSocket ] = useState<Socket>()
  const [ isConnected, setIsConnected ] = useState(socket?.connected)
  const [ eventHistory, setEventHistory ] = useState<DataPoint[]>([]);
  
  // Handle connection
  useEffect(() => {
    const socketUrl = 'ws://localhost:5000'
    const currentSocket: Socket = io(socketUrl, {
      autoConnect: false
    })
    setSocket(currentSocket)
  },[])
  
  // Handle changes to socket state
  useEffect(() => {    
    socket?.on('randomNumber', (data: DataPoint) => {
      setEventHistory((prevEventHistory) => [...prevEventHistory, data]);
    })
  },[socket])

  const connect = () => {
    if (!isConnected) {
      socket?.connect();
      setIsConnected(true)
    }
  }

  const disconnect = () => {
    if (isConnected) {
      socket?.disconnect();
      setIsConnected(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>LongPath App</h1>
        <Box>
          <Button 
            sx={{margin:'.5rem'}}
            onClick={connect}
            variant="contained"
            disabled={isConnected}
            color="success">
              Connect
              <PlayArrowIcon />
          </Button>
          <Button 
            sx={{margin:'.5rem'}}
            onClick={disconnect}
            variant="contained"
            disabled={!isConnected}
            color="warning">
              Disconnect
              <PauseIcon />
          </Button>
        </Box>
        <StreamingDataChart data={eventHistory} />
        <StreamingDataGrid data={eventHistory}/>
      </header>
    </div>
  );
}

export default App;
