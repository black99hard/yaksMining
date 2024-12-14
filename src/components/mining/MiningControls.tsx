import React, { useState } from 'react';
import { Pickaxe, Coins, Battery } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';

interface MiningControlsProps {
  onRecharge: () => void;
}

export const MiningControls: React.FC<MiningControlsProps> = ({ onRecharge }) => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const [isConverting, setIsConverting] = useState(false);
  const [isRecharging, setIsRecharging] = useState(false);

  const toggleMining = () => {
    setUser({ isMining: !user.isMining });
  };

  const convertToTokens = async () => {
    setIsConverting(true);
    try {
      const newTokens = Math.floor(user.points / 10);
      setUser({
        tokens: user.tokens + newTokens,
        points: user.points % 10,
      });
      toast.success(`Converted ${newTokens * 10} points to ${newTokens} tokens!`);
    } catch (error) {
      toast.error('Failed to convert points');
    } finally {
      setIsConverting(false);
    }
  };

  const rechargeEnergy = async () => {
    if (user.tokens >= 5) {
      setIsRecharging(true);
      try {
        setUser({
          tokens: user.tokens - 5,
          energy: 100,
        });
        onRecharge();
        toast.success('Energy recharged successfully!');
      } catch (error) {
        toast.error('Failed to recharge energy');
      } finally {
        setIsRecharging(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={toggleMining}
        className={`w-full h-16 text-lg font-extrabold transition-colors duration-300 ${
          user.isMining ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
        }`}
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
          className="h-12 flex-1 relative"
          disabled={user.points < 10 || isConverting}
        >
          <span className="flex items-center">
            {isConverting ? 'Converting...' : 'Convert'}
            <Coins className={`w-5 h-5 ml-2 ${isConverting ? 'animate-spin' : ''}`} />
          </span>
        </Button>
        <Button
          onClick={rechargeEnergy}
          className="h-12 flex-1 relative"
          disabled={user.tokens < 5 || user.energy === 100 || isRecharging}
        >
          <span className="flex items-center">
            {isRecharging ? 'Recharging...' : 'Recharge'}
            <Battery className={`w-5 h-5 ml-2 ${isRecharging ? 'animate-pulse' : ''}`} />
          </span>
        </Button>
      </div>
    </div>
  );
};