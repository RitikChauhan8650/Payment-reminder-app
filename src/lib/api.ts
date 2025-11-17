// ...existing code...
import { getToken } from "./auth";

const getApiBase = () => {
    const env = process.env.NEXT_PUBLIC_API_URL;
    if (env) return env.replace(/\/$/, '');
    if (typeof window !== "undefined") {
        const host = window.location.hostname;
        if (host === "localhost" || host === "127.0.0.1") return "http://localhost:4000";
    }
    return env;
};

const API_BASE = getApiBase() || "";

export interface ApiFetchOptions extends RequestInit {
    json?: any;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
    const token = getToken();
    const base = API_BASE.replace(/\/$/, '');
    const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;

    const headers = new Headers(options.headers ?? {});
    if (options.json !== undefined) {
        headers.set("Content-Type", "application/json");
        options.body = JSON.stringify(options.json);
        delete (options as any).json;
    }
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(url, { ...options, headers });
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await res.json().catch(() => ({})) : await res.text();

    if (!res.ok) {
        const err: any = new Error((data && data.message) || res.statusText || "Request failed");
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function apiRequest(path: string, method: HttpMethod, data?: any) {
    return apiFetch(path, {
        method,
        json: data,
    });
}

export const api = {
    get: (path: string) => apiRequest(path, "GET"),
    post: (path: string, data: any) => apiRequest(path, "POST", data),
    put: (path: string, data: any) => apiRequest(path, "PUT", data),
    delete: (path: string) => apiRequest(path, "DELETE"),
};
// ...existing code...