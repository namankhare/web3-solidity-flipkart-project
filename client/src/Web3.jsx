import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalContext';

const Web3 = () => {
    const { isWalletConnected, setIsWalletConnected, walletAddress, setWalletAddress } = useContext(GlobalContext);
    const [errorMessage, setErrorMessage] = useState('');

    const connectToMetamask = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setIsWalletConnected(true);
            } else {
                setErrorMessage('Metamask not found');
            }
        } catch (error) {
            setErrorMessage(`Error connecting to Metamask: ${error.message}`);
        }
    };

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                        setIsWalletConnected(true);
                    }
                } catch (error) {
                    console.error('Error checking Metamask connection:', error);
                }
            } else {
                console.error('Metamask not found');
            }
        };

        checkConnection();
    }, []);

    const disconnectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                    params: [
                        {
                            eth_accounts: {}
                        }
                    ]
                });
                console.log('Metamask disconnected');
                setWalletAddress('');
                setIsWalletConnected(false);
            } catch (error) {
                console.error('Error disconnecting Metamask:', error);
            }
        } else {
            console.error('Metamask not found');
        }
    };

    return (
        <div>
            {isWalletConnected ? (
                <div>
                    <p>Connected to Metamask</p>
                    <p>Wallet Address: {walletAddress}</p>
                    <button onClick={disconnectMetamask}>Disconnect Metamask</button>

                    {/* Display more information or actions for connected users */}
                </div>
            ) : (
                <div>
                    <p>Not connected</p>
                    <button onClick={connectToMetamask}>Connect to Metamask</button>
                    <p>{errorMessage}</p>
                </div>
            )}
            {/* Your other components */}
        </div>
    );
};

export default Web3;
