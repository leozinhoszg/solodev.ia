import {
  findUserBadges,
  findAllBadges,
  grantBadge,
  findQuestsWithStatus,
  completeQuest,
  findUserStreak,
  updateStreak,
  recalculateRank,
} from "../repositories/gamification.repository.js";
import { addXpTransaction } from "../repositories/progress.repository.js";

export async function getGamificationData(userId: number) {
  const [badges, allBadges, quests, streak] = await Promise.all([
    findUserBadges(userId),
    findAllBadges(),
    findQuestsWithStatus(userId),
    findUserStreak(userId),
  ]);

  return {
    earnedBadges: badges,
    allBadges,
    quests: {
      main: quests.filter((q) => q.type === "main"),
      daily: quests.filter((q) => q.type === "daily"),
      side: quests.filter((q) => q.type === "side"),
    },
    streak: streak ?? { current_streak: 0, longest_streak: 0, last_activity: null },
  };
}

export async function recordActivity(userId: number) {
  const streak = await updateStreak(userId);

  // Check streak milestones
  if (streak.current_streak === 7) {
    const granted = await grantBadge(userId, "persistent_hunter");
    if (granted) {
      await addXpTransaction(userId, 300, "streak_bonus", null, "Streak de 7 dias: Persistent Hunter");
    }
  }

  // Recalculate rank
  const newRank = await recalculateRank(userId);

  return { streak, newRank };
}

export async function tryCompleteQuest(userId: number, questSlug: string) {
  const result = await completeQuest(userId, questSlug);
  if (!result) return null;

  // Grant XP
  await addXpTransaction(userId, result.xpReward, "quest", null, `Quest: ${questSlug}`);

  // Grant badge if applicable
  if (result.badgeSlug) {
    await grantBadge(userId, result.badgeSlug);
  }

  // Recalculate rank
  const newRank = await recalculateRank(userId);

  return { xpReward: result.xpReward, badgeSlug: result.badgeSlug, newRank };
}
