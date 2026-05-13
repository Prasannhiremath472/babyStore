import { UserRole } from '@prisma/client';
export interface JwtPayload {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}
export declare function signAccessToken(payload: JwtPayload): string;
export declare function signRefreshToken(payload: {
    id: string;
}): string;
export declare function verifyRefreshToken(token: string): {
    id: string;
};
//# sourceMappingURL=jwt.util.d.ts.map