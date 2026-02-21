'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    email?: string;
    name: string;
    avatarUrl?: string | null;
    university?: string | null;
    role: string;
}

interface AuthState {
    isPartner: boolean;
    isStudent: boolean;
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
    user: null,
    loading: true,
    login: async () => ({ success: false }),
    register: async () => ({ success: false }),
    logout: () => { },
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
                        if (data.role === 'partner') {
                            setIsPartner(true);
                            setUser({ id: 'partner', name: data.username, role: 'partner' });
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
                if (data.user?.role === 'partner') {
                    setIsPartner(true);
                    setUser({ id: 'partner', name: data.username, role: 'partner' });
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

    return (
        <AuthContext.Provider value={{ isPartner, isStudent, user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
