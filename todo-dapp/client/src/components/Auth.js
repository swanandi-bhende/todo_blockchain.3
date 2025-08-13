import React, { createContext, useState, useEffect, useContext } from 'react';
import web3 from '../web3';
import TodoList from '../contracts/TodoList.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Get accounts
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        // Initialize contract
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TodoList.networks[networkId];
        const instance = new web3.eth.Contract(
          TodoList.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);
        
        // Check registration
        const registered = await instance.methods.registeredUsers(accounts[0]).call();
        setIsRegistered(registered);
      }
      setLoading(false);
    };

    init();
    
    // Handle account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
        window.location.reload();
      });
    }
  }, []);

  const register = async () => {
    if (!contract) return;
    await contract.methods.register().send({ from: account });
    setIsRegistered(true);
  };

  return (
    <AuthContext.Provider value={{ 
      account, 
      contract, 
      isRegistered, 
      register,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useWeb3 = () => useContext(AuthContext);