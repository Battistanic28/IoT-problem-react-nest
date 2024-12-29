import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import { Button } from '@mui/material';

interface DisconnectButtonProps {
    disconnectSocket: () => void;
    isConnected: boolean;
}

const DisconnectButton: React.FC<DisconnectButtonProps> = ({ disconnectSocket, isConnected = false }) => {
    return (
        <Button 
            sx={{margin:'.5rem'}}
            onClick={disconnectSocket}
            variant="contained"
            disabled={!isConnected}
            color='warning'>
                Disconnect
            <PauseIcon />
        </Button>
    )
}

export default DisconnectButton;