import StreamingDataChart from './components/StreamingChart';
import StreamingDataHistory from './components/DataGrid';
import ConnectButton from './components/ConnectButton';
import DisconnectButton from './components/DisconnectButton';
import { Box } from '@mui/material';

import { useSocket } from './hooks/useSocket';
import './App.css';

function App() {
  const { 
    isConnected,
    eventHistory,
    connectSocket,
    disconnectSocket
  } = useSocket('ws://localhost:5000');

  return (
    <div className="App">
      <header className="App-header">
        <h1>LongPath App</h1>
        <Box>
          <ConnectButton connectSocket={connectSocket} isConnected={isConnected ?? false} />
          <DisconnectButton disconnectSocket={disconnectSocket} isConnected={isConnected ?? false} />
        </Box>
        <StreamingDataChart data={eventHistory} />
        <StreamingDataHistory data={eventHistory}/>
      </header>
    </div>
  );
}

export default App;
