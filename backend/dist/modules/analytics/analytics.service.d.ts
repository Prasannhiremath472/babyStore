export declare class AnalyticsService {
    getDashboardStats(): Promise<{}>;
    getRevenueReport(from: Date, to: Date, groupBy?: 'day' | 'week' | 'month'): Promise<unknown>;
    getInventoryReport(): Promise<{
        items: ({
            variant: {
                product: {
                    brand: {
                        name: string;
                    } | null;
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
            };
        } & {
            id: string;
            updatedAt: Date;
            quantity: number;
            reservedQuantity: number;
            lowStockAlert: number;
            allowBackorder: boolean;
            warehouseLocation: string | null;
            variantId: string;
        })[];
        lowStock: ({
            variant: {
                product: {
                    brand: {
                        name: string;
                    } | null;
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
            };
        } & {
            id: string;
            updatedAt: Date;
            quantity: number;
            reservedQuantity: number;
            lowStockAlert: number;
            allowBackorder: boolean;
            warehouseLocation: string | null;
            variantId: string;
        })[];
        outOfStock: ({
            variant: {
                product: {
                    brand: {
                        name: string;
                    } | null;
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
            };
        } & {
            id: string;
            updatedAt: Date;
            quantity: number;
            reservedQuantity: number;
            lowStockAlert: number;
            allowBackorder: boolean;
            warehouseLocation: string | null;
            variantId: string;
        })[];
    }>;
    getCustomerReport(from: Date, to: Date): Promise<{
        newCustomers: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.UserGroupByOutputType, "createdAt"[]> & {
            _count: number;
        })[];
        topCustomers: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderGroupByOutputType, "userId"[]> & {
            _count: number;
            _sum: {
                totalAmount: import("@prisma/client/runtime/library").Decimal | null;
            };
        })[];
        customersByCity: unknown;
    }>;
}
export declare const analyticsService: AnalyticsService;
//# sourceMappingURL=analytics.service.d.ts.map