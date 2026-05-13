import { OrderStatus, PaymentMethod } from '@prisma/client';
interface CreateOrderDto {
    addressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
    notes?: string;
}
export declare class OrderService {
    createOrder(userId: string, dto: CreateOrderDto): Promise<{
        order: {
            address: {
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
            } | null;
            items: {
                id: string;
                createdAt: Date;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                variantId: string | null;
                productId: string;
                productName: string;
                variantName: string | null;
                image: string | null;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                orderId: string;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            shippingAmount: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            couponCode: string | null;
            notes: string | null;
            expectedDelivery: Date | null;
            deliveredAt: Date | null;
            cancelledAt: Date | null;
            cancelReason: string | null;
            addressId: string | null;
            couponId: string | null;
        };
        razorpayOrder: import("razorpay/dist/types/orders").Orders.RazorpayOrder | {
            id: string;
            amount: number;
            currency: string;
            receipt: string;
        } | null;
    }>;
    verifyPayment(orderId: string, razorpayPaymentId: string, razorpaySignature: string, userId: string): Promise<boolean>;
    getUserOrders(userId: string, page?: number, limit?: number): Promise<{
        orders: ({
            items: ({
                product: {
                    name: string;
                };
            } & {
                id: string;
                createdAt: Date;
                sku: string;
                price: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                variantId: string | null;
                productId: string;
                productName: string;
                variantName: string | null;
                image: string | null;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                orderId: string;
            })[];
            payments: {
                status: import(".prisma/client").$Enums.PaymentStatus;
                method: import(".prisma/client").$Enums.PaymentMethod;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            shippingAmount: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            couponCode: string | null;
            notes: string | null;
            expectedDelivery: Date | null;
            deliveredAt: Date | null;
            cancelledAt: Date | null;
            cancelReason: string | null;
            addressId: string | null;
            couponId: string | null;
        })[];
        total: number;
    }>;
    getOrderById(orderId: string, userId?: string): Promise<{
        user: {
            email: string;
            phone: string | null;
            firstName: string;
            lastName: string;
        };
        address: {
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
        } | null;
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            variantId: string | null;
            productId: string;
            productName: string;
            variantName: string | null;
            image: string | null;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
        payments: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            orderId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            razorpaySignature: string | null;
            refundId: string | null;
            refundAmount: import("@prisma/client/runtime/library").Decimal | null;
            refundedAt: Date | null;
            failureReason: string | null;
        }[];
        timeline: {
            message: string;
            id: string;
            status: string;
            createdAt: Date;
            orderId: string;
            createdBy: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingAmount: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        couponCode: string | null;
        notes: string | null;
        expectedDelivery: Date | null;
        deliveredAt: Date | null;
        cancelledAt: Date | null;
        cancelReason: string | null;
        addressId: string | null;
        couponId: string | null;
    }>;
    updateOrderStatus(orderId: string, status: OrderStatus, message: string, adminId: string): Promise<void>;
    cancelOrder(orderId: string, userId: string, reason: string): Promise<void>;
    requestReturn(orderId: string, userId: string, reason: string, description?: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ReturnStatus;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
        images: import("@prisma/client/runtime/library").JsonValue;
        orderId: string;
        reason: string;
        refundAmount: import("@prisma/client/runtime/library").Decimal | null;
        adminNote: string | null;
    }>;
    getAllOrders(filters: any): Promise<{
        orders: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
            };
            address: {
                city: string;
                state: string;
            } | null;
            items: {
                quantity: number;
                productName: string;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
            }[];
            payments: {
                status: import(".prisma/client").$Enums.PaymentStatus;
                method: import(".prisma/client").$Enums.PaymentMethod;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            shippingAmount: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            couponCode: string | null;
            notes: string | null;
            expectedDelivery: Date | null;
            deliveredAt: Date | null;
            cancelledAt: Date | null;
            cancelReason: string | null;
            addressId: string | null;
            couponId: string | null;
        })[];
        total: number;
    }>;
    private applyCoupon;
    private restoreInventory;
}
export declare const orderService: OrderService;
export {};
//# sourceMappingURL=order.service.d.ts.map