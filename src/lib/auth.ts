// src/lib/auth.ts
export function setToken(token: string) {
    document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
}

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
}

export function clearToken() {
    document.cookie = "token=; path=/; max-age=0";
}
