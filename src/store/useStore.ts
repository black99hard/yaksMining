import { create } from 'zustand';
import { UserState, GameState, Task } from '../types';

interface Store {
  user: UserState;
  game: GameState;
  tasks: Task[];
  affiliateTasks: Task[];
  setUser: (user: Partial<UserState>) => void;
  setGame: (game: Partial<GameState>) => void;
  updateTask: (taskId: number, completed: boolean) => void;
  updateAffiliateTask: (taskId: number, completed: boolean) => void;
}

const initialTasks = [
  { id: 1, description: 'Follow us on X', completed: false, reward: 50 },
  { id: 2, description: 'Join our Telegram group', completed: false, reward: 75 },
  { id: 3, description: 'Make a post about YaksHustles', completed: false, reward: 100 },
];

const initialAffiliateTasks = [
  { id: 1, description: 'Sign up for MinerMax', link: 'https://minermax.com/ref123', completed: false, reward: 200 },
  { id: 2, description: 'Join CryptoDigger', link: 'https://cryptodigger.com/ref456', completed: false, reward: 150 },
  { id: 3, description: 'Try out BlockchainBonanza', link: 'https://blockchainbonanza.com/ref789', completed: false, reward: 250 },
];

export const useStore = create<Store>((set) => ({
  user: {
    isLoggedIn: false,
    username: '',
    level: 1,
    points: 0,
    tokens: 0,
    energy: 100,
    miningPower: 1,
    isMining: false,
  },
  game: {
    isActive: false,
    score: 0,
    currentGame: null,
  },
  tasks: initialTasks,
  affiliateTasks: initialAffiliateTasks,
  setUser: (userUpdate) =>
    set((state) => ({
      user: { ...state.user, ...userUpdate },
    })),
  setGame: (gameUpdate) =>
    set((state) => ({
      game: { ...state.game, ...gameUpdate },
    })),
  updateTask: (taskId, completed) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      ),
    })),
  updateAffiliateTask: (taskId, completed) =>
    set((state) => ({
      affiliateTasks: state.affiliateTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      ),
    })),
}));  