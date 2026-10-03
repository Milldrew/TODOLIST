// portfolio override: the committed secret was the literal 'secretKey'.
export const jwtConstants = {
  secret: process.env.JWT_SECRET as string,
};
