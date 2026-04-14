import { AppError } from "../utils/AppError.js";
import {
  findAllDungeons,
  findDungeonBySlug,
  findDungeonCheckpoints,
  findUserDungeonStatus,
  findUserDungeonStatuses,
  findUserCheckpoints,
  startDungeon,
  toggleCheckpoint,
  completeDungeon,
} from "../repositories/dungeon.repository.js";
import { grantBadge, recalculateRank } from "../repositories/gamification.repository.js";
import { addXpTransaction, incrementAttribute, ensureUserAttributes } from "../repositories/progress.repository.js";
import { findUserById } from "../repositories/user.repository.js";

export async function listDungeons(userId: number) {
  const [dungeons, statuses] = await Promise.all([
    findAllDungeons(),
    findUserDungeonStatuses(userId),
  ]);

  const user = await findUserById(userId);
  const statusMap = new Map(statuses.map((s) => [s.dungeon_id, s]));

  return dungeons.map((d) => {
    const userStatus = statusMap.get(d.id);
    const rankOrder = ["E", "D", "C", "B", "A", "S"];
    const userRankIdx = rankOrder.indexOf(user?.current_rank ?? "E");
    const requiredIdx = rankOrder.indexOf(d.rank_required);
    const locked = userRankIdx < requiredIdx;

    return {
      ...d,
      status: userStatus?.status ?? "not_started",
      locked,
    };
  });
}

export async function getDungeonDetail(userId: number, slug: string) {
  const dungeon = await findDungeonBySlug(slug);
  if (!dungeon) {
    throw new AppError(404, "Dungeon não encontrada", "DUNGEON_NOT_FOUND");
  }

  const [checkpoints, userStatus, userCheckpoints] = await Promise.all([
    findDungeonCheckpoints(dungeon.id),
    findUserDungeonStatus(userId, dungeon.id),
    findUserCheckpoints(userId, dungeon.id),
  ]);

  const checkedMap = new Map(userCheckpoints.map((uc) => [uc.checkpoint_id, uc.checked]));

  return {
    ...dungeon,
    status: userStatus?.status ?? "not_started",
    checkpoints: checkpoints.map((cp) => ({
      ...cp,
      checked: checkedMap.get(cp.id) ?? false,
    })),
  };
}

export async function start(userId: number, slug: string) {
  const dungeon = await findDungeonBySlug(slug);
  if (!dungeon) throw new AppError(404, "Dungeon não encontrada", "DUNGEON_NOT_FOUND");

  await startDungeon(userId, dungeon.id);
  return { status: "in_progress" };
}

export async function checkCheckpoint(
  userId: number,
  slug: string,
  checkpointId: number,
  checked: boolean,
) {
  const dungeon = await findDungeonBySlug(slug);
  if (!dungeon) throw new AppError(404, "Dungeon não encontrada", "DUNGEON_NOT_FOUND");

  await toggleCheckpoint(userId, checkpointId, checked);

  // Check if all checkpoints are completed
  const [checkpoints, userCheckpoints] = await Promise.all([
    findDungeonCheckpoints(dungeon.id),
    findUserCheckpoints(userId, dungeon.id),
  ]);

  const checkedCount = userCheckpoints.filter((uc) => uc.checked).length;
  const allChecked = checkedCount === checkpoints.length && checkpoints.length > 0;

  return { checked, allChecked, checkedCount, totalCheckpoints: checkpoints.length };
}

export async function complete(userId: number, slug: string) {
  const dungeon = await findDungeonBySlug(slug);
  if (!dungeon) throw new AppError(404, "Dungeon não encontrada", "DUNGEON_NOT_FOUND");

  // Verify all checkpoints completed
  const [checkpoints, userCheckpoints] = await Promise.all([
    findDungeonCheckpoints(dungeon.id),
    findUserCheckpoints(userId, dungeon.id),
  ]);

  const checkedCount = userCheckpoints.filter((uc) => uc.checked).length;
  if (checkedCount < checkpoints.length) {
    throw new AppError(400, "Complete todos os checkpoints antes de finalizar", "CHECKPOINTS_INCOMPLETE");
  }

  await completeDungeon(userId, dungeon.id);

  // Grant XP
  await addXpTransaction(userId, dungeon.xp_reward, "dungeon", dungeon.id, `Dungeon: ${dungeon.title}`);

  // Grant badge
  if (dungeon.badge_id) {
    const badgeSlug = slug === "task-realm" ? "first_deploy"
      : slug === "auth-fortress" ? "auth_specialist"
      : slug === "the-gate" ? "gate_opener"
      : null;
    if (badgeSlug) await grantBadge(userId, badgeSlug);
  }

  // Boost attributes
  await ensureUserAttributes(userId);
  await incrementAttribute(userId, "frontend_power", 10);
  await incrementAttribute(userId, "backend_strength", 10);
  await incrementAttribute(userId, "db_knowledge", 5);

  const newRank = await recalculateRank(userId);

  return { xpReward: dungeon.xp_reward, newRank };
}
