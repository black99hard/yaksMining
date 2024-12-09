import React, { useState } from 'react';
import Web3 from 'web3';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import MatrixRain from '../MatrixRain';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const LoginForm: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        setAccount(userAccount);
        setUser({ isLoggedIn: true, username: userAccount });
      } catch (error) {
        console.error('MetaMask login error:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MatrixRain />
      <Card className="w-full max-w-[350px] mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center text-red-500">Yaks Mining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {account ? (
              <div>Logged in as: {account}</div>
            ) : (
              <Button onClick={handleLogin} className="w-full">
                Login with MetaMask
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};