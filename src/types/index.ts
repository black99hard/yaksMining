export interface Task {
  id: number;
  description: string;
  completed: boolean;
  reward: number;
  link?: string;
}

export interface GameState {
  isActive: boolean;
  score: number;
  currentGame: string | null;
}

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  level: number;
  points: number;
  tokens: number;
  energy: number;
  miningPower: number;
  isMining: boolean;
}

export interface GemCatcherState {
  gemPosition: { x: number; y: number };
  basketPosition: number;
  gemType: string;
}