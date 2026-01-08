
export enum AppView {
  DASHBOARD = 'dashboard',
  STUDIO = 'studio',
  COMMUNITY = 'community',
  COURSES = 'courses',
  PRICING = 'pricing',
  PROFILE = 'profile',
  CHALLENGES = 'challenges'
}

export enum GenerationType {
  IMAGE = 'image',
  VIDEO = 'video',
  TTS = 'tts'
}

export interface AnimationStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  promptModifier: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

export interface CreatorTemplate {
  id: string;
  author: string;
  title: string;
  previewUrl: string;
  type: 'image' | 'video';
  tags: string[];
}

export interface UserChallenge {
  id: string;
  title: string;
  rewardXP: number;
  completed: boolean;
  icon: string;
  description: string;
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXP: number;
  completedChallenges: string[];
}
