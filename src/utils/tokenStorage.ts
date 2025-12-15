// src/utils/tokenStorage.ts

/**
 * Сохраняет access_token и refresh_token в localStorage
 */
export const saveTokens = (tokens: {
  token: string;
  refreshToken?: string;
}): void => {
  localStorage.setItem("access_token", tokens.token);
  if (tokens.refreshToken) {
    localStorage.setItem("refresh_token", tokens.refreshToken);
  }
};

/**
 * Удаляет токены из localStorage
 */
export const clearTokens = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

/**
 * Получает access_token из localStorage
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

/**
 * Получает refresh_token из localStorage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};
