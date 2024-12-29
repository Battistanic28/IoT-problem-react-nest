import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button } from '@mui/material';

interface ConnectButtonProps {
    connectSocket: () => void;
    isConnected: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ connectSocket, isConnected = false }) => {
    return (
        <Button 
            sx={{margin:'.5rem'}}
            onClick={connectSocket}
            variant="contained"
            disabled={isConnected}
            color='success'>
                Connect
            <PlayArrowIcon />
        </Button>
    )
}

export default ConnectButton;