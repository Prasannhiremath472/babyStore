export declare class CartService {
    getCart(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    } | {
        items: {
            price: number;
            comparePrice: number | null;
            stock: number;
            isInStock: boolean;
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
            variant: ({
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
            }) | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            variantId: string | null;
            productId: string;
            cartId: string;
        }[];
        subtotal: number;
        itemCount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    }>;
    addItem(userId: string, productId: string, variantId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    } | {
        items: {
            price: number;
            comparePrice: number | null;
            stock: number;
            isInStock: boolean;
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
            variant: ({
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
            }) | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            variantId: string | null;
            productId: string;
            cartId: string;
        }[];
        subtotal: number;
        itemCount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    }>;
    updateItem(userId: string, itemId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    } | {
        items: {
            price: number;
            comparePrice: number | null;
            stock: number;
            isInStock: boolean;
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
            variant: ({
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
            }) | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            variantId: string | null;
            productId: string;
            cartId: string;
        }[];
        subtotal: number;
        itemCount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    }>;
    removeItem(userId: string, itemId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    } | {
        items: {
            price: number;
            comparePrice: number | null;
            stock: number;
            isInStock: boolean;
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
            variant: ({
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
            }) | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            variantId: string | null;
            productId: string;
            cartId: string;
        }[];
        subtotal: number;
        itemCount: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string | null;
        userId: string;
    }>;
    clearCart(userId: string): Promise<void>;
    private createCart;
}
export declare const cartService: CartService;
//# sourceMappingURL=cart.service.d.ts.map