import React, { useEffect } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { MiningControls } from './components/mining/MiningControls';
import { GemCatcher } from './components/games/GemCatcher';
import { useStore } from './store/useStore';
import { User, Gem, Coins, Battery } from 'lucide-react';

function App() {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

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

  if (!user.isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 flex items-center justify-center">
      <div className="w-full max-w-[350px] overflow-hidden">
        <div className="bg-red-900 py-4 px-6 rounded-t-3xl">
          <h1 className="text-center text-2xl font-extrabold text-white">
            YaksHustles Mining
          </h1>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex justify-between items-center bg-gray-900 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-xs text-gray-400">Level {user.level}</p>
                <p className="text-lg font-bold text-white">{user.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Mining Power</p>
              <p className="text-lg font-bold text-red-400">{user.miningPower}x</p>
            </div>
          </div>

          <div className="flex justify-content-center gap-3">
            <div className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform">
              <Coins className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.tokens}</p>
              <p className="text-xs text-gray-400">Tokens</p>
            </div>
            <div className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform">
              <Gem className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.points}</p>
              <p className="text-xs text-gray-400">Points</p>
            </div>
            <div className="flex-1 bg-gray-900 p-3 rounded-lg text-center transform hover:scale-105 transition-transform">
              <Battery className="w-8 h-8 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{user.energy}%</p>
              <p className="text-xs text-gray-400">Energy</p>
            </div>
          </div>

          <MiningControls />
          <GemCatcher />
        </div>
      </div>
    </div>
  );
}

export default App;