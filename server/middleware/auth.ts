import { verifyToken } from 'common/utils/jwtUtils';
import type { NextApiRequest, NextApiResponse } from 'next';

interface AuthenticatedRequest extends NextApiRequest {
  userId: number;
}

export const authMiddleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
): ((req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: '認証トークンがありません' });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: '無効なトークンです' });
    }
    (req as AuthenticatedRequest).userId = payload.userId;

    await handler(req as AuthenticatedRequest, res);
  };
};
