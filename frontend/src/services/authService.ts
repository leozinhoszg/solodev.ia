import api from "./api";

interface AuthResponse {
  accessToken: string;
  userId: number;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  plan: "free" | "pro";
  current_rank: string;
  total_xp: number;
  avatar_url: string | null;
}

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<{ success: true; data: AuthResponse }>("/auth/register", {
    name,
    email,
    password,
  });
  setAccessToken(data.data.accessToken);
  return data.data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<{ success: true; data: AuthResponse }>("/auth/login", {
    email,
    password,
  });
  setAccessToken(data.data.accessToken);
  return data.data;
}

export async function refreshToken(): Promise<string> {
  const { data } = await api.post<{ success: true; data: { accessToken: string } }>("/auth/refresh");
  setAccessToken(data.data.accessToken);
  return data.data.accessToken;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
  setAccessToken(null);
}

export async function getMe(): Promise<UserData> {
  const { data } = await api.get<{ success: true; data: UserData }>("/auth/me");
  return data.data;
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<string> {
  const { data } = await api.post<{ success: true; data: { accessToken: string } }>("/auth/reset-password", {
    token,
    newPassword,
  });
  setAccessToken(data.data.accessToken);
  return data.data.accessToken;
}
