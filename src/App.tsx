import React, {useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface IMessageToContentScript {
    extensionId: string,
    direction: string,
    action: string
    data: object
}

const extensionId = 'debacohmniakednmhgobhbopmocbfkja';

function App() {

    // Handle allowedSites state
    let [connectionStatus, setConnectionStatus] = useState(false);

    // Send message to content script which has been injected by the wallet extension
    function sendMessageToContentScript(data: IMessageToContentScript) {
        window.postMessage(data);
    }

    // Listener to receive messages from contentScript.js which is embedded in web3sites...
    React.useEffect(() => {
        window.addEventListener("message", (event) => {
            if (!event.data) return;
            if (event.data.extensionId === extensionId && event.data.direction === 'toWebsite') {
                console.log('FINAL RESPONSE RECEIVED: ', event.data);
                setConnectionStatus(event.data.data.connectionStatus);
            }            
        }, false);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}/>
            <Grid item xs={1}/>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={() => {
                        connectionStatus? alert('Disconnect not implemented'): sendMessageToContentScript({
                            extensionId: extensionId,
                            direction: 'toExtension',
                            action: 'CONNECT_WALLET', 
                            data: {}
                        });  
                    }}>
                    {connectionStatus? "Disconnect Wallet" : "Connect Wallet"}
                </Button>
            </Grid>
            <Grid item xs={8}/>
            <Grid item xs={1}/>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={() => {
                        sendMessageToContentScript({
                            extensionId: extensionId,
                            direction: 'toExtension',
                            action: 'OPEN_WALLET', 
                            data: {}
                        });  
                    }}>
                    Open wallet
                </Button>
            </Grid>
            <Grid item xs={8}/>
            <Grid item xs={1}/>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={() => {
                        sendMessageToContentScript({
                            extensionId: extensionId, 
                            direction: 'toExtension',
                            action: 'SEND_TRANSACTION', 
                            data: {
                                address: 'target-address', 
                                token: 'ZNN', 
                                amount: 2.28
                            }
                        });
                    }}>
                    Send transaction
                </Button>
            </Grid>
            <Grid item xs={8}/>
        </Grid> 
    );
}

export default App;
