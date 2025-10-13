import { getToken } from "./auth";

// const API_BASE = "http://localhost:4000"; // API Gateway
const API_BASE = "https://payment-reminder-backend-2.onrender.com"; // Backend base URL

export async function apiFetch(path: string, p0: string, p1: { name: string; tag: string; members: string[]; }, options: RequestInit = {}) {
    console.log("options-------", options)
    const token = getToken();
    console.log("token from apiFetch----", token);
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers, // frontend passed headers first
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // override if token exists
    };

    console.log("headers from apiFetch----", headers);

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return res.json();
}

// api.ts

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function apiRequest(path: string, method: HttpMethod, data?: any) {
    const token = getToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `Request failed: ${res.status}`);
    }

    return res.json();
}

// ✅ Exposed helpers
export const api = {
    get: (path: string) => apiRequest(path, "GET"),
    post: (path: string, data: any) => apiRequest(path, "POST", data),
    put: (path: string, data: any) => apiRequest(path, "PUT", data),
    delete: (path: string) => apiRequest(path, "DELETE"),
};



