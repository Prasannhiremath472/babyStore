import { Link } from 'react-router-dom';

const MEGA_MENU_DATA = {
  'baby-clothing': {
    featured: { title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', link: '/products?isNew=true&categoryId=baby-clothing' },
    columns: [
      {
        title: 'By Age',
        links: [
          { label: 'Newborn (0-3M)', href: '/products?ageGroup=0-3 months' },
          { label: '3-6 Months', href: '/products?ageGroup=3-6 months' },
          { label: '6-12 Months', href: '/products?ageGroup=6-12 months' },
          { label: '1-2 Years', href: '/products?ageGroup=1-2 years' },
          { label: '2-3 Years', href: '/products?ageGroup=2-3 years' },
        ],
      },
      {
        title: 'By Type',
        links: [
          { label: 'Bodysuits & Onesies', href: '/products?search=onesie' },
          { label: 'Rompers', href: '/products?search=romper' },
          { label: 'Sleepwear', href: '/products?search=sleepwear' },
          { label: 'Sets & Combos', href: '/products?search=set' },
          { label: 'Winterwear', href: '/products?search=winter' },
        ],
      },
    ],
  },
};

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
}

export default function MegaMenu({ category, isOpen }: MegaMenuProps) {
  const data = MEGA_MENU_DATA[category as keyof typeof MEGA_MENU_DATA];
  if (!data || !isOpen) return null;

  return (
    <div className="mega-menu animate-fade-in">
      <div className="section-container py-8">
        <div className="flex gap-8">
          {data.columns.map(col => (
            <div key={col.title} className="min-w-[160px]">
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-gray-600 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {data.featured && (
            <div className="ml-auto">
              <Link to={data.featured.link}>
                <div className="relative w-56 h-40 rounded-2xl overflow-hidden group">
                  <img src={data.featured.image} alt={data.featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold">{data.featured.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
