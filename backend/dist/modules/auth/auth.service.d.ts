interface RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}
interface LoginDto {
    email: string;
    password: string;
}
export declare class AuthService {
    register(dto: RegisterDto, ipAddress?: string): Promise<{
        user: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            firstName: string;
            lastName: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
        };
        emailVerifyToken: string;
    }>;
    login(dto: LoginDto, ipAddress?: string, userAgent?: string): Promise<{
        user: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            firstName: string;
            lastName: string;
            status: import(".prisma/client").$Enums.UserStatus;
            emailVerified: boolean;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(token: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string, userId: string): Promise<void>;
    verifyEmail(token: string): Promise<boolean>;
    forgotPassword(email: string): Promise<{
        token: string;
        email: string;
        firstName: string;
    } | undefined>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
    private logFailedLogin;
    private generateReferralCode;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map