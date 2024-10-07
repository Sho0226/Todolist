import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
}

// JWTの生成関数
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

// JWTの検証関数
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null; // エラー発生時にはnullを返す
  }
};
