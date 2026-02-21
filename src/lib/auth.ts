import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'aladdin-edu-partner-secret-2026'
);

// Default partner accounts (can be overridden by env var PARTNER_ACCOUNTS)
// Format: "user1:pass1,user2:pass2"
const DEFAULT_ACCOUNTS = [
    'partner01:Aladdin2026!',
    'partner02:Aladdin2026!',
    'partner03:Aladdin2026!',
    'partner04:Aladdin2026!',
    'partner05:Aladdin2026!',
    'partner06:Aladdin2026!',
    'partner07:Aladdin2026!',
    'partner08:Aladdin2026!',
    'partner09:Aladdin2026!',
    'partner10:Aladdin2026!',
].join(',');

function getAccounts(): Map<string, string> {
    const raw = process.env.PARTNER_ACCOUNTS || DEFAULT_ACCOUNTS;
    const map = new Map<string, string>();
    raw.split(',').forEach(pair => {
        const [user, pass] = pair.split(':');
        if (user && pass) map.set(user.trim(), pass.trim());
    });
    return map;
}

export function validateCredentials(username: string, password: string): boolean {
    const accounts = getAccounts();
    return accounts.get(username) === password;
}

export async function signToken(username: string, role: string = 'partner'): Promise<string> {
    return new SignJWT({ username, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .setIssuedAt()
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ username: string; role: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { username: string; role: string };
    } catch {
        return null;
    }
}
