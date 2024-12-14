import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useStore } from '../../store/useStore';
import MatrixRain from '../MatrixRain';
import { toast } from 'react-toastify';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

interface LoginFormData {
  username: string;
  email: string;
}

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  // Check if user is already logged in
  useEffect(() => {
    if (user.isLoggedIn) {
      toast.success('Welcome back!');
    }
  }, []);

  const handleWeb2Login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs
      if (!formData.username || !formData.email) {
        toast.error('Please fill in all fields');
        return;
      }

      if (!formData.email.includes('@')) {
        toast.error('Please enter a valid email');
        return;
      }

      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful login
      setUser({ 
        isLoggedIn: true, 
        username: formData.username,
        walletAddress: null, // No wallet address for Web2 login
      });
      
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeb3Login = async () => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const walletAddress = accounts[0];
        
        setUser({ 
          isLoggedIn: true, 
          username: `User_${walletAddress.slice(0, 6)}`,
          walletAddress: walletAddress,
        });
        
        toast.success('Wallet connected successfully!');
      } catch (error) {
        console.error('MetaMask login error:', error);
        toast.error('Failed to connect wallet');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('MetaMask is not installed. Please install it to use Web3 login.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MatrixRain color="#ff0000" />
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-red-500">Yaks Mining</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="web2" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="web2">Email Login</TabsTrigger>
              <TabsTrigger value="web3">Wallet Login</TabsTrigger>
            </TabsList>

            <TabsContent value="web2">
              <form onSubmit={handleWeb2Login} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full mb-3"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login with Email'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="web3">
              <Button 
                onClick={handleWeb3Login} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};