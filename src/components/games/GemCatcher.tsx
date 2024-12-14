import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import confetti from 'canvas-confetti';

export const GemCatcher: React.FC = () => {
  const { game, setGame } = useStore((state) => ({
    game: state.game,
    setGame: state.setGame,
  }));

  const [gemState, setGemState] = React.useState({
    position: { x: 50, y: 0 },
    type: 'yellow',
    basketPosition: 50,
  });

  const moveBasket = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPosition = ((clientX - containerRect.left) / containerRect.width) * 100;
    setGemState(prev => ({ ...prev, basketPosition: Math.max(0, Math.min(newPosition, 100)) }));
  }, []);

  useEffect(() => {
    let gameInterval: number;
    if (game.isActive) {
      gameInterval = window.setInterval(() => {
        setGemState(prev => {
          const newY = prev.position.y + 5;
          if (newY >= 90) {
            if (Math.abs(prev.position.x - prev.basketPosition) < 10) {
              setGame(prevGame => ({ ...prevGame, score: prevGame.score + 1 }));
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
              });
              return {
                ...prev,
                position: { x: Math.random() * 80 + 10, y: 0 },
                type: ['yellow', 'blue', 'red'][Math.floor(Math.random() * 3)],
              };
            } else {
              setGame(prevGame => ({ ...prevGame, isActive: false }));
            }
          }
          return { ...prev, position: { ...prev.position, y: newY } };
        });
      }, 50);
    }
    return () => clearInterval(gameInterval);
  }, [game.isActive, setGame]);

  if (!game.isActive) return null;

  return (
    <div
      className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
      onMouseMove={moveBasket}
      onTouchMove={moveBasket}
    >
      <motion.div
        className={`absolute w-8 h-8 rounded-full ${
          gemState.type === 'yellow'
            ? 'bg-yellow-400'
            : gemState.type === 'blue'
            ? 'bg-blue-500'
            : 'bg-red-600'
        }`}
        style={{
          left: `${gemState.position.x}%`,
          top: `${gemState.position.y}%`,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Gem className="w-8 h-8 text-white" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 w-16 h-4 bg-red-600 rounded-t-full"
        style={{ left: `${gemState.basketPosition}%`, transform: 'translateX(-50%)' }}
        animate={{ x: '-50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.p
        className="absolute top-2 left-2 text-white font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={game.score}
      >
        Score: {game.score}
      </motion.p>
      <Button
        onClick={() => setGame({ isActive: false })}
        className="absolute top-2 right-2 text-xs px-2 py-1"
      >
        End Game
      </Button>
    </div>
  );
};