'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
    isPartner: boolean;
    username: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthState>({
    isPartner: false,
    username: null,
    loading: true,
    login: async () => ({ success: false }),
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isPartner, setIsPartner] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem('partner_token');
        if (token) {
            fetch('/api/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.authenticated) {
                        setIsPartner(true);
                        setUsername(data.username);
                    } else {
                        localStorage.removeItem('partner_token');
                    }
                })
                .catch(() => localStorage.removeItem('partner_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (user: string, pass: string) => {
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, password: pass }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('partner_token', data.token);
                setIsPartner(true);
                setUsername(data.username);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch {
            return { success: false, error: '网络错误，请重试' };
        }
    };

    const logout = () => {
        localStorage.removeItem('partner_token');
        setIsPartner(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isPartner, username, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
