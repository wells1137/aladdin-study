import { NextRequest } from 'next/server';
import { verifyToken } from './auth';

export interface TrackerUser {
  counselorId: number;
  isAdmin: boolean;
  username: string;
}

/** Get tracker user from request (Bearer token). Returns null if not logged in or not a counselor. */
export async function getTrackerUser(req: NextRequest): Promise<TrackerUser | null> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const counselorId = payload.counselorId;
  if (counselorId == null) return null;

  return {
    counselorId,
    isAdmin: payload.role === 'admin',
    username: payload.username,
  };
}
