import api from "./api";

export interface Badge {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  rank_tier: string;
}

export interface EarnedBadge extends Badge {
  badge_id: number;
  earned_at: string;
}

export interface Quest {
  quest_id: number;
  slug: string;
  title: string;
  description: string | null;
  type: "main" | "daily" | "side";
  xp_reward: number;
  completed: boolean;
  completed_at: string | null;
}

export interface Streak {
  current_streak: number;
  longest_streak: number;
  last_activity: string | null;
}

export interface GamificationData {
  earnedBadges: EarnedBadge[];
  allBadges: Badge[];
  quests: {
    main: Quest[];
    daily: Quest[];
    side: Quest[];
  };
  streak: Streak;
}

export async function getGamificationData(): Promise<GamificationData> {
  const { data } = await api.get<{ success: true; data: GamificationData }>("/gamification");
  return data.data;
}

export async function recordActivity(): Promise<{ streak: Streak; newRank: string }> {
  const { data } = await api.post<{ success: true; data: { streak: Streak; newRank: string } }>("/gamification/activity");
  return data.data;
}

export async function completeQuest(slug: string): Promise<{ xpReward: number; badgeSlug: string | null; newRank: string }> {
  const { data } = await api.post<{ success: true; data: { xpReward: number; badgeSlug: string | null; newRank: string } }>(
    `/gamification/quests/${slug}/complete`,
  );
  return data.data;
}
