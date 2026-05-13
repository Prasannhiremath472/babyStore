-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `avatar` TEXT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    `status` ENUM('ACTIVE', 'INACTIVE', 'BANNED', 'PENDING_VERIFICATION') NOT NULL DEFAULT 'PENDING_VERIFICATION',
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `phoneVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailVerifyToken` VARCHAR(255) NULL,
    `passwordResetToken` VARCHAR(255) NULL,
    `passwordResetExpiry` DATETIME(3) NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `lastLoginIp` VARCHAR(191) NULL,
    `fcmToken` TEXT NULL,
    `loyaltyPoints` INTEGER NOT NULL DEFAULT 0,
    `referralCode` VARCHAR(191) NULL,
    `referredBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_phone_key`(`phone`),
    UNIQUE INDEX `users_referralCode_key`(`referralCode`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_phone_idx`(`phone`),
    INDEX `users_role_idx`(`role`),
    INDEX `users_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(512) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `revokedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` TEXT NULL,

    UNIQUE INDEX `refresh_tokens_token_key`(`token`),
    INDEX `refresh_tokens_token_idx`(`token`),
    INDEX `refresh_tokens_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NULL,
    `permissions` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `resource` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `permissions_name_key`(`name`),
    INDEX `permissions_resource_action_idx`(`resource`, `action`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL DEFAULT 'Home',
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `addressLine1` VARCHAR(191) NOT NULL,
    `addressLine2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'India',
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `addresses_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDesc` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `categories_slug_key`(`slug`),
    INDEX `categories_slug_idx`(`slug`),
    INDEX `categories_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDesc` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `brands_name_key`(`name`),
    UNIQUE INDEX `brands_slug_key`(`slug`),
    INDEX `brands_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `shortDescription` TEXT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `brandId` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'INACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isBestseller` BOOLEAN NOT NULL DEFAULT false,
    `isNew` BOOLEAN NOT NULL DEFAULT false,
    `tags` JSON NOT NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDesc` VARCHAR(191) NULL,
    `metaKeywords` VARCHAR(191) NULL,
    `weight` DOUBLE NULL,
    `dimensions` JSON NULL,
    `ageGroup` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `material` VARCHAR(191) NULL,
    `careInstructions` VARCHAR(191) NULL,
    `countryOfOrigin` VARCHAR(191) NULL,
    `warrantyMonths` INTEGER NOT NULL DEFAULT 0,
    `approvedAt` DATETIME(3) NULL,
    `approvedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `products_slug_key`(`slug`),
    UNIQUE INDEX `products_sku_key`(`sku`),
    INDEX `products_slug_idx`(`slug`),
    INDEX `products_status_idx`(`status`),
    INDEX `products_brandId_idx`(`brandId`),
    INDEX `products_sku_idx`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_categories` (
    `productId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`productId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_images` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `product_images_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_variants` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `comparePrice` DECIMAL(10, 2) NULL,
    `costPrice` DECIMAL(10, 2) NULL,
    `weight` DOUBLE NULL,
    `attributes` JSON NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_variants_sku_key`(`sku`),
    INDEX `product_variants_productId_idx`(`productId`),
    INDEX `product_variants_sku_idx`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_attributes` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `product_attributes_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `id` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `reservedQuantity` INTEGER NOT NULL DEFAULT 0,
    `lowStockAlert` INTEGER NOT NULL DEFAULT 10,
    `allowBackorder` BOOLEAN NOT NULL DEFAULT false,
    `warehouseLocation` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `inventory_variantId_key`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_movements` (
    `id` VARCHAR(191) NOT NULL,
    `inventoryId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `reason` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `inventory_movements_inventoryId_idx`(`inventoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `carts_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items` (
    `id` VARCHAR(191) NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cart_items_cartId_idx`(`cartId`),
    UNIQUE INDEX `cart_items_cartId_variantId_key`(`cartId`, `variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `addressId` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURN_REQUESTED', 'RETURNED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `discountAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `shippingAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `taxAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `couponId` VARCHAR(191) NULL,
    `couponCode` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `expectedDelivery` DATETIME(3) NULL,
    `deliveredAt` DATETIME(3) NULL,
    `cancelledAt` DATETIME(3) NULL,
    `cancelReason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    INDEX `orders_userId_idx`(`userId`),
    INDEX `orders_status_idx`(`status`),
    INDEX `orders_orderNumber_idx`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NULL,
    `productName` VARCHAR(191) NOT NULL,
    `variantName` VARCHAR(191) NULL,
    `sku` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `order_items_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_timelines` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `order_timelines_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `method` ENUM('RAZORPAY', 'COD', 'WALLET', 'UPI', 'NETBANKING', 'CARD') NOT NULL,
    `status` ENUM('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED') NOT NULL DEFAULT 'PENDING',
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `razorpayOrderId` VARCHAR(191) NULL,
    `razorpayPaymentId` VARCHAR(191) NULL,
    `razorpaySignature` VARCHAR(191) NULL,
    `refundId` VARCHAR(191) NULL,
    `refundAmount` DECIMAL(10, 2) NULL,
    `refundedAt` DATETIME(3) NULL,
    `failureReason` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `payments_orderId_idx`(`orderId`),
    INDEX `payments_razorpayOrderId_idx`(`razorpayOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallets` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `wallets_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `walletId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `balance` DECIMAL(10, 2) NOT NULL,
    `description` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `wallet_transactions_walletId_idx`(`walletId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `discountType` ENUM('PERCENTAGE', 'FLAT', 'BUY_X_GET_Y', 'FREE_SHIPPING') NOT NULL,
    `discountValue` DECIMAL(10, 2) NOT NULL,
    `minOrderAmount` DECIMAL(10, 2) NULL,
    `maxDiscountAmount` DECIMAL(10, 2) NULL,
    `buyQuantity` INTEGER NULL,
    `getQuantity` INTEGER NULL,
    `usageLimit` INTEGER NULL,
    `usedCount` INTEGER NOT NULL DEFAULT 0,
    `perUserLimit` INTEGER NOT NULL DEFAULT 1,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isAutoApply` BOOLEAN NOT NULL DEFAULT false,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `applicableCategories` JSON NOT NULL,
    `applicableProducts` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `coupons_code_key`(`code`),
    INDEX `coupons_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `body` TEXT NULL,
    `images` JSON NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'SPAM') NOT NULL DEFAULT 'PENDING',
    `isVerifiedPurchase` BOOLEAN NOT NULL DEFAULT false,
    `helpfulCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `reviews_productId_idx`(`productId`),
    INDEX `reviews_status_idx`(`status`),
    UNIQUE INDEX `reviews_productId_userId_key`(`productId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlists` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `wishlists_userId_idx`(`userId`),
    UNIQUE INDEX `wishlists_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `return_requests` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `images` JSON NOT NULL,
    `status` ENUM('REQUESTED', 'APPROVED', 'REJECTED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'REFUNDED') NOT NULL DEFAULT 'REQUESTED',
    `refundAmount` DECIMAL(10, 2) NULL,
    `adminNote` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `return_requests_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banners` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `mobileImage` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `type` ENUM('HERO', 'PROMOTIONAL', 'CATEGORY', 'MOBILE_HERO', 'SIDEBAR') NOT NULL DEFAULT 'HERO',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `banners_type_isActive_idx`(`type`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `coverImage` VARCHAR(191) NULL,
    `tags` JSON NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDesc` VARCHAR(191) NULL,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `blogs_slug_key`(`slug`),
    INDEX `blogs_slug_idx`(`slug`),
    INDEX `blogs_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('ORDER_UPDATE', 'PAYMENT', 'PROMO', 'SYSTEM', 'REVIEW', 'RETURN') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `data` JSON NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_userId_isRead_idx`(`userId`, `isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'EXPORT', 'IMPORT', 'APPROVE', 'REJECT', 'BLOCK', 'UNBLOCK') NOT NULL,
    `resource` VARCHAR(191) NOT NULL,
    `resourceId` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `oldData` JSON NULL,
    `newData` JSON NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_userId_idx`(`userId`),
    INDEX `audit_logs_action_idx`(`action`),
    INDEX `audit_logs_resource_idx`(`resource`),
    INDEX `audit_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` JSON NOT NULL,
    `group` VARCHAR(191) NOT NULL DEFAULT 'general',
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `settings_key_key`(`key`),
    INDEX `settings_group_idx`(`group`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pincode_serviceability` (
    `id` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isServiceable` BOOLEAN NOT NULL DEFAULT true,
    `estimatedDays` INTEGER NOT NULL DEFAULT 5,
    `codAvailable` BOOLEAN NOT NULL DEFAULT true,
    `shippingCharge` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pincode_serviceability_pincode_key`(`pincode`),
    INDEX `pincode_serviceability_pincode_idx`(`pincode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_profiles` ADD CONSTRAINT `admin_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attributes` ADD CONSTRAINT `product_attributes_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_movements` ADD CONSTRAINT `inventory_movements_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_timelines` ADD CONSTRAINT `order_timelines_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet_transactions` ADD CONSTRAINT `wallet_transactions_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `wallets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `return_requests` ADD CONSTRAINT `return_requests_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
