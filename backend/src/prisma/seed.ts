import {
  PrismaClient,
  UserRole,
  UserStatus,
  ProductStatus,
  BannerType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ReviewStatus,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ─── helpers ──────────────────────────────────────────────────────────────────
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const orderNum = () => `LN${Date.now()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

async function main() {
  console.log('🌱  Seeding LittleNest database …');

  // ══════════════════════════════════════════════════════════════════
  // 1. USERS
  // ══════════════════════════════════════════════════════════════════
  const superAdminHash = await bcrypt.hash('SuperAdmin@123', 12);
  const adminHash      = await bcrypt.hash('Admin@123',      12);
  const customerHash   = await bcrypt.hash('Customer@123',   12);

  // Admin accounts
  await prisma.user.upsert({
    where: { email: 'superadmin@littlenest.in' },
    update: {},
    create: {
      email: 'superadmin@littlenest.in', passwordHash: superAdminHash,
      firstName: 'Super', lastName: 'Admin',
      role: UserRole.SUPER_ADMIN, status: UserStatus.ACTIVE, emailVerified: true,
      wallet: { create: {} }, cart: { create: {} },
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@littlenest.in' },
    update: {},
    create: {
      email: 'admin@littlenest.in', passwordHash: adminHash,
      firstName: 'Admin', lastName: 'LittleNest',
      role: UserRole.ADMIN, status: UserStatus.ACTIVE, emailVerified: true,
      wallet: { create: {} }, cart: { create: {} },
    },
  });

  await prisma.user.upsert({
    where: { email: 'manager@littlenest.in' },
    update: {},
    create: {
      email: 'manager@littlenest.in', passwordHash: adminHash,
      firstName: 'Ravi', lastName: 'Kumar',
      role: UserRole.MANAGER, status: UserStatus.ACTIVE, emailVerified: true,
      wallet: { create: {} }, cart: { create: {} },
    },
  });

  // Demo customers
  const customersData = [
    { email: 'demo@littlenest.in',    first: 'Priya',   last: 'Sharma',    phone: '9876543210', points: 250, walletBal: 500,  ref: 'PRI123', city: 'Bengaluru',  state: 'Karnataka',   pin: '560034', addr: '42 MG Road, Koramangala' },
    { email: 'rahul@littlenest.in',   first: 'Rahul',   last: 'Mehta',     phone: '9812345678', points: 100, walletBal: 0,    ref: 'RAH456', city: 'Mumbai',     state: 'Maharashtra', pin: '400001', addr: '15 Marine Drive'         },
    { email: 'sneha@littlenest.in',   first: 'Sneha',   last: 'Patel',     phone: '9898765432', points: 75,  walletBal: 200,  ref: 'SNE789', city: 'Ahmedabad',  state: 'Gujarat',     pin: '380001', addr: '7 Paldi Circle'           },
    { email: 'arjun@littlenest.in',   first: 'Arjun',   last: 'Nair',      phone: '9745612300', points: 320, walletBal: 1000, ref: 'ARJ321', city: 'Kochi',      state: 'Kerala',      pin: '682001', addr: '3 MG Road'                },
    { email: 'divya@littlenest.in',   first: 'Divya',   last: 'Reddy',     phone: '9666123456', points: 50,  walletBal: 0,    ref: 'DIV654', city: 'Hyderabad',  state: 'Telangana',   pin: '500001', addr: '22 Banjara Hills'         },
    { email: 'ananya@littlenest.in',  first: 'Ananya',  last: 'Singh',     phone: '9911223344', points: 180, walletBal: 750,  ref: 'ANA987', city: 'Delhi',      state: 'Delhi',       pin: '110001', addr: '5 Connaught Place'        },
    { email: 'vikram@littlenest.in',  first: 'Vikram',  last: 'Joshi',     phone: '9833445566', points: 90,  walletBal: 0,    ref: 'VIK111', city: 'Pune',       state: 'Maharashtra', pin: '411001', addr: '18 FC Road'               },
    { email: 'kavita@littlenest.in',  first: 'Kavita',  last: 'Iyer',      phone: '9944556677', points: 210, walletBal: 300,  ref: 'KAV222', city: 'Chennai',    state: 'Tamil Nadu',  pin: '600001', addr: '9 Anna Salai'             },
    { email: 'rohan@littlenest.in',   first: 'Rohan',   last: 'Gupta',     phone: '9755667788', points: 60,  walletBal: 0,    ref: 'ROH333', city: 'Kolkata',    state: 'West Bengal', pin: '700001', addr: '11 Park Street'           },
    { email: 'meera@littlenest.in',   first: 'Meera',   last: 'Krishnan',  phone: '9822334455', points: 400, walletBal: 1500, ref: 'MEE444', city: 'Bengaluru',  state: 'Karnataka',   pin: '560001', addr: '30 Indiranagar'           },
  ];

  const customers: any[] = [];
  for (const c of customersData) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email, passwordHash: customerHash,
        firstName: c.first, lastName: c.last, phone: c.phone,
        role: UserRole.CUSTOMER, status: UserStatus.ACTIVE, emailVerified: true,
        loyaltyPoints: c.points, referralCode: c.ref,
        wallet: { create: { balance: c.walletBal } },
        cart:   { create: {} },
        addresses: {
          create: {
            label: 'Home', firstName: c.first, lastName: c.last, phone: c.phone,
            addressLine1: c.addr, city: c.city, state: c.state, pincode: c.pin, isDefault: true,
          },
        },
      },
      include: { addresses: true },
    });
    customers.push(user);
  }
  console.log(`✓  ${customers.length} customers`);

  // ══════════════════════════════════════════════════════════════════
  // 2. CATEGORIES
  // ══════════════════════════════════════════════════════════════════
  const categoriesData = [
    { name: 'Baby Clothing',      icon: '👕', sortOrder: 1,  isFeatured: true  },
    { name: 'Kids Fashion',       icon: '👗', sortOrder: 2,  isFeatured: true  },
    { name: 'Toys & Games',       icon: '🧸', sortOrder: 3,  isFeatured: true  },
    { name: 'Feeding Essentials', icon: '🍼', sortOrder: 4,  isFeatured: true  },
    { name: 'Diapers & Wipes',    icon: '🧷', sortOrder: 5,  isFeatured: false },
    { name: 'Bath & Skin Care',   icon: '🛁', sortOrder: 6,  isFeatured: false },
    { name: 'Baby Gear',          icon: '🚼', sortOrder: 7,  isFeatured: false },
    { name: 'School Essentials',  icon: '🎒', sortOrder: 8,  isFeatured: true  },
    { name: 'Nursery',            icon: '🛏️', sortOrder: 9,  isFeatured: false },
    { name: 'Footwear',           icon: '👟', sortOrder: 10, isFeatured: false },
    { name: 'Books',              icon: '📚', sortOrder: 11, isFeatured: false },
    { name: 'Maternity',          icon: '🤱', sortOrder: 12, isFeatured: false },
    { name: 'Health & Safety',    icon: '🏥', sortOrder: 13, isFeatured: false },
  ];

  const categories: any[] = [];
  for (const cat of categoriesData) {
    const s = slug(cat.name);
    const c = await prisma.category.upsert({
      where: { slug: s }, update: {},
      create: {
        name: cat.name, slug: s, icon: cat.icon,
        sortOrder: cat.sortOrder, isFeatured: cat.isFeatured,
        metaTitle: `${cat.name} - LittleNest`,
        metaDesc: `Shop premium ${cat.name} for babies and kids at LittleNest`,
      },
    });
    categories.push(c);
  }
  console.log(`✓  ${categories.length} categories`);

  const catMap = Object.fromEntries(categories.map(c => [c.name, c]));

  // ══════════════════════════════════════════════════════════════════
  // 3. BRANDS
  // ══════════════════════════════════════════════════════════════════
  const brandsData = [
    { name: 'LittleNest Originals', featured: true  },
    { name: 'Babyhug',              featured: true  },
    { name: 'Mee Mee',              featured: true  },
    { name: 'Chicco',               featured: true  },
    { name: 'Fisher-Price',         featured: true  },
    { name: 'Pigeon',               featured: false },
    { name: "Johnson's Baby",       featured: true  },
    { name: 'Himalaya Baby',        featured: false },
    { name: 'Lego',                 featured: true  },
    { name: 'Funskool',             featured: false },
    { name: 'Mothercare',           featured: true  },
    { name: 'Nuby',                 featured: false },
    { name: 'Motorola',             featured: false },
  ];

  const brands: any[] = [];
  for (const b of brandsData) {
    const s = slug(b.name);
    const brand = await prisma.brand.upsert({
      where: { slug: s }, update: {},
      create: { name: b.name, slug: s, isFeatured: b.featured, description: `Premium quality products by ${b.name}` },
    });
    brands.push(brand);
  }
  console.log(`✓  ${brands.length} brands`);

  const brandMap = Object.fromEntries(brands.map(b => [b.name, b]));

  // ══════════════════════════════════════════════════════════════════
  // 4. PRODUCTS (50 products)
  // ══════════════════════════════════════════════════════════════════
  const productsData = [
    // ── Baby Clothing ───────────────────────────────────────────────
    {
      name: 'Organic Cotton Baby Bodysuit',       cat: 'Baby Clothing',      brand: 'LittleNest Originals',
      price: 599,   cmp: 899,   age: '0-3 months',   featured: true,  bestseller: true,  isNew: false,
      tags: ['organic','cotton','newborn','onesie'],
      desc: 'Soft GOTS-certified organic cotton bodysuit, perfect for delicate newborn skin. Snap closures for easy diaper changes.',
      attrs: [{ name: 'Material', value: '100% Organic Cotton' }, { name: 'Care', value: 'Machine wash cold' }],
      images: ['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600'],
      variants: [
        { name: 'New Born (0-3M)', price: 599, cmp: 899, stock: 85 },
        { name: '3-6 Months',      price: 649, cmp: 949, stock: 60 },
        { name: '6-9 Months',      price: 699, cmp: 999, stock: 45 },
      ],
    },
    {
      name: 'Floral Print Baby Romper',           cat: 'Baby Clothing',      brand: 'Babyhug',
      price: 499,   cmp: 749,   age: '3-6 months',   featured: false, bestseller: true,  isNew: true,
      tags: ['romper','floral','summer','cute'],
      desc: 'Adorable floral print romper made from breathable cotton-spandex blend. Features envelope neckline for easy dressing.',
      attrs: [{ name: 'Material', value: 'Cotton-Spandex' }, { name: 'Fit', value: 'Slim fit' }],
      images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600'],
      variants: [
        { name: '3-6 Months', price: 499, cmp: 749, stock: 72 },
        { name: '6-9 Months', price: 549, cmp: 799, stock: 55 },
      ],
    },
    {
      name: 'Baby Woollen Sweater Set',            cat: 'Baby Clothing',      brand: 'Mee Mee',
      price: 899,   cmp: 1299,  age: '6-12 months',  featured: false, bestseller: false, isNew: false,
      tags: ['woollen','winter','warm','set'],
      desc: 'Cosy woollen sweater and pant set. Keeps your baby warm and stylish during winter months.',
      attrs: [{ name: 'Material', value: 'Acrylic Wool' }, { name: 'Includes', value: 'Top + Pant' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'],
      variants: [{ name: '6-12 Months', price: 899, cmp: 1299, stock: 40 }],
    },
    {
      name: 'Cotton Muslin Swaddle Blanket Set',   cat: 'Baby Clothing',      brand: 'LittleNest Originals',
      price: 799,   cmp: 1099,  age: '0-6 months',   featured: true,  bestseller: true,  isNew: false,
      tags: ['muslin','swaddle','blanket','organic'],
      desc: 'Set of 3 breathable muslin swaddle blankets. Gets softer with every wash. Ideal for swaddling, nursing cover, and tummy time.',
      attrs: [{ name: 'Material', value: 'Organic Muslin' }, { name: 'Set of', value: '3 blankets' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'],
      variants: [{ name: 'Pack of 3', price: 799, cmp: 1099, stock: 110 }],
    },
    {
      name: 'Kids Kurta Pyjama Ethnic Set',        cat: 'Kids Fashion',       brand: 'LittleNest Originals',
      price: 1299,  cmp: 1799,  age: '1-3 years',    featured: true,  bestseller: false, isNew: true,
      tags: ['ethnic','kurta','festive','indian'],
      desc: 'Traditional kurta and pyjama set perfect for festivals and special occasions. Soft cotton blend for all-day comfort.',
      attrs: [{ name: 'Material', value: 'Cotton Blend' }, { name: 'Occasion', value: 'Festive' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [
        { name: '1-2 Years', price: 1299, cmp: 1799, stock: 38 },
        { name: '2-3 Years', price: 1399, cmp: 1899, stock: 30 },
        { name: '3-4 Years', price: 1499, cmp: 1999, stock: 25 },
      ],
    },

    // ── Toys & Games ────────────────────────────────────────────────
    {
      name: 'Colorful Building Blocks Set (80pcs)', cat: 'Toys & Games',     brand: 'Fisher-Price',
      price: 1299,  cmp: 1799,  age: '1-3 years',    featured: true,  bestseller: true,  isNew: true,
      tags: ['blocks','educational','colorful','stem'],
      desc: '80-piece interlocking building block set in 8 vibrant colors. Develops creativity, fine motor skills, and spatial awareness.',
      attrs: [{ name: 'Pieces', value: '80' }, { name: 'Material', value: 'Non-toxic ABS plastic' }, { name: 'BIS Certified', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
      variants: [{ name: '80 Pieces', price: 1299, cmp: 1799, stock: 95 }],
    },
    {
      name: 'Wooden Shape Sorter Cube',            cat: 'Toys & Games',       brand: 'LittleNest Originals',
      price: 899,   cmp: 1299,  age: '1-2 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['wooden','sorter','montessori','educational'],
      desc: 'Premium wooden shape sorter with 6 sides and 30 wooden shapes. Encourages problem-solving and color/shape recognition.',
      attrs: [{ name: 'Material', value: 'Solid Beechwood' }, { name: 'Shapes', value: '30 pieces' }, { name: 'Paint', value: 'Non-toxic' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [{ name: 'Default', price: 899, cmp: 1299, stock: 67 }],
    },
    {
      name: 'Remote Control Racing Car',           cat: 'Toys & Games',       brand: 'Funskool',
      price: 1599,  cmp: 2199,  age: '3-7 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['rc-car','racing','remote-control','boys'],
      desc: 'High-speed remote control racing car with 360° spinning and LED lights. Can run on all surfaces.',
      attrs: [{ name: 'Speed', value: '15 km/h' }, { name: 'Battery', value: 'AA x4 (included)' }, { name: 'Range', value: '30 metres' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
      variants: [
        { name: 'Red', price: 1599, cmp: 2199, stock: 42 },
        { name: 'Blue', price: 1599, cmp: 2199, stock: 38 },
      ],
    },
    {
      name: 'Lego Duplo Classic Brick Box',        cat: 'Toys & Games',       brand: 'Lego',
      price: 3499,  cmp: 4499,  age: '1-5 years',    featured: true,  bestseller: true,  isNew: false,
      tags: ['lego','duplo','bricks','creative'],
      desc: 'Classic LEGO DUPLO 85-piece set. Safe large bricks designed for little hands. Perfect first building toy.',
      attrs: [{ name: 'Pieces', value: '85' }, { name: 'Age', value: '18 months+' }, { name: 'BIS', value: 'Certified' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
      variants: [{ name: 'Default', price: 3499, cmp: 4499, stock: 28 }],
    },
    {
      name: 'Musical Baby Piano Keyboard',         cat: 'Toys & Games',       brand: 'Fisher-Price',
      price: 1199,  cmp: 1699,  age: '6-18 months',  featured: true,  bestseller: false, isNew: true,
      tags: ['musical','piano','learning','sound'],
      desc: '8-key baby piano with 3 play modes — music, animal sounds, and piano. Lights up to encourage play.',
      attrs: [{ name: 'Keys', value: '8' }, { name: 'Modes', value: '3' }, { name: 'Battery', value: 'AA x2' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [{ name: 'Default', price: 1199, cmp: 1699, stock: 54 }],
    },
    {
      name: 'Pretend Play Kitchen Set',            cat: 'Toys & Games',       brand: 'Funskool',
      price: 2499,  cmp: 3499,  age: '3-7 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['kitchen','pretend-play','cooking','girls'],
      desc: '40-piece pretend kitchen set with stove, oven, and all kitchen accessories. Sparks creativity and imagination.',
      attrs: [{ name: 'Pieces', value: '40' }, { name: 'Material', value: 'ABS Plastic' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [{ name: 'Default', price: 2499, cmp: 3499, stock: 33 }],
    },

    // ── Feeding Essentials ──────────────────────────────────────────
    {
      name: 'Anti-Colic Baby Feeding Bottle Set',  cat: 'Feeding Essentials', brand: 'Pigeon',
      price: 899,   cmp: 1199,  age: '0-6 months',   featured: false, bestseller: true,  isNew: false,
      tags: ['feeding','bottle','anti-colic','BPA-free'],
      desc: 'Set of 3 BPA-free anti-colic feeding bottles with slow-flow nipples. Reduces gas and bloating in newborns.',
      attrs: [{ name: 'Capacity', value: '120ml / 240ml' }, { name: 'Material', value: 'PPSU BPA-Free' }, { name: 'Set of', value: '3 bottles' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Pack of 3', price: 899, cmp: 1199, stock: 88 }],
    },
    {
      name: 'Baby Silicone Feeding Spoon Set',     cat: 'Feeding Essentials', brand: 'Mee Mee',
      price: 349,   cmp: 499,   age: '4-12 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['spoon','silicone','feeding','self-feeding'],
      desc: 'Set of 4 soft silicone spoons — ideal for baby-led weaning. Heat-sensitive, turns white when food is too hot.',
      attrs: [{ name: 'Material', value: 'Food-grade Silicone' }, { name: 'Set of', value: '4 spoons' }, { name: 'Heat indicator', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 349, cmp: 499, stock: 120 }],
    },
    {
      name: 'Electric Baby Food Steamer & Blender', cat: 'Feeding Essentials', brand: 'Chicco',
      price: 4999,  cmp: 6999,  age: '4-12 months',  featured: true,  bestseller: false, isNew: true,
      tags: ['steamer','blender','baby-food','electric'],
      desc: '2-in-1 baby food maker. Steam and blend fruits, vegetables, and meat in one bowl. BPA-free, easy to clean.',
      attrs: [{ name: 'Capacity', value: '800ml' }, { name: 'Power', value: '600W' }, { name: 'Material', value: 'BPA-Free' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 4999, cmp: 6999, stock: 20 }],
    },
    {
      name: 'Insulated Baby Lunch Box Set',        cat: 'Feeding Essentials', brand: 'LittleNest Originals',
      price: 799,   cmp: 1099,  age: '1-5 years',    featured: false, bestseller: false, isNew: true,
      tags: ['lunchbox','tiffin','insulated','school'],
      desc: 'Double-wall insulated stainless steel lunch box. Keeps food warm for 4 hours. Leak-proof with clip-lock lid.',
      attrs: [{ name: 'Material', value: 'Stainless Steel' }, { name: 'Compartments', value: '3' }, { name: 'Insulation', value: '4 hours warm' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 799, cmp: 1099, stock: 65 }],
    },

    // ── Diapers & Wipes ─────────────────────────────────────────────
    {
      name: 'Premium Baby Diaper Pants (Pack 60)', cat: 'Diapers & Wipes',    brand: 'Babyhug',
      price: 799,   cmp: 999,   age: '6-12 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['diapers','pants','soft','leak-proof'],
      desc: '12-hour leak protection with 3D leak guards. Super-soft cottony top sheet. Quick-dry technology.',
      attrs: [{ name: 'Count', value: '60 pants' }, { name: 'Size', value: 'M (6-11 kg)' }, { name: 'Absorption', value: '12 hours' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'],
      variants: [
        { name: 'Size S (4-8 kg)',  price: 749, cmp: 949,  stock: 75 },
        { name: 'Size M (6-11 kg)', price: 799, cmp: 999,  stock: 90 },
        { name: 'Size L (9-14 kg)', price: 849, cmp: 1049, stock: 68 },
        { name: 'Size XL (12+ kg)', price: 899, cmp: 1099, stock: 50 },
      ],
    },
    {
      name: 'Water Baby Wipes (Pack of 6)',         cat: 'Diapers & Wipes',    brand: 'Mee Mee',
      price: 449,   cmp: 599,   age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['wipes','water-wipes','gentle','fragrance-free'],
      desc: '99% pure water wipes. Fragrance-free, alcohol-free, suitable for sensitive newborn skin.',
      attrs: [{ name: 'Count', value: '6 packs × 72 wipes' }, { name: 'Fragrance', value: 'Free' }, { name: 'pH', value: 'Balanced' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'],
      variants: [{ name: 'Pack of 6', price: 449, cmp: 599, stock: 200 }],
    },

    // ── Bath & Skin Care ────────────────────────────────────────────
    {
      name: 'Baby Skincare Combo Pack',            cat: 'Bath & Skin Care',   brand: "Johnson's Baby",
      price: 1099,  cmp: 1499,  age: '0-3 years',    featured: true,  bestseller: false, isNew: true,
      tags: ['skincare','lotion','shampoo','natural'],
      desc: 'Complete baby skincare kit: shampoo, lotion, wash, and baby powder. Clinically tested, paediatrician approved.',
      attrs: [{ name: 'Items', value: 'Shampoo + Lotion + Wash + Powder' }, { name: 'Paraben-free', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 1099, cmp: 1499, stock: 58 }],
    },
    {
      name: 'Himalaya Baby Massage Oil',           cat: 'Bath & Skin Care',   brand: 'Himalaya Baby',
      price: 299,   cmp: 399,   age: '0-2 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['massage','oil','ayurvedic','natural'],
      desc: 'Ayurvedic olive and country mallow baby massage oil. Strengthens bones and nourishes skin.',
      attrs: [{ name: 'Volume', value: '200ml' }, { name: 'Key Ingredients', value: 'Olive + Country Mallow' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [
        { name: '100ml', price: 199, cmp: 249, stock: 130 },
        { name: '200ml', price: 299, cmp: 399, stock: 95 },
      ],
    },
    {
      name: 'Baby Bath Tub with Temperature Gauge', cat: 'Bath & Skin Care',  brand: 'Mee Mee',
      price: 1299,  cmp: 1799,  age: '0-12 months',  featured: false, bestseller: false, isNew: false,
      tags: ['bathtub','bath','temperature','safety'],
      desc: 'Ergonomic baby bath tub with built-in temperature gauge. Non-slip surface and drain plug for convenience.',
      attrs: [{ name: 'Material', value: 'BPA-Free Plastic' }, { name: 'Capacity', value: '18 litres' }, { name: 'Temperature gauge', value: 'Built-in' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 1299, cmp: 1799, stock: 35 }],
    },

    // ── Baby Gear ───────────────────────────────────────────────────
    {
      name: 'Lightweight Baby Stroller',           cat: 'Baby Gear',          brand: 'Chicco',
      price: 12999, cmp: 17999, age: '0-3 years',    featured: true,  bestseller: false, isNew: false,
      tags: ['stroller','pram','travel','foldable'],
      desc: 'Ultra-lightweight aluminium stroller (6.2 kg). One-hand fold, multi-position recline, sun canopy, and storage basket.',
      attrs: [{ name: 'Weight', value: '6.2 kg' }, { name: 'Max load', value: '22 kg' }, { name: 'Fold', value: 'One-hand compact' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [
        { name: 'Grey', price: 12999, cmp: 17999, stock: 12 },
        { name: 'Navy', price: 13499, cmp: 18499, stock: 10 },
      ],
    },
    {
      name: 'Baby Carrier Ergonomic Wrap',         cat: 'Baby Gear',          brand: 'LittleNest Originals',
      price: 2499,  cmp: 3499,  age: '0-2 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['carrier','wrap','ergonomic','babywearing'],
      desc: 'Ergonomic baby carrier with lumbar support. 4 carry positions. Breathable 3D mesh fabric. Hip-healthy design.',
      attrs: [{ name: 'Max weight', value: '20 kg' }, { name: 'Carry positions', value: '4' }, { name: 'Material', value: '3D Mesh' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [
        { name: 'Grey', price: 2499, cmp: 3499, stock: 45 },
        { name: 'Navy', price: 2499, cmp: 3499, stock: 38 },
        { name: 'Olive', price: 2499, cmp: 3499, stock: 30 },
      ],
    },
    {
      name: 'Baby Monitor with Night Vision',      cat: 'Baby Gear',          brand: 'Motorola',
      price: 7999,  cmp: 10999, age: '0-3 years',    featured: true,  bestseller: false, isNew: true,
      tags: ['monitor','baby-monitor','night-vision','wifi'],
      desc: 'Wi-Fi video baby monitor with 1080p HD camera, night vision, two-way audio, and temperature alert.',
      attrs: [{ name: 'Resolution', value: '1080p HD' }, { name: 'Range', value: 'Wi-Fi unlimited' }, { name: 'Battery', value: '10 hours' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'],
      variants: [{ name: 'Default', price: 7999, cmp: 10999, stock: 18 }],
    },

    // ── School Essentials ───────────────────────────────────────────
    {
      name: 'Kids School Backpack (Dino)',          cat: 'School Essentials',  brand: 'LittleNest Originals',
      price: 1499,  cmp: 1999,  age: '3-8 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['backpack','school','dino','waterproof'],
      desc: 'Ergonomic school backpack with padded shoulder straps and back panel. Waterproof outer, multiple compartments.',
      attrs: [{ name: 'Capacity', value: '15 litres' }, { name: 'Material', value: 'Waterproof Polyester' }, { name: 'Compartments', value: '3' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [
        { name: 'Dino Green', price: 1499, cmp: 1999, stock: 55 },
        { name: 'Space Blue', price: 1499, cmp: 1999, stock: 48 },
        { name: 'Pink Unicorn', price: 1499, cmp: 1999, stock: 60 },
      ],
    },
    {
      name: 'Geometric Maths Learning Kit',        cat: 'School Essentials',  brand: 'Funskool',
      price: 699,   cmp: 999,   age: '5-8 years',    featured: false, bestseller: false, isNew: false,
      tags: ['maths','geometry','educational','stem'],
      desc: '100-piece geometry and maths learning kit. Includes compass, protractor, shapes, fraction discs.',
      attrs: [{ name: 'Pieces', value: '100' }, { name: 'Age', value: '5-8 years' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [{ name: 'Default', price: 699, cmp: 999, stock: 80 }],
    },
    {
      name: 'Watercolour & Sketch Art Kit',        cat: 'School Essentials',  brand: 'LittleNest Originals',
      price: 899,   cmp: 1299,  age: '4-10 years',   featured: false, bestseller: true,  isNew: true,
      tags: ['art','watercolour','sketch','creativity'],
      desc: '80-piece art kit with watercolours, coloured pencils, sketch book, and brushes. Non-toxic, washable colours.',
      attrs: [{ name: 'Pieces', value: '80' }, { name: 'Non-toxic', value: 'Yes' }, { name: 'Includes', value: 'Sketchbook + Colours + Brushes' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [{ name: 'Default', price: 899, cmp: 1299, stock: 70 }],
    },

    // ── Nursery ─────────────────────────────────────────────────────
    {
      name: 'Wooden Baby Crib with Storage',       cat: 'Nursery',            brand: 'Mothercare',
      price: 14999, cmp: 19999, age: '0-3 years',    featured: true,  bestseller: false, isNew: false,
      tags: ['crib','nursery','wooden','storage'],
      desc: 'Solid pinewood baby crib with adjustable mattress height (3 positions) and 2 under-crib storage drawers.',
      attrs: [{ name: 'Material', value: 'Solid Pinewood' }, { name: 'Mattress heights', value: '3 positions' }, { name: 'Max weight', value: '15 kg' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'],
      variants: [
        { name: 'Natural Oak', price: 14999, cmp: 19999, stock: 8 },
        { name: 'White',       price: 15999, cmp: 20999, stock: 6 },
      ],
    },
    {
      name: 'Blackout Nursery Curtains (Pair)',     cat: 'Nursery',            brand: 'LittleNest Originals',
      price: 1799,  cmp: 2499,  age: '0-5 years',    featured: false, bestseller: false, isNew: true,
      tags: ['curtains','blackout','nursery','sleep'],
      desc: 'Thermal blackout curtains that block 99% light. Machine washable. Suitable for 5ft windows.',
      attrs: [{ name: 'Size', value: '132×213 cm' }, { name: 'Light block', value: '99%' }, { name: 'Pair', value: 'Yes (2 panels)' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'],
      variants: [
        { name: 'Grey', price: 1799, cmp: 2499, stock: 40 },
        { name: 'Blush Pink', price: 1799, cmp: 2499, stock: 35 },
        { name: 'Mint Green', price: 1799, cmp: 2499, stock: 28 },
      ],
    },

    // ── Footwear ────────────────────────────────────────────────────
    {
      name: 'Baby Pre-Walker Shoes',               cat: 'Footwear',           brand: 'LittleNest Originals',
      price: 699,   cmp: 999,   age: '6-18 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['shoes','pre-walker','soft-sole','newborn'],
      desc: 'Soft leather pre-walker shoes with non-slip sole. Velcro strap for easy fitting. Supports natural foot development.',
      attrs: [{ name: 'Material', value: 'Genuine Leather' }, { name: 'Sole', value: 'Non-slip rubber' }, { name: 'Closure', value: 'Velcro' }],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
      variants: [
        { name: 'Size 1 (0-3M)', price: 699, cmp: 999, stock: 50 },
        { name: 'Size 2 (3-6M)', price: 699, cmp: 999, stock: 45 },
        { name: 'Size 3 (6-9M)', price: 749, cmp: 1049, stock: 40 },
      ],
    },
    {
      name: 'Kids Sports Sneakers',                cat: 'Footwear',           brand: 'Mothercare',
      price: 1299,  cmp: 1799,  age: '3-7 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['sneakers','sports','kids','lightweight'],
      desc: 'Lightweight mesh sneakers with memory foam insole. Velcro strap for easy on/off. Machine washable.',
      attrs: [{ name: 'Material', value: 'Breathable Mesh' }, { name: 'Insole', value: 'Memory Foam' }, { name: 'Closure', value: 'Velcro' }],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
      variants: [
        { name: 'Size 5 (18-24M)', price: 1299, cmp: 1799, stock: 35 },
        { name: 'Size 6 (2-3 Yr)', price: 1299, cmp: 1799, stock: 40 },
        { name: 'Size 7 (3-4 Yr)', price: 1399, cmp: 1899, stock: 32 },
        { name: 'Size 8 (4-5 Yr)', price: 1399, cmp: 1899, stock: 28 },
      ],
    },

    // ── Books ───────────────────────────────────────────────────────
    {
      name: 'Touchy-Feely Baby Board Books Set',   cat: 'Books',              brand: 'LittleNest Originals',
      price: 799,   cmp: 1099,  age: '0-2 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['board-books','touchy-feely','sensory','babies'],
      desc: 'Set of 5 touchy-feely board books for sensory development. Thick pages, bright colours, safe for babies.',
      attrs: [{ name: 'Set of', value: '5 books' }, { name: 'Pages', value: '12 per book' }, { name: 'Language', value: 'English' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [{ name: 'Set of 5', price: 799, cmp: 1099, stock: 95 }],
    },
    {
      name: 'Amar Chitra Katha Mythology Pack',    cat: 'Books',              brand: 'Funskool',
      price: 999,   cmp: 1499,  age: '5-12 years',   featured: false, bestseller: false, isNew: false,
      tags: ['mythology','comics','amar-chitra','india'],
      desc: 'Set of 10 classic Amar Chitra Katha comics. Indian mythology and history made fun for kids.',
      attrs: [{ name: 'Set of', value: '10 books' }, { name: 'Language', value: 'English & Hindi' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
      variants: [{ name: 'Pack of 10', price: 999, cmp: 1499, stock: 70 }],
    },

    // ── Maternity ───────────────────────────────────────────────────
    {
      name: 'Maternity Support Pillow (C-shape)',  cat: 'Maternity',          brand: 'Mothercare',
      price: 1999,  cmp: 2999,  age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['maternity','pillow','pregnancy','support'],
      desc: 'C-shaped full-body maternity pillow. Provides back, hip, knee, and belly support during pregnancy and nursing.',
      attrs: [{ name: 'Shape', value: 'C-Shape' }, { name: 'Fill', value: 'Hollow fibre' }, { name: 'Cover', value: 'Removable & washable' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'],
      variants: [
        { name: 'Grey', price: 1999, cmp: 2999, stock: 30 },
        { name: 'Blue', price: 1999, cmp: 2999, stock: 25 },
      ],
    },
    {
      name: 'Nursing Bra Set (Pack of 3)',          cat: 'Maternity',          brand: 'LittleNest Originals',
      price: 1299,  cmp: 1799,  age: '0-3 years',    featured: false, bestseller: false, isNew: true,
      tags: ['nursing-bra','maternity','breastfeeding','comfort'],
      desc: 'Pack of 3 seamless nursing bras with easy one-hand clasp. Soft cotton, full support, available in S/M/L/XL.',
      attrs: [{ name: 'Set of', value: '3 bras' }, { name: 'Material', value: '95% Cotton' }, { name: 'Clasp', value: 'One-hand easy' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'],
      variants: [
        { name: 'S', price: 1299, cmp: 1799, stock: 40 },
        { name: 'M', price: 1299, cmp: 1799, stock: 55 },
        { name: 'L', price: 1299, cmp: 1799, stock: 48 },
        { name: 'XL', price: 1299, cmp: 1799, stock: 30 },
      ],
    },

    // ── Health & Safety ─────────────────────────────────────────────
    {
      name: 'Digital Baby Thermometer',            cat: 'Health & Safety',    brand: 'Mee Mee',
      price: 599,   cmp: 899,   age: '0-5 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['thermometer','digital','health','safety'],
      desc: 'Multi-use digital thermometer. Reads temperature in 10 seconds. Can be used orally, rectally or under armpit.',
      attrs: [{ name: 'Reading time', value: '10 seconds' }, { name: 'Memory', value: 'Last 10 readings' }, { name: 'Battery', value: 'LR41 included' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 599, cmp: 899, stock: 85 }],
    },
    {
      name: 'Baby Safety Electrical Socket Covers (12pcs)', cat: 'Health & Safety', brand: 'LittleNest Originals',
      price: 299,   cmp: 449,   age: '0-5 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['safety','socket-cover','childproofing','electrical'],
      desc: 'Pack of 12 electrical socket safety covers. Easy for adults, impossible for little fingers. Flame-retardant ABS plastic.',
      attrs: [{ name: 'Count', value: '12 pieces' }, { name: 'Material', value: 'Flame-retardant ABS' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Pack of 12', price: 299, cmp: 449, stock: 150 }],
    },
    {
      name: 'Baby Nasal Aspirator Electric',       cat: 'Health & Safety',    brand: 'Pigeon',
      price: 1499,  cmp: 1999,  age: '0-3 years',    featured: false, bestseller: false, isNew: true,
      tags: ['nasal-aspirator','snot-sucker','cold','health'],
      desc: 'Electric nasal aspirator with 3 suction levels. Soft silicone tip, easy to clean, whisper-quiet motor.',
      attrs: [{ name: 'Suction levels', value: '3' }, { name: 'Noise level', value: '<40dB' }, { name: 'USB rechargeable', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 1499, cmp: 1999, stock: 42 }],
    },

    // ── Additional popular products ──────────────────────────────────
    // ── Baby Clothing (extra) ────────────────────────────────────────
    {
      name: 'Organic Zip-Up Baby Sleepsuit',        cat: 'Baby Clothing',      brand: 'LittleNest Originals',
      price: 749,   cmp: 1099,  age: '0-9 months',   featured: true,  bestseller: true,  isNew: true,
      tags: ['sleepsuit','zip','organic','newborn','night'],
      desc: 'Full-zip organic cotton sleepsuit with built-in scratch mitts. Two-way zip for night feeds. Keeps baby snug all night.',
      attrs: [{ name: 'Material', value: '100% Organic Cotton' }, { name: 'Zip', value: 'Two-way anti-snag' }, { name: 'Scratch mitts', value: 'Built-in' }],
      images: [
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80',
        'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
      ],
      variants: [
        { name: 'New Born (0-3M)', price: 749, cmp: 1099, stock: 70 },
        { name: '3-6 Months',      price: 799, cmp: 1149, stock: 55 },
        { name: '6-9 Months',      price: 849, cmp: 1199, stock: 40 },
      ],
    },
    {
      name: 'Rainbow Stripe Baby Pyjama Set',       cat: 'Baby Clothing',      brand: 'Babyhug',
      price: 599,   cmp: 849,   age: '6-24 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['pyjama','stripe','cotton','set','night'],
      desc: 'Soft cotton pyjama top and bottom set with rainbow stripes. Ribbed cuffs for a snug fit. Machine washable.',
      attrs: [{ name: 'Material', value: '100% Combed Cotton' }, { name: 'Includes', value: 'Top + Pant' }],
      images: [
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80',
      ],
      variants: [
        { name: '6-12 Months', price: 599, cmp: 849, stock: 60 },
        { name: '1-1.5 Years', price: 649, cmp: 899, stock: 50 },
        { name: '1.5-2 Years', price: 699, cmp: 949, stock: 42 },
      ],
    },
    {
      name: 'Baby Hooded Towel & Washcloth Set',    cat: 'Baby Clothing',      brand: 'Mee Mee',
      price: 899,   cmp: 1299,  age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['towel','hooded','bath','washcloth','soft'],
      desc: 'Ultra-soft bamboo hooded bath towel with 4 washcloths. Hypoallergenic, highly absorbent, and gets softer after every wash.',
      attrs: [{ name: 'Material', value: '70% Bamboo, 30% Cotton' }, { name: 'Set includes', value: '1 Towel + 4 Washcloths' }],
      images: [
        'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
      ],
      variants: [{ name: 'Default', price: 899, cmp: 1299, stock: 75 }],
    },
    {
      name: 'Unisex Baby Gift Set (5-Piece)',        cat: 'Baby Clothing',      brand: 'LittleNest Originals',
      price: 1999,  cmp: 2999,  age: '0-6 months',   featured: true,  bestseller: true,  isNew: true,
      tags: ['gift-set','newborn','onesie','beanie','mittens'],
      desc: 'Perfect newborn gift box — includes bodysuit, pyjama set, beanie, mittens, and muslin cloth. All in 100% organic cotton.',
      attrs: [{ name: 'Pieces', value: '5' }, { name: 'Material', value: 'Organic Cotton' }, { name: 'Gift box', value: 'Yes' }],
      images: [
        'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80',
      ],
      variants: [
        { name: 'New Born (0-3M)', price: 1999, cmp: 2999, stock: 45 },
        { name: '3-6 Months',      price: 2099, cmp: 3099, stock: 35 },
      ],
    },

    // ── Kids Fashion (extra) ─────────────────────────────────────────
    {
      name: 'Kids Denim Dungaree Set',              cat: 'Kids Fashion',       brand: 'Babyhug',
      price: 1499,  cmp: 1999,  age: '1-5 years',    featured: true,  bestseller: true,  isNew: true,
      tags: ['dungaree','denim','kids','casual'],
      desc: 'Stylish stretch-denim dungaree with adjustable straps and a matching full-sleeve T-shirt. Multiple pockets.',
      attrs: [{ name: 'Material', value: 'Stretch Denim' }, { name: 'Includes', value: 'Dungaree + T-Shirt' }],
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      ],
      variants: [
        { name: '1-2 Years', price: 1499, cmp: 1999, stock: 42 },
        { name: '2-3 Years', price: 1599, cmp: 2099, stock: 38 },
        { name: '3-4 Years', price: 1699, cmp: 2199, stock: 30 },
        { name: '4-5 Years', price: 1799, cmp: 2299, stock: 25 },
      ],
    },
    {
      name: 'Girls Tutu Party Dress',               cat: 'Kids Fashion',       brand: 'LittleNest Originals',
      price: 1299,  cmp: 1899,  age: '1-5 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['dress','tutu','party','girls','birthday'],
      desc: 'Layered tulle tutu dress with sparkle bodice. Perfect for birthday parties and special occasions.',
      attrs: [{ name: 'Material', value: 'Tulle + Cotton Lining' }, { name: 'Occasion', value: 'Party / Birthday' }],
      images: [
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
      ],
      variants: [
        { name: '1-2 Years (Pink)',   price: 1299, cmp: 1899, stock: 35 },
        { name: '2-3 Years (Pink)',   price: 1349, cmp: 1949, stock: 30 },
        { name: '1-2 Years (Purple)', price: 1299, cmp: 1899, stock: 28 },
        { name: '2-3 Years (Purple)', price: 1349, cmp: 1949, stock: 25 },
      ],
    },

    // ── Toys & Games (extra) ─────────────────────────────────────────
    {
      name: 'Soft Plush Teddy Bear (45cm)',         cat: 'Toys & Games',       brand: 'LittleNest Originals',
      price: 699,   cmp: 999,   age: '0-5 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['teddy','plush','soft-toy','gift'],
      desc: 'Super-soft plush teddy bear with embroidered features. Hypoallergenic fill, machine washable.',
      attrs: [{ name: 'Height', value: '45 cm' }, { name: 'Fill', value: 'Hypoallergenic' }, { name: 'Washable', value: 'Machine safe' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
      variants: [
        { name: 'Brown', price: 699, cmp: 999, stock: 80 },
        { name: 'White', price: 699, cmp: 999, stock: 65 },
        { name: 'Pink',  price: 699, cmp: 999, stock: 70 },
      ],
    },
    {
      name: 'Stacking & Nesting Rainbow Cups',      cat: 'Toys & Games',       brand: 'Fisher-Price',
      price: 499,   cmp: 749,   age: '6-24 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['stacking','nesting','cups','sensory'],
      desc: '10 rainbow-coloured nesting cups for stacking, sorting, and bath play. BPA-free, mould-resistant.',
      attrs: [{ name: 'Pieces', value: '10 cups' }, { name: 'Material', value: 'BPA-Free PP' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
      variants: [{ name: 'Default', price: 499, cmp: 749, stock: 110 }],
    },
    {
      name: 'Nuby Silicone Teether Keys',           cat: 'Feeding Essentials', brand: 'Nuby',
      price: 349,   cmp: 499,   age: '3-12 months',  featured: false, bestseller: false, isNew: true,
      tags: ['teether','silicone','soothing','BPA-free'],
      desc: 'Colourful silicone teether keys with varied textures for sore gums. Easy to hold, sterilizer-safe.',
      attrs: [{ name: 'Material', value: 'Food-grade Silicone' }, { name: 'BPA-free', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
      variants: [{ name: 'Default', price: 349, cmp: 499, stock: 95 }],
    },
    {
      name: 'Baby Sleep Sound Machine',             cat: 'Health & Safety',    brand: 'LittleNest Originals',
      price: 1999,  cmp: 2799,  age: '0-5 years',    featured: true,  bestseller: true,  isNew: true,
      tags: ['sleep','white-noise','sound-machine','nursery'],
      desc: '30 soothing sounds including white noise, lullabies, and nature sounds. Timer, night light, and USB powered.',
      attrs: [{ name: 'Sounds', value: '30' }, { name: 'Night light', value: 'Yes (warm amber)' }, { name: 'Timer', value: '30/60/90 min' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600'],
      variants: [{ name: 'Default', price: 1999, cmp: 2799, stock: 55 }],
    },
    {
      name: 'Foldable Baby Play Mat (XL)',          cat: 'Nursery',            brand: 'LittleNest Originals',
      price: 2499,  cmp: 3499,  age: '0-3 years',    featured: true,  bestseller: false, isNew: true,
      tags: ['play-mat','foam','nursery','tummy-time'],
      desc: 'XL double-sided foam play mat (180×200 cm). Non-toxic, waterproof, easy to clean. Folds for storage.',
      attrs: [{ name: 'Size', value: '180×200 cm' }, { name: 'Thickness', value: '1.5 cm' }, { name: 'Material', value: 'XPE Foam' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80'],
      variants: [
        { name: 'Pastel Animals', price: 2499, cmp: 3499, stock: 40 },
        { name: 'Ocean Blue',     price: 2499, cmp: 3499, stock: 35 },
      ],
    },

    // ── Toys & Games (more) ──────────────────────────────────────────
    {
      name: 'Baby Activity Gym & Play Mat',         cat: 'Toys & Games',       brand: 'Fisher-Price',
      price: 2999,  cmp: 4299,  age: '0-12 months',  featured: true,  bestseller: true,  isNew: false,
      tags: ['activity-gym','play-mat','sensory','tummy-time','hanging-toys'],
      desc: 'Foldable activity gym with 5 hanging toys, crinkle mirror, and music. Stimulates all 5 senses. Easy to fold and carry.',
      attrs: [{ name: 'Hanging toys', value: '5' }, { name: 'Music', value: 'Yes (3 melodies)' }, { name: 'Foldable', value: 'Yes' }],
      images: [
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      ],
      variants: [{ name: 'Default', price: 2999, cmp: 4299, stock: 38 }],
    },
    {
      name: 'Magnetic Drawing Board for Kids',      cat: 'Toys & Games',       brand: 'Funskool',
      price: 599,   cmp: 899,   age: '2-8 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['drawing-board','magnetic','doodle','mess-free','art'],
      desc: 'Mess-free magnetic drawing board with stampers and stencils. One swipe to erase. Perfect for car journeys.',
      attrs: [{ name: 'Screen size', value: '10 inch' }, { name: 'Accessories', value: 'Stamps + Stencils' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
      variants: [
        { name: 'Blue', price: 599, cmp: 899, stock: 90 },
        { name: 'Pink', price: 599, cmp: 899, stock: 80 },
      ],
    },
    {
      name: 'Wooden Alphabet Puzzle Board',         cat: 'Toys & Games',       brand: 'LittleNest Originals',
      price: 799,   cmp: 1199,  age: '2-5 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['puzzle','alphabet','wooden','educational','montessori'],
      desc: '26-piece wooden alphabet puzzle with chunky knobs. Each letter has a matching picture. Non-toxic paint.',
      attrs: [{ name: 'Pieces', value: '26 letters' }, { name: 'Material', value: 'Solid Wood' }, { name: 'Paint', value: 'Non-toxic' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'],
      variants: [{ name: 'Default', price: 799, cmp: 1199, stock: 65 }],
    },
    {
      name: 'Kids Outdoor Ride-On Tricycle',        cat: 'Toys & Games',       brand: 'Fisher-Price',
      price: 3999,  cmp: 5499,  age: '1-3 years',    featured: true,  bestseller: false, isNew: true,
      tags: ['tricycle','ride-on','outdoor','balance','kids'],
      desc: 'Sturdy steel-frame tricycle with parent push handle, canopy, and snack tray. Adjustable seat grows with your child.',
      attrs: [{ name: 'Frame', value: 'Steel' }, { name: 'Max weight', value: '25 kg' }, { name: 'Parent handle', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
      variants: [
        { name: 'Red', price: 3999, cmp: 5499, stock: 20 },
        { name: 'Blue', price: 3999, cmp: 5499, stock: 18 },
        { name: 'Pink', price: 3999, cmp: 5499, stock: 15 },
      ],
    },
    {
      name: 'Sensory Ball Set (6 Balls)',            cat: 'Toys & Games',       brand: 'Mee Mee',
      price: 699,   cmp: 999,   age: '3-24 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['sensory','ball','texture','infant','grip'],
      desc: 'Set of 6 textured sensory balls in different sizes and textures. Develops grip, tactile sense, and hand-eye coordination.',
      attrs: [{ name: 'Set of', value: '6 balls' }, { name: 'Material', value: 'BPA-Free Rubber' }],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
      variants: [{ name: 'Default', price: 699, cmp: 999, stock: 85 }],
    },

    // ── Feeding Essentials (more) ────────────────────────────────────
    {
      name: 'Bamboo Baby Feeding Bowl & Spoon Set', cat: 'Feeding Essentials', brand: 'LittleNest Originals',
      price: 699,   cmp: 999,   age: '4-36 months',  featured: false, bestseller: true,  isNew: true,
      tags: ['bowl','spoon','bamboo','eco','feeding'],
      desc: 'Eco-friendly bamboo fibre feeding set — 2 bowls, 2 plates, and 2 spoons. Dishwasher safe, BPA-free, and won\'t stain.',
      attrs: [{ name: 'Material', value: 'Organic Bamboo Fibre' }, { name: 'Includes', value: '2 Bowls + 2 Plates + 2 Spoons' }, { name: 'Dishwasher safe', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 699, cmp: 999, stock: 88 }],
    },
    {
      name: 'Baby High Chair with Adjustable Tray', cat: 'Feeding Essentials', brand: 'Chicco',
      price: 6999,  cmp: 9999,  age: '6-36 months',  featured: true,  bestseller: false, isNew: false,
      tags: ['high-chair','feeding-chair','adjustable','foldable'],
      desc: '5-position recline, 7-position height-adjustable high chair. One-hand fold. Easy-clean removable tray and cushion.',
      attrs: [{ name: 'Height positions', value: '7' }, { name: 'Recline', value: '5 positions' }, { name: 'Max weight', value: '15 kg' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [
        { name: 'Grey', price: 6999, cmp: 9999, stock: 15 },
        { name: 'Beige', price: 6999, cmp: 9999, stock: 12 },
      ],
    },
    {
      name: 'Breast Pump Electric Single',          cat: 'Feeding Essentials', brand: 'Pigeon',
      price: 3499,  cmp: 4999,  age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['breast-pump','electric','nursing','breastfeeding','mom'],
      desc: 'Hospital-grade single electric breast pump with 9 suction levels and 3 massage modes. Ultra-quiet (<45dB). BPA-free.',
      attrs: [{ name: 'Suction levels', value: '9' }, { name: 'Massage modes', value: '3' }, { name: 'Noise', value: '<45 dB' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 3499, cmp: 4999, stock: 30 }],
    },

    // ── Bath & Skin Care (more) ──────────────────────────────────────
    {
      name: 'Organic Baby Body Wash & Shampoo Duo', cat: 'Bath & Skin Care',   brand: 'LittleNest Originals',
      price: 699,   cmp: 999,   age: '0-3 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['body-wash','shampoo','organic','tear-free','natural'],
      desc: 'Gentle 2-in-1 organic baby wash and shampoo. Tear-free, sulphate-free, and dermatologist tested. Calendula and aloe vera formula.',
      attrs: [{ name: 'Volume', value: '200ml each' }, { name: 'Key ingredients', value: 'Calendula + Aloe Vera' }, { name: 'Sulfate-free', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 699, cmp: 999, stock: 95 }],
    },
    {
      name: 'Baby Nail Care Kit (6-Piece)',          cat: 'Bath & Skin Care',   brand: 'Mee Mee',
      price: 449,   cmp: 649,   age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['nail-care','grooming','scissors','file','newborn'],
      desc: '6-piece baby nail care set — nail scissors, file, clippers, soft brush, comb, and nasal aspirator. Travel pouch included.',
      attrs: [{ name: 'Pieces', value: '6' }, { name: 'Material', value: 'Stainless steel + ABS' }, { name: 'Travel pouch', value: 'Included' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 449, cmp: 649, stock: 110 }],
    },
    {
      name: 'Baby Rash Cream (Pack of 2)',           cat: 'Bath & Skin Care',   brand: 'Himalaya Baby',
      price: 399,   cmp: 549,   age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['rash-cream','diaper-rash','soothing','zinc','ayurvedic'],
      desc: 'Ayurvedic zinc oxide rash cream with aloe vera. Prevents and heals diaper rash. Forms a protective barrier. Fragrance-free.',
      attrs: [{ name: 'Volume', value: '50g each' }, { name: 'Key ingredient', value: 'Zinc Oxide + Aloe Vera' }, { name: 'Fragrance-free', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Pack of 2', price: 399, cmp: 549, stock: 140 }],
    },

    // ── Baby Gear (more) ─────────────────────────────────────────────
    {
      name: 'Portable Baby Booster Seat',           cat: 'Baby Gear',          brand: 'Chicco',
      price: 1999,  cmp: 2999,  age: '6-36 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['booster-seat','portable','travel','chair','foldable'],
      desc: 'Compact portable booster seat that straps securely to any chair. 3-point harness, removable food tray, and foldable legs.',
      attrs: [{ name: 'Max weight', value: '15 kg' }, { name: 'Harness', value: '3-point' }, { name: 'Tray', value: 'Removable' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'],
      variants: [
        { name: 'Grey', price: 1999, cmp: 2999, stock: 40 },
        { name: 'Teal', price: 1999, cmp: 2999, stock: 35 },
      ],
    },
    {
      name: 'Baby Car Seat Group 0+ (0-13 kg)',      cat: 'Baby Gear',          brand: 'Chicco',
      price: 8999,  cmp: 12999, age: '0-15 months',  featured: true,  bestseller: false, isNew: false,
      tags: ['car-seat','infant','safety','travel','ECE-R44'],
      desc: 'Rear-facing infant car seat certified to ECE R44/04. 3-point harness with 5 positions. Compatible with all major strollers.',
      attrs: [{ name: 'Weight range', value: '0-13 kg' }, { name: 'Safety standard', value: 'ECE R44/04' }, { name: 'Stroller compatible', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'],
      variants: [
        { name: 'Black', price: 8999, cmp: 12999, stock: 12 },
        { name: 'Silver', price: 9499, cmp: 13499, stock: 10 },
      ],
    },
    {
      name: 'Baby Diaper Bag Backpack',              cat: 'Baby Gear',          brand: 'LittleNest Originals',
      price: 1999,  cmp: 2999,  age: '0-3 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['diaper-bag','backpack','waterproof','travel','mom-bag'],
      desc: 'Large capacity diaper bag backpack with 13 pockets. Waterproof, includes changing mat, insulated bottle pockets, and stroller straps.',
      attrs: [{ name: 'Pockets', value: '13' }, { name: 'Material', value: 'Waterproof Nylon' }, { name: 'Includes', value: 'Changing mat + Stroller straps' }],
      images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'],
      variants: [
        { name: 'Grey', price: 1999, cmp: 2999, stock: 50 },
        { name: 'Black', price: 1999, cmp: 2999, stock: 45 },
        { name: 'Blush Pink', price: 1999, cmp: 2999, stock: 40 },
      ],
    },

    // ── Nursery (more) ───────────────────────────────────────────────
    {
      name: 'Baby Night Light Projector',            cat: 'Nursery',            brand: 'LittleNest Originals',
      price: 1499,  cmp: 2199,  age: '0-5 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['night-light','projector','stars','nursery','sleep'],
      desc: 'Rotating star and moon projector with 8 colour modes and 3 white noise sounds. Timer function. USB powered.',
      attrs: [{ name: 'Colour modes', value: '8' }, { name: 'Sounds', value: '3 white noise options' }, { name: 'Timer', value: '30/60 min' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80'],
      variants: [{ name: 'Default', price: 1499, cmp: 2199, stock: 60 }],
    },
    {
      name: 'Bamboo Muslin Crib Fitted Sheets Set',  cat: 'Nursery',            brand: 'LittleNest Originals',
      price: 1199,  cmp: 1699,  age: '0-3 years',    featured: false, bestseller: false, isNew: true,
      tags: ['crib-sheet','muslin','bamboo','fitted','soft'],
      desc: 'Set of 3 ultra-soft bamboo muslin fitted crib sheets. Breathable, naturally antibacterial, and temperature-regulating.',
      attrs: [{ name: 'Material', value: '70% Bamboo, 30% Cotton' }, { name: 'Set of', value: '3 sheets' }, { name: 'Size', value: '70×130 cm' }],
      images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80'],
      variants: [
        { name: 'White', price: 1199, cmp: 1699, stock: 50 },
        { name: 'Grey Stars', price: 1199, cmp: 1699, stock: 45 },
        { name: 'Mint', price: 1199, cmp: 1699, stock: 38 },
      ],
    },

    // ── School Essentials (more) ─────────────────────────────────────
    {
      name: 'Kids Insulated Water Bottle (500ml)',   cat: 'School Essentials',  brand: 'LittleNest Originals',
      price: 699,   cmp: 999,   age: '3-12 years',   featured: false, bestseller: true,  isNew: true,
      tags: ['water-bottle','insulated','school','stainless-steel','leak-proof'],
      desc: 'Double-wall insulated stainless steel water bottle. Keeps water cold 12 hours. Leak-proof flip lid with straw.',
      attrs: [{ name: 'Capacity', value: '500ml' }, { name: 'Material', value: 'Stainless Steel' }, { name: 'Insulation', value: '12 hours cold' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'],
      variants: [
        { name: 'Blue Dino', price: 699, cmp: 999, stock: 70 },
        { name: 'Pink Bunny', price: 699, cmp: 999, stock: 65 },
        { name: 'Space Black', price: 699, cmp: 999, stock: 55 },
      ],
    },
    {
      name: 'STEM Science Experiment Kit',           cat: 'School Essentials',  brand: 'Funskool',
      price: 1499,  cmp: 1999,  age: '6-12 years',   featured: true,  bestseller: false, isNew: true,
      tags: ['stem','science','experiment','kit','chemistry'],
      desc: '30 safe science experiments at home — volcanoes, slime, crystals and more. Includes lab manual and safety glasses.',
      attrs: [{ name: 'Experiments', value: '30' }, { name: 'Safety glasses', value: 'Included' }, { name: 'Lab manual', value: 'Yes' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 1499, cmp: 1999, stock: 45 }],
    },
    {
      name: 'Kids Pencil Case with Stationery Set',  cat: 'School Essentials',  brand: 'LittleNest Originals',
      price: 549,   cmp: 799,   age: '3-10 years',   featured: false, bestseller: true,  isNew: false,
      tags: ['pencil-case','stationery','school','pencil','eraser'],
      desc: 'Cute character pencil case with 12 colour pencils, 2 HB pencils, sharpener, eraser, and ruler. Ready-to-use set.',
      attrs: [{ name: 'Includes', value: '12 colour pencils + stationery' }, { name: 'Case material', value: 'Soft EVA' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'],
      variants: [
        { name: 'Dino', price: 549, cmp: 799, stock: 90 },
        { name: 'Unicorn', price: 549, cmp: 799, stock: 85 },
        { name: 'Space', price: 549, cmp: 799, stock: 75 },
      ],
    },

    // ── Health & Safety (more) ───────────────────────────────────────
    {
      name: 'Baby Pulse Oximeter Finger Clip',       cat: 'Health & Safety',    brand: 'Mee Mee',
      price: 1299,  cmp: 1899,  age: '0-5 years',    featured: false, bestseller: false, isNew: true,
      tags: ['oximeter','pulse','health','oxygen','monitor'],
      desc: 'Paediatric fingertip pulse oximeter measures SpO2 and heart rate in 10 seconds. Large colour display. Low battery alarm.',
      attrs: [{ name: 'Reading time', value: '10 seconds' }, { name: 'Display', value: 'OLED Colour' }, { name: 'Battery', value: 'AAA x2' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 1299, cmp: 1899, stock: 40 }],
    },
    {
      name: 'Baby Safety Gate Pressure Mounted',     cat: 'Health & Safety',    brand: 'LittleNest Originals',
      price: 2499,  cmp: 3499,  age: '0-3 years',    featured: false, bestseller: false, isNew: false,
      tags: ['safety-gate','stairgate','childproofing','door','pressure-mount'],
      desc: 'No-drill pressure-mounted safety gate. Fits openings 75–82 cm. Auto-close and one-hand operation. BIS certified steel.',
      attrs: [{ name: 'Width', value: '75-82 cm' }, { name: 'Height', value: '76 cm' }, { name: 'Material', value: 'BIS Certified Steel' }],
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'],
      variants: [
        { name: 'White', price: 2499, cmp: 3499, stock: 28 },
        { name: 'Black', price: 2499, cmp: 3499, stock: 22 },
      ],
    },

    // ── Footwear (more) ──────────────────────────────────────────────
    {
      name: 'Baby Anti-Skid Socks (Pack of 6)',      cat: 'Footwear',           brand: 'Mee Mee',
      price: 349,   cmp: 499,   age: '0-24 months',  featured: false, bestseller: true,  isNew: false,
      tags: ['socks','anti-skid','cotton','grip','newborn'],
      desc: 'Pack of 6 soft cotton socks with non-slip rubber grips. Keeps feet warm while allowing safe movement on smooth floors.',
      attrs: [{ name: 'Set of', value: '6 pairs' }, { name: 'Material', value: '80% Cotton' }, { name: 'Grip', value: 'Non-slip rubber dots' }],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
      variants: [
        { name: '0-6 Months', price: 349, cmp: 499, stock: 120 },
        { name: '6-12 Months', price: 349, cmp: 499, stock: 110 },
        { name: '1-2 Years',  price: 399, cmp: 549, stock: 90 },
      ],
    },
    {
      name: 'Kids Waterproof Rain Boots',            cat: 'Footwear',           brand: 'LittleNest Originals',
      price: 999,   cmp: 1499,  age: '1-6 years',    featured: false, bestseller: false, isNew: true,
      tags: ['rain-boots','wellies','waterproof','kids','monsoon'],
      desc: 'Fun character rain boots with slip-resistant sole. Fully waterproof, easy-pull handles, soft cotton lining.',
      attrs: [{ name: 'Material', value: 'Natural Rubber' }, { name: 'Lining', value: 'Soft Cotton' }, { name: 'Sole', value: 'Anti-slip' }],
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
      variants: [
        { name: 'Size 5 (1-2 Yr) Red Dino', price: 999, cmp: 1499, stock: 35 },
        { name: 'Size 6 (2-3 Yr) Red Dino', price: 999, cmp: 1499, stock: 30 },
        { name: 'Size 7 (3-4 Yr) Blue Frog', price: 1099, cmp: 1599, stock: 28 },
        { name: 'Size 8 (4-5 Yr) Blue Frog', price: 1099, cmp: 1599, stock: 22 },
      ],
    },

    // ── Books (more) ─────────────────────────────────────────────────
    {
      name: 'Baby\'s First Word Flash Cards (100)',  cat: 'Books',              brand: 'LittleNest Originals',
      price: 599,   cmp: 899,   age: '1-4 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['flash-cards','vocabulary','learning','words','early-education'],
      desc: '100 double-sided flash cards covering everyday words, numbers, shapes, colours, and animals. Durable laminated finish.',
      attrs: [{ name: 'Cards', value: '100' }, { name: 'Sides', value: 'Double-sided' }, { name: 'Material', value: 'Laminated cardstock' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 599, cmp: 899, stock: 100 }],
    },
    {
      name: 'Interactive Sound Book for Toddlers',   cat: 'Books',              brand: 'Fisher-Price',
      price: 899,   cmp: 1299,  age: '1-4 years',    featured: false, bestseller: true,  isNew: true,
      tags: ['sound-book','interactive','toddler','learning','phonics'],
      desc: 'Press-and-hear interactive sound book with 20 buttons covering animals, vehicles, numbers, and the alphabet.',
      attrs: [{ name: 'Sound buttons', value: '20' }, { name: 'Topics', value: 'Animals, Vehicles, Numbers, ABC' }, { name: 'Battery', value: 'AA x2 included' }],
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'],
      variants: [{ name: 'Default', price: 899, cmp: 1299, stock: 75 }],
    },

    // ── Maternity (more) ─────────────────────────────────────────────
    {
      name: 'Maternity Leggings (Pack of 2)',        cat: 'Maternity',          brand: 'LittleNest Originals',
      price: 1299,  cmp: 1799,  age: '0-3 years',    featured: false, bestseller: true,  isNew: false,
      tags: ['maternity','leggings','comfortable','belly-support','cotton'],
      desc: 'Ultra-soft fold-over waistband maternity leggings. Grows with your bump. 4-way stretch cotton-spandex blend.',
      attrs: [{ name: 'Set of', value: '2 pairs' }, { name: 'Material', value: '92% Cotton, 8% Spandex' }, { name: 'Waistband', value: 'Fold-over adjustable' }],
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80'],
      variants: [
        { name: 'S (Black + Grey)', price: 1299, cmp: 1799, stock: 40 },
        { name: 'M (Black + Grey)', price: 1299, cmp: 1799, stock: 55 },
        { name: 'L (Black + Grey)', price: 1299, cmp: 1799, stock: 48 },
        { name: 'XL (Black + Grey)', price: 1299, cmp: 1799, stock: 30 },
      ],
    },
  ];

  const createdProducts: any[] = [];
  // Start high enough to avoid conflicts with any previous seed runs
  const lastProduct = await prisma.product.findFirst({ orderBy: { createdAt: 'desc' } });
  const lastSku = lastProduct ? parseInt(lastProduct.sku.replace('LN-', '') || '2000', 10) : 2000;
  let skuCounter = isNaN(lastSku) ? 2000 : Math.max(lastSku, 2000);
  for (const pd of productsData) {
    const productSlug = slug(pd.name);
    const cat   = catMap[pd.cat];
    const brand = brandMap[pd.brand];
    const baseSku = `LN-${++skuCounter}`;

    const existing = await prisma.product.findUnique({ where: { slug: productSlug } });
    if (existing) { createdProducts.push(existing); continue; }

    const product = await prisma.product.create({
      data: {
        name:             pd.name,
        slug:             productSlug,
        sku:              baseSku,
        shortDescription: `Premium quality ${pd.name} for your little one`,
        description:      pd.desc,
        brandId:          brand?.id,
        status:           ProductStatus.ACTIVE,
        isFeatured:       pd.featured,
        isBestseller:     pd.bestseller,
        isNew:            pd.isNew,
        tags:             pd.tags,
        ageGroup:         pd.age,
        metaTitle:        `${pd.name} - Buy Online | LittleNest`,
        metaDesc:         `Shop ${pd.name} at LittleNest. ₹${pd.price} with free delivery above ₹499.`,
        categories: cat ? { create: [{ categoryId: cat.id, isPrimary: true }] } : undefined,
        images: {
          create: pd.images.map((url, i) => ({
            url, altText: pd.name, isPrimary: i === 0, sortOrder: i,
          })),
        },
        attributes: {
          create: (pd.attrs || []).map((a, i) => ({ name: a.name, value: a.value, sortOrder: i })),
        },
        variants: {
          create: pd.variants.map((v, i) => ({
            name:         v.name,
            sku:          `${baseSku}-${i + 1}`,
            price:        v.price,
            comparePrice: v.cmp,
            isDefault:    i === 0,
            attributes:   {},
            inventory: {
              create: { quantity: v.stock, lowStockAlert: 10 },
            },
          })),
        },
      },
      include: { variants: true },
    });
    createdProducts.push(product);
  }
  console.log(`✓  ${createdProducts.length} products`);

  // ══════════════════════════════════════════════════════════════════
  // 5. REVIEWS
  // ══════════════════════════════════════════════════════════════════
  const reviewTexts = [
    { rating: 5, title: 'Absolutely love it!',         body: 'My baby loves this product. Excellent quality and fast delivery. Highly recommend to all parents!' },
    { rating: 5, title: 'Great quality!',              body: 'Very good quality product. Soft, safe and durable. My little one is very happy with it.' },
    { rating: 4, title: 'Good value for money',        body: 'Nice product overall. Packaging could be better but the product itself is great quality.' },
    { rating: 5, title: 'Perfect gift for baby!',      body: 'Bought this as a gift and the parents loved it. Well-made and looks exactly like the pictures.' },
    { rating: 4, title: 'Very happy with purchase',    body: 'Quick delivery and the product is exactly as described. Would definitely buy again.' },
    { rating: 3, title: 'Good but could be better',    body: 'Product is decent but a bit smaller than expected. Still happy with the purchase overall.' },
    { rating: 5, title: 'Excellent product!',          body: 'This is now my go-to brand for baby products. Reliable, safe and great quality every time.' },
    { rating: 4, title: 'Baby approved!',              body: 'My 8-month-old absolutely loves this. She plays with it every day and it has held up really well.' },
    { rating: 5, title: 'Best purchase this month!',   body: 'Exceeded my expectations. The quality is outstanding and delivery was super fast. 10/10!' },
    { rating: 4, title: 'Really good product',         body: 'Very satisfied with the purchase. Material feels premium and safe for baby. Will order again.' },
  ];

  let reviewCount = 0;
  for (let pi = 0; pi < Math.min(createdProducts.length, 25); pi++) {
    const product = createdProducts[pi];
    const numReviews = randInt(2, 5);
    const usedCustomers = new Set<string>();

    for (let ri = 0; ri < numReviews; ri++) {
      const customer = pick(customers);
      if (usedCustomers.has(customer.id)) continue;
      usedCustomers.add(customer.id);

      const rev = pick(reviewTexts);
      try {
        await prisma.review.create({
          data: {
            productId:          product.id,
            userId:             customer.id,
            rating:             rev.rating,
            title:              rev.title,
            body:               rev.body,
            status:             ReviewStatus.APPROVED,
            isVerifiedPurchase: Math.random() > 0.4,
            helpfulCount:       randInt(0, 30),
          },
        });
        reviewCount++;
      } catch {
        // unique constraint — skip duplicate
      }
    }
  }
  console.log(`✓  ${reviewCount} reviews`);

  // ══════════════════════════════════════════════════════════════════
  // 6. ORDERS & PAYMENTS
  // ══════════════════════════════════════════════════════════════════
  const orderStatuses = [
    OrderStatus.DELIVERED,
    OrderStatus.DELIVERED,
    OrderStatus.SHIPPED,
    OrderStatus.CONFIRMED,
    OrderStatus.PENDING,
  ];
  const paymentMethods = [PaymentMethod.RAZORPAY, PaymentMethod.COD, PaymentMethod.UPI];

  let orderCount = 0;
  for (const customer of customers) {
    const numOrders = randInt(1, 3);
    const address = (customer as any).addresses?.[0];
    if (!address) continue;

    for (let oi = 0; oi < numOrders; oi++) {
      const selectedProducts = [
        pick(createdProducts),
        ...(Math.random() > 0.5 ? [pick(createdProducts)] : []),
      ].filter((p, i, a) => a.findIndex(x => x.id === p.id) === i);

      const items = selectedProducts.map((p: any) => {
        const variant = p.variants?.[0];
        const price   = Number(variant?.price || 799);
        const qty     = randInt(1, 2);
        return {
          productId:   p.id,
          variantId:   variant?.id,
          productName: p.name,
          variantName: variant?.name || 'Default',
          sku:         variant?.sku || p.sku,
          price,
          quantity:    qty,
          totalPrice:  price * qty,
        };
      });

      const subtotal       = items.reduce((s, i) => s + i.totalPrice, 0);
      const shippingAmount = subtotal > 499 ? 0 : 49;
      const taxAmount      = Math.round(subtotal * 0.18);
      const totalAmount    = subtotal + shippingAmount + taxAmount;
      const status         = pick(orderStatuses);
      const method         = pick(paymentMethods);
      const daysAgo        = randInt(1, 90);
      const createdAt      = new Date(Date.now() - daysAgo * 86400000);

      const order = await prisma.order.create({
        data: {
          orderNumber:    orderNum(),
          userId:         customer.id,
          addressId:      address.id,
          status,
          subtotal,
          shippingAmount,
          taxAmount,
          totalAmount,
          createdAt,
          updatedAt:      createdAt,
          deliveredAt:    status === OrderStatus.DELIVERED ? new Date(createdAt.getTime() + 5 * 86400000) : undefined,
          items:     { create: items },
          timeline:  {
            create: [
              { status: 'PENDING',   message: 'Order placed successfully',   createdAt },
              ...(status !== 'PENDING' ? [{ status: 'CONFIRMED', message: 'Payment confirmed, order processing', createdAt: new Date(createdAt.getTime() + 3600000) }] : []),
              ...(status === 'SHIPPED' || status === 'DELIVERED' ? [{ status: 'SHIPPED', message: 'Order shipped via Delhivery', createdAt: new Date(createdAt.getTime() + 86400000) }] : []),
              ...(status === 'DELIVERED' ? [{ status: 'DELIVERED', message: 'Order delivered successfully', createdAt: new Date(createdAt.getTime() + 5 * 86400000) }] : []),
            ],
          },
        },
      });

      await prisma.payment.create({
        data: {
          orderId:           order.id,
          method,
          status:            status === OrderStatus.PENDING ? PaymentStatus.PENDING : PaymentStatus.CAPTURED,
          amount:            totalAmount,
          currency:          'INR',
          razorpayOrderId:   method === PaymentMethod.RAZORPAY ? `order_${Math.random().toString(36).substring(2, 15)}` : undefined,
          razorpayPaymentId: method === PaymentMethod.RAZORPAY && status !== OrderStatus.PENDING ? `pay_${Math.random().toString(36).substring(2, 15)}` : undefined,
        },
      });

      orderCount++;
    }
  }
  console.log(`✓  ${orderCount} orders`);

  // ══════════════════════════════════════════════════════════════════
  // 7. WISHLISTS
  // ══════════════════════════════════════════════════════════════════
  let wishlistCount = 0;
  for (const customer of customers) {
    const numWishlist = randInt(2, 6);
    const added = new Set<string>();
    for (let w = 0; w < numWishlist; w++) {
      const product = pick(createdProducts);
      if (added.has(product.id)) continue;
      added.add(product.id);
      try {
        await prisma.wishlist.create({ data: { userId: customer.id, productId: product.id } });
        wishlistCount++;
      } catch {}
    }
  }
  console.log(`✓  ${wishlistCount} wishlist items`);

  // ══════════════════════════════════════════════════════════════════
  // 8. BANNERS
  // ══════════════════════════════════════════════════════════════════
  await prisma.banner.deleteMany({});
  const bannersData = [
    { title: 'Welcome to LittleNest',      subtitle: 'Premium Baby & Kids Products',       image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1400&q=90', link: '/products',                   type: BannerType.HERO,        sortOrder: 1 },
    { title: 'Up to 50% Off on Toys',      subtitle: 'Shop the best toys for your little ones', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90', link: '/category/toys-games',         type: BannerType.HERO,        sortOrder: 2 },
    { title: 'New Arrivals: Baby Clothing', subtitle: 'Organic & comfortable',             image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1400&q=90', link: '/products?isNew=true',          type: BannerType.HERO,        sortOrder: 3 },
    { title: 'Nursery Collection',          subtitle: 'Create the perfect space',          image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&q=90', link: '/category/nursery',             type: BannerType.PROMOTIONAL, sortOrder: 1 },
    { title: 'Back to School Sale',         subtitle: 'Backpacks, stationery & more',      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=90', link: '/category/school-essentials',  type: BannerType.PROMOTIONAL, sortOrder: 2 },
    { title: 'Free Delivery Above ₹499',    subtitle: 'Shop now and save on shipping',     image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=90',  link: '/products',                   type: BannerType.SIDEBAR,     sortOrder: 1 },
  ];
  for (const b of bannersData) {
    await prisma.banner.create({ data: { ...b, isActive: true } });
  }
  console.log(`✓  ${bannersData.length} banners`);

  // ══════════════════════════════════════════════════════════════════
  // 9. COUPONS
  // ══════════════════════════════════════════════════════════════════
  const couponsData = [
    { code: 'WELCOME10', desc: '10% off on first order', type: 'PERCENTAGE', value: 10, max: 200, min: 499, limit: 1000, perUser: 1 },
    { code: 'FLAT100',   desc: '₹100 off above ₹999',   type: 'FLAT',       value: 100, max: null, min: 999, limit: 500,  perUser: 3 },
    { code: 'BABY20',    desc: '20% off on baby clothing', type: 'PERCENTAGE', value: 20, max: 300, min: 699, limit: 200, perUser: 2 },
    { code: 'TOYS15',    desc: '15% off on toys',         type: 'PERCENTAGE', value: 15, max: 250, min: 599, limit: 300, perUser: 2 },
    { code: 'FREESHIP',  desc: 'Free shipping on all orders', type: 'FREE_SHIPPING', value: 49, max: null, min: 199, limit: 1000, perUser: 5 },
    { code: 'FLAT200',   desc: '₹200 off above ₹1999',   type: 'FLAT',       value: 200, max: null, min: 1999, limit: 100, perUser: 1 },
    { code: 'NEWMOM15',  desc: '15% off for new moms',    type: 'PERCENTAGE', value: 15, max: 300, min: 799,  limit: 200, perUser: 1 },
  ];
  for (const c of couponsData) {
    await prisma.coupon.upsert({
      where: { code: c.code }, update: {},
      create: {
        code: c.code, description: c.desc,
        discountType: c.type as any, discountValue: c.value,
        maxDiscountAmount: c.max, minOrderAmount: c.min,
        usageLimit: c.limit, perUserLimit: c.perUser,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 86400000),
      },
    });
  }
  console.log(`✓  ${couponsData.length} coupons`);

  // ══════════════════════════════════════════════════════════════════
  // 10. PINCODE SERVICEABILITY
  // ══════════════════════════════════════════════════════════════════
  const pincodes = [
    { pincode: '560001', city: 'Bengaluru',  state: 'Karnataka',    days: 2 },
    { pincode: '560034', city: 'Bengaluru',  state: 'Karnataka',    days: 2 },
    { pincode: '400001', city: 'Mumbai',     state: 'Maharashtra',  days: 2 },
    { pincode: '400051', city: 'Mumbai',     state: 'Maharashtra',  days: 2 },
    { pincode: '110001', city: 'New Delhi',  state: 'Delhi',        days: 2 },
    { pincode: '110020', city: 'New Delhi',  state: 'Delhi',        days: 3 },
    { pincode: '600001', city: 'Chennai',    state: 'Tamil Nadu',   days: 3 },
    { pincode: '500001', city: 'Hyderabad',  state: 'Telangana',    days: 3 },
    { pincode: '700001', city: 'Kolkata',    state: 'West Bengal',  days: 3 },
    { pincode: '380001', city: 'Ahmedabad',  state: 'Gujarat',      days: 3 },
    { pincode: '411001', city: 'Pune',       state: 'Maharashtra',  days: 3 },
    { pincode: '302001', city: 'Jaipur',     state: 'Rajasthan',    days: 4 },
    { pincode: '226001', city: 'Lucknow',    state: 'Uttar Pradesh', days: 4 },
    { pincode: '682001', city: 'Kochi',      state: 'Kerala',       days: 3 },
    { pincode: '160017', city: 'Chandigarh', state: 'Punjab',       days: 4 },
    { pincode: '395001', city: 'Surat',      state: 'Gujarat',      days: 4 },
    { pincode: '440001', city: 'Nagpur',     state: 'Maharashtra',  days: 4 },
    { pincode: '800001', city: 'Patna',      state: 'Bihar',        days: 5 },
    { pincode: '751001', city: 'Bhubaneswar', state: 'Odisha',      days: 5 },
    { pincode: '641001', city: 'Coimbatore', state: 'Tamil Nadu',   days: 4 },
  ];
  for (const p of pincodes) {
    await prisma.pincodeServiceability.upsert({
      where: { pincode: p.pincode }, update: {},
      create: {
        pincode: p.pincode, city: p.city, state: p.state,
        isServiceable: true, estimatedDays: p.days,
        codAvailable: true, shippingCharge: 49,
      },
    });
  }
  console.log(`✓  ${pincodes.length} pincodes`);

  // ══════════════════════════════════════════════════════════════════
  // 11. BLOGS
  // ══════════════════════════════════════════════════════════════════
  const blogsData = [
    {
      title: '10 Must-Have Products for Your Newborn',
      content: `Bringing home a newborn is one of life's most joyful moments. But with thousands of baby products on the market, knowing what you actually need can be overwhelming. Here are the 10 truly essential products every new parent should have...`,
      tags: ['newborn', 'essentials', 'parenting', 'checklist'],
    },
    {
      title: 'How to Choose the Right Baby Carrier',
      content: `Baby carriers are a game-changer for new parents — keeping your baby close while freeing your hands. But with so many styles (wraps, structured carriers, ring slings), how do you choose the right one? Here's our complete guide...`,
      tags: ['babywearing', 'carrier', 'buying-guide'],
    },
    {
      title: 'Baby-Led Weaning: A Complete Beginner\'s Guide',
      content: `Baby-led weaning (BLW) is a popular approach to introducing solid foods that lets babies feed themselves from the very start. Instead of spoon-feeding purees, you offer soft finger foods and let your baby explore. Here's everything you need to know...`,
      tags: ['weaning', 'feeding', 'solids', 'nutrition'],
    },
    {
      title: 'Creating the Perfect Sleep Routine for Your Baby',
      content: `A consistent sleep routine is one of the best gifts you can give your baby — and yourself. Babies thrive on predictability, and a calming bedtime routine signals to their developing brain that it's time to sleep. Here's how to build one...`,
      tags: ['sleep', 'routine', 'newborn', 'parenting'],
    },
    {
      title: 'Top 5 Developmental Toys for 0-12 Months',
      content: `The first year of life is the most rapid period of brain development. The right toys can make a big difference in stimulating your baby's senses and milestones. We've rounded up the best developmental toys for each stage of the first year...`,
      tags: ['toys', 'development', 'milestones', 'sensory'],
    },
  ];

  for (const b of blogsData) {
    const s = slug(b.title);
    await prisma.blog.upsert({
      where: { slug: s }, update: {},
      create: {
        title: b.title, slug: s, content: b.content, tags: b.tags,
        excerpt: b.content.substring(0, 150) + '...',
        authorId: (await prisma.user.findFirst({ where: { role: UserRole.ADMIN } }))!.id,
        isPublished: true, publishedAt: new Date(),
        coverImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800',
        metaTitle: b.title + ' | LittleNest Blog',
        metaDesc:  b.content.substring(0, 160),
      },
    });
  }
  console.log(`✓  ${blogsData.length} blog posts`);

  // ══════════════════════════════════════════════════════════════════
  // 12. SETTINGS
  // ══════════════════════════════════════════════════════════════════
  const settingsData: { key: string; value: any; group: string; isPublic: boolean }[] = [
    { key: 'site_name',                value: 'LittleNest',                     group: 'general',  isPublic: true  },
    { key: 'site_tagline',             value: 'Premium Baby & Kids Products',   group: 'general',  isPublic: true  },
    { key: 'support_email',            value: 'support@littlenest.in',          group: 'general',  isPublic: true  },
    { key: 'support_phone',            value: '+91-1800-123-4567',              group: 'general',  isPublic: true  },
    { key: 'free_shipping_threshold',  value: 499,                              group: 'shipping', isPublic: true  },
    { key: 'default_shipping_charge',  value: 49,                               group: 'shipping', isPublic: true  },
    { key: 'tax_rate',                 value: 18,                               group: 'tax',      isPublic: false },
    { key: 'return_window_days',       value: 7,                                group: 'returns',  isPublic: true  },
    { key: 'currency',                 value: 'INR',                            group: 'general',  isPublic: true  },
    { key: 'currency_symbol',          value: '₹',                              group: 'general',  isPublic: true  },
    { key: 'razorpay_enabled',         value: true,                             group: 'payment',  isPublic: false },
    { key: 'cod_enabled',              value: true,                             group: 'payment',  isPublic: true  },
    { key: 'max_cart_items',           value: 20,                               group: 'general',  isPublic: false },
    { key: 'loyalty_points_per_rupee', value: 1,                                group: 'loyalty',  isPublic: true  },
    { key: 'loyalty_redeem_rate',      value: 0.25,                             group: 'loyalty',  isPublic: true  },
  ];
  for (const s of settingsData) {
    await prisma.setting.upsert({
      where: { key: s.key }, update: {},
      create: { key: s.key, value: s.value, group: s.group, isPublic: s.isPublic },
    });
  }
  console.log(`✓  ${settingsData.length} settings`);

  // ══════════════════════════════════════════════════════════════════
  // DONE
  // ══════════════════════════════════════════════════════════════════
  console.log('\n✅  Seeding completed!\n');
  console.log('📋  Demo Credentials:');
  console.log('    Super Admin : superadmin@littlenest.in  /  SuperAdmin@123');
  console.log('    Admin       : admin@littlenest.in       /  Admin@123');
  console.log('    Manager     : manager@littlenest.in     /  Admin@123');
  console.log('    Customer    : demo@littlenest.in        /  Customer@123');
  console.log('\n🎟️  Coupons: WELCOME10 · FLAT100 · BABY20 · TOYS15 · FREESHIP · FLAT200 · NEWMOM15\n');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
