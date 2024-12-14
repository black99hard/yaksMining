import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { MiningControls } from './components/mining/MiningControls';
import { GemCatcher } from './components/games/GemCatcher';
import { useStore } from './store/useStore';
import { User, Gem, Coins, Battery, Copy, CopyCheck, LogOut } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';

function App() {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const [isCopied, setIsCopied] = useState(false);
  const [matrixColor, setMatrixColor] = useState('#ff0000'); // Default color

  useEffect(() => {
    let interval: number;
    if (user.isMining && user.energy > 0) {
      interval = window.setInterval(() => {
        setUser({
          points: user.points + user.miningPower,
          energy: Math.max(user.energy - 1, 0),
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [user.isMining, user.energy, user.miningPower, setUser]);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(user.username);
    toast.success("Wallet address copied to clipboard!")
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRecharge = () => {
    setMatrixColor('#0000ff');
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      setMatrixColor('#ff0000');
      document.body.classList.remove('screen-shake');
    }, 2000);
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      username: '',
      walletAddress: null,
      level: 1,
      points: 0,
      tokens: 0,
      energy: 100,
      miningPower: 1,
      isMining: false,
    });
    toast.success('Logged out successfully');
  };

  if (!user.isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 flex items-center justify-center">
      <MatrixRain color={matrixColor} />
      <div className="w-full max-w-[350px] overflow-hidden">
        <div className="bg-red-900 py-4 px-6 rounded-t-3xl flex justify-between items-center">
          <h1 className="text-center text-2xl font-extrabold text-white flex-grow">
            YaksHustles Mining
          </h1>
          <button 
            onClick={handleLogout}
            className="text-white hover:text-red-300 transition-colors"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex justify-between items-center bg-gray-900 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-xs text-gray-400">Level {user.level}</p>
                <p className="text-lg font-bold text-white">
                  {user.username.length > 10 ? `${user.username.slice(0, 10)}...` : user.username}
                  <button onClick={handleCopyUsername} className="ml-2 text-blue-500">
                    {isCopied ? (
                      <CopyCheck className="w-5 h-5 text-red-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-red-600" />
                    )}
                  </button>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Mining Power</p>
              <p className="text-lg font-bold text-red-400">{user.miningPower}x</p>
            </div>
          </div>

          <div className="flex justify-content-center gap-3">
            <div 
              className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform"
              data-tooltip-id="stats-tooltip"
              data-tooltip-content="Use tokens to recharge energy"
            >
              <Coins className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.tokens}</p>
              <p className="text-xs text-gray-400">Tokens</p>
            </div>
            
            <div 
              className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform"
              data-tooltip-id="stats-tooltip"
              data-tooltip-content="Convert points to tokens (10:1 ratio)"
            >
              <Gem className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.points}</p>
              <p className="text-xs text-gray-400">Points</p>
            </div>
            
            <div 
              className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform"
              data-tooltip-id="stats-tooltip"
              data-tooltip-content="Energy depletes while mining"
            >
              <Battery className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.energy}%</p>
              <p className="text-xs text-gray-400">Energy</p>
            </div>
          </div>

          <MiningControls onRecharge={handleRecharge} />
          {/* <GemCatcher /> */}

        </div>
      </div>
      <Tooltip id="stats-tooltip" />
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;