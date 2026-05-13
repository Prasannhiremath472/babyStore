export declare class UserService {
    getProfile(userId: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        wallet: {
            balance: import("@prisma/client/runtime/library").Decimal;
        } | null;
        id: string;
        phone: string | null;
        referralCode: string | null;
        firstName: string;
        lastName: string;
        avatar: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
        emailVerified: boolean;
        lastLoginAt: Date | null;
        loyaltyPoints: number;
        createdAt: Date;
        addresses: {
            id: string;
            phone: string;
            firstName: string;
            lastName: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            isDefault: boolean;
            label: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string;
            pincode: string;
            country: string;
        }[];
        _count: {
            wishlist: number;
            orders: number;
            reviews: number;
        };
    }>;
    updateProfile(userId: string, data: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
    }): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        phone: string | null;
        firstName: string;
        lastName: string;
        avatar: string | null;
        updatedAt: Date;
    }>;
    addAddress(userId: string, addressData: any): Promise<{
        id: string;
        phone: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isDefault: boolean;
        label: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
    }>;
    updateAddress(userId: string, addressId: string, data: any): Promise<{
        id: string;
        phone: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isDefault: boolean;
        label: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
    }>;
    deleteAddress(userId: string, addressId: string): Promise<void>;
    getWishlist(userId: string): Promise<({
        product: {
            variants: ({
                inventory: {
                    id: string;
                    updatedAt: Date;
                    quantity: number;
                    reservedQuantity: number;
                    lowStockAlert: number;
                    allowBackorder: boolean;
                    warehouseLocation: string | null;
                    variantId: string;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sku: string;
                barcode: string | null;
                weight: number | null;
                attributes: import("@prisma/client/runtime/library").JsonValue;
                price: import("@prisma/client/runtime/library").Decimal;
                comparePrice: import("@prisma/client/runtime/library").Decimal | null;
                costPrice: import("@prisma/client/runtime/library").Decimal | null;
                isDefault: boolean;
                isActive: boolean;
                productId: string;
            })[];
            images: {
                id: string;
                createdAt: Date;
                isPrimary: boolean;
                variantId: string | null;
                url: string;
                altText: string | null;
                sortOrder: number;
                productId: string;
            }[];
        } & {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
            slug: string;
            shortDescription: string | null;
            sku: string;
            barcode: string | null;
            isFeatured: boolean;
            isBestseller: boolean;
            isNew: boolean;
            tags: import("@prisma/client/runtime/library").JsonValue;
            metaTitle: string | null;
            metaDesc: string | null;
            metaKeywords: string | null;
            weight: number | null;
            dimensions: import("@prisma/client/runtime/library").JsonValue | null;
            ageGroup: string | null;
            gender: string | null;
            material: string | null;
            careInstructions: string | null;
            countryOfOrigin: string | null;
            warrantyMonths: number;
            approvedAt: Date | null;
            approvedBy: string | null;
            brandId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    })[]>;
    toggleWishlist(userId: string, productId: string): Promise<{
        wishlisted: boolean;
    }>;
    findAll(filters: any): Promise<{
        users: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            wallet: {
                balance: import("@prisma/client/runtime/library").Decimal;
            } | null;
            id: string;
            phone: string | null;
            firstName: string;
            lastName: string;
            status: import(".prisma/client").$Enums.UserStatus;
            lastLoginAt: Date | null;
            createdAt: Date;
            _count: {
                orders: number;
            };
        }[];
        meta: import("../../utils/response.util").PaginationMeta;
    }>;
    blockUser(userId: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        phone: string | null;
        referralCode: string | null;
        passwordHash: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
        emailVerified: boolean;
        phoneVerified: boolean;
        emailVerifyToken: string | null;
        passwordResetToken: string | null;
        passwordResetExpiry: Date | null;
        lastLoginAt: Date | null;
        lastLoginIp: string | null;
        fcmToken: string | null;
        loyaltyPoints: number;
        referredBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    unblockUser(userId: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        phone: string | null;
        referralCode: string | null;
        passwordHash: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
        emailVerified: boolean;
        phoneVerified: boolean;
        emailVerifyToken: string | null;
        passwordResetToken: string | null;
        passwordResetExpiry: Date | null;
        lastLoginAt: Date | null;
        lastLoginIp: string | null;
        fcmToken: string | null;
        loyaltyPoints: number;
        referredBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map