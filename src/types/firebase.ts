
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
  createdAt: Date;
  subscription?: {
    tier: 'Starter' | 'Pro' | 'Ultra';
    expiresAt?: Date;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  tierRequired: 'Starter' | 'Pro' | 'Ultra';
  thumbnailUrl: string;
  duration: number;
  instructor: string;
  level: 'Anfänger' | 'Fortgeschritten' | 'Experte';
  videos: CourseVideo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  duration: number;
  order: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  videoId: string;
  progressPercentage: number;
  lastWatchedAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  purchasedAt: Date;
  amount: number;
}
