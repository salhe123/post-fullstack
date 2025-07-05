export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: '1h' },
};
