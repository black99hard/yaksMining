import React from 'react';
import { Pickaxe, Coins, Battery } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';

export const MiningControls: React.FC = () => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const toggleMining = () => {
    setUser({ isMining: !user.isMining });
  };

  const convertToTokens = () => {
    const newTokens = Math.floor(user.points / 10);
    setUser({
      tokens: user.tokens + newTokens,
      points: user.points % 10,
    });
  };

  const rechargeEnergy = () => {
    if (user.tokens >= 5) {
      setUser({
        tokens: user.tokens - 5,
        energy: 100,
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={toggleMining}
        className="w-full h-16 text-lg font-extrabold"
        disabled={user.energy === 0}
      >
        <span className="flex items-center justify-center">
          {user.isMining ? 'STOP MINING' : 'START MINING'}
          <Pickaxe className={`w-8 h-8 ml-2 ${user.isMining ? 'animate-bounce' : ''}`} />
        </span>
      </Button>

      <div className="flex justify-content-center gap-3">
        <Button
          onClick={convertToTokens}
          className="h-12 flex-1"
          disabled={user.points < 10}
        >
          <span className="flex items-center">
            Convert
            <Coins className="w-5 h-5 ml-2" />
          </span>
        </Button>
        <Button
          onClick={rechargeEnergy}
          className="h-12 flex-1"
          disabled={user.tokens < 5 || user.energy === 100}
        >
          <span className="flex items-center">
            Recharge
            <Battery className="w-5 h-5 ml-2" />
          </span>
        </Button>
      </div>
    </div>
  );
};