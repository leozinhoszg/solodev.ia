import api from "./api";

export interface Dungeon {
  id: number;
  slug: string;
  title: string;
  rank_required: string;
  description: string | null;
  xp_reward: number;
  status: "not_started" | "in_progress" | "completed";
  locked: boolean;
}

export interface Checkpoint {
  id: number;
  dungeon_id: number;
  description: string;
  order_index: number;
  checked: boolean;
}

export interface DungeonDetail extends Dungeon {
  checkpoints: Checkpoint[];
}

export async function listDungeons(): Promise<Dungeon[]> {
  const { data } = await api.get<{ success: true; data: Dungeon[] }>("/dungeons");
  return data.data;
}

export async function getDungeon(slug: string): Promise<DungeonDetail> {
  const { data } = await api.get<{ success: true; data: DungeonDetail }>(`/dungeons/${slug}`);
  return data.data;
}

export async function startDungeon(slug: string): Promise<void> {
  await api.post(`/dungeons/${slug}/start`);
}

export async function toggleCheckpoint(
  slug: string,
  checkpointId: number,
  checked: boolean,
): Promise<{ allChecked: boolean; checkedCount: number; totalCheckpoints: number }> {
  const { data } = await api.post<{ success: true; data: { allChecked: boolean; checkedCount: number; totalCheckpoints: number } }>(
    `/dungeons/${slug}/checkpoints/${checkpointId}`,
    { checked },
  );
  return data.data;
}

export async function completeDungeon(slug: string): Promise<{ xpReward: number; newRank: string }> {
  const { data } = await api.post<{ success: true; data: { xpReward: number; newRank: string } }>(
    `/dungeons/${slug}/complete`,
  );
  return data.data;
}
