'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    email?: string;
    name: string;
    avatarUrl?: string | null;
    university?: string | null;
    role: string;
    /** 材料跟踪系统：顾问 ID（partner 登录后有值） */
    counselorId?: number;
    /** 材料跟踪系统：是否为管理员 */
    isAdmin?: boolean;
}

interface AuthState {
    isPartner: boolean;
    isStudent: boolean;
    /** 是否为材料跟踪系统顾问（含管理员） */
    isTrackerUser: boolean;
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, name: string, university?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthState>({
    isPartner: false,
    isStudent: false,
    isTrackerUser: false,
    user: null,
    loading: true,
    login: async () => ({ success: false }),
    register: async () => ({ success: false }),
    logout: () => { },
    updateProfile: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isPartner, setIsPartner] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            fetch('/api/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.authenticated) {
                        if (data.role === 'partner' || data.role === 'admin') {
                            setIsPartner(true);
                            setUser({
                                id: String(data.user?.id ?? 'partner'),
                                name: data.user?.name ?? data.username,
                                role: data.role,
                                counselorId: data.counselorId,
                                isAdmin: data.isAdmin,
                            });
                        } else {
                            setIsStudent(true);
                            setUser(data.user);
                        }
                    } else {
                        localStorage.removeItem('auth_token');
                    }
                })
                .catch(() => localStorage.removeItem('auth_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (userValue: string, pass: string) => {
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userValue, password: pass }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('auth_token', data.token);
                if (data.user?.role === 'partner' || data.user?.role === 'admin') {
                    setIsPartner(true);
                    setUser({
                        id: String(data.user?.id ?? 'partner'),
                        name: data.user?.name ?? data.username,
                        role: data.user?.role ?? 'partner',
                        counselorId: data.counselorId ?? data.user?.counselorId,
                        isAdmin: data.isAdmin ?? data.user?.isAdmin,
                    });
                } else {
                    setIsStudent(true);
                    setUser(data.user);
                }
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch {
            return { success: false, error: '网络错误，请重试' };
        }
    };

    const register = async (email: string, password: string, name: string, university?: string) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, university }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('auth_token', data.token);
                setIsStudent(true);
                setUser(data.user);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch {
            return { success: false, error: '网络错误，请重试' };
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setIsPartner(false);
        setIsStudent(false);
        setUser(null);
    };

    const updateProfile = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };

    const isTrackerUser = Boolean(isPartner);

    return (
        <AuthContext.Provider value={{ isPartner, isStudent, isTrackerUser, user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
