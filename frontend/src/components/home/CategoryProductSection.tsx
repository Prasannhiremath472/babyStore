import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const DIAPER_SUBCATS = [
  { label: 'Baby Diapers',         img: '/images/diapers-wipes/dl-0123.jpeg',  href: '/products?q=diaper' },
  { label: 'Baby Wipes',           img: '/images/diapers-wipes/dl-0124.jpeg',  href: '/products?q=wipes' },
  { label: 'Diaper Pants',         img: '/images/diapers-wipes/dl-0389.jpeg',  href: '/products?q=pants' },
  { label: 'Diaper Rash Cream',    img: '/images/diapers-wipes/dl-0416.jpeg',  href: '/products?q=rash+cream' },
  { label: 'Changing Pads',        img: '/images/diapers-wipes/dl-0487.jpeg',  href: '/products?q=changing+mat' },
  { label: 'Diaper Bag',           img: '/images/baby-gear/dl-0089.jpeg',      href: '/products?q=diaper+bag' },
  { label: 'Potty Training',       img: '/images/health-safety/dl-0013.jpeg',  href: '/products?q=potty' },
];

const BATH_SUBCATS = [
  { label: 'Soaps & Body Wash',    img: '/images/bath-skin-care/dl-0045.jpeg', href: '/products?q=soap+shampoo' },
  { label: 'Lotions & Oils',       img: '/images/bath-skin-care/dl-0048.jpeg', href: '/products?q=lotion+oil' },
  { label: 'Baby Creams',          img: '/images/bath-skin-care/dl-0049.jpeg', href: '/products?q=cream' },
  { label: 'Bath Tubs',            img: '/images/bath-skin-care/dl-0050.jpeg', href: '/products?q=bath+tub' },
  { label: 'Bathing Accessories',  img: '/images/bath-skin-care/dl-0125.jpeg', href: '/products?q=bathing' },
  { label: 'Grooming Kits',        img: '/images/health-safety/dl-0038.jpeg',  href: '/products?q=grooming' },
  { label: 'Baby Powder',          img: '/images/bath-skin-care/dl-0167.jpeg', href: '/products?q=powder' },
];

const FEEDING_SUBCATS = [
  { label: 'Feeding Bottles',      img: '/images/feeding-essentials/dl-0018.jpeg', href: '/products?q=bottle' },
  { label: 'Breast Pumps',         img: '/images/feeding-essentials/dl-0019.jpeg', href: '/products?q=breast+pump' },
  { label: 'Infant Formula',       img: '/images/feeding-essentials/dl-0020.jpeg', href: '/products?q=lactogen' },
  { label: 'Baby Food',            img: '/images/feeding-essentials/dl-0021.jpeg', href: '/products?q=cerelac' },
  { label: 'Feeding Cups',         img: '/images/feeding-essentials/dl-0023.jpeg', href: '/products?q=sipper' },
  { label: 'Nipples & Teats',      img: '/images/feeding-essentials/dl-0024.jpeg', href: '/products?q=nipple' },
  { label: 'Highchairs',           img: '/images/feeding-essentials/dl-0025.jpeg', href: '/products?q=highchair' },
];

const GEAR_SUBCATS = [
  { label: 'Strollers & Prams',    img: '/images/baby-gear/dl-0043.jpeg',  href: '/products?q=stroller' },
  { label: 'Baby Carriers',        img: '/images/baby-gear/dl-0089.jpeg',  href: '/products?q=carrier' },
  { label: 'Bouncers & Rockers',   img: '/images/baby-gear/dl-0118.jpeg',  href: '/products?q=bouncer' },
  { label: 'High Chairs',          img: '/images/baby-gear/dl-0119.jpeg',  href: '/products?q=high+chair' },
  { label: 'Baby Monitors',        img: '/images/baby-gear/dl-0120.jpeg',  href: '/products?q=monitor' },
  { label: 'Tricycles & Bikes',    img: '/images/baby-gear/dl-0143.jpeg',  href: '/products?q=tricycle' },
];

const TOYS_SUBCATS = [
  { label: 'Soft Toys',            img: '/images/toys-games/dl-0087.jpeg', href: '/products?q=soft+toy' },
  { label: 'Educational Toys',     img: '/images/toys-games/dl-0012.jpeg', href: '/products?q=educational' },
  { label: 'Musical Toys',         img: '/images/toys-games/dl-0016.jpeg', href: '/products?q=musical' },
  { label: 'Activity Gyms',        img: '/images/toys-games/dl-0017.jpeg', href: '/products?q=activity+gym' },
  { label: 'Rattles & Teethers',   img: '/images/toys-games/dl-0036.jpeg', href: '/products?q=rattle' },
  { label: 'Building Blocks',      img: '/images/toys-games/dl-0052.jpeg', href: '/products?q=blocks' },
  { label: 'Ride-Ons',             img: '/images/toys-games/dl-0056.jpeg', href: '/products?q=ride+on' },
];

const NURSERY_SUBCATS = [
  { label: 'Cradles & Cots',       img: '/images/nursery/dl-0007.jpeg',   href: '/products?q=cradel' },
  { label: 'Baby Blankets',        img: '/images/nursery/dl-0095.jpeg',   href: '/products?q=blanket' },
  { label: 'Baby Pillows',         img: '/images/nursery/dl-0096.jpeg',   href: '/products?q=pillow' },
  { label: 'Play Mats',            img: '/images/nursery/dl-0097.jpeg',   href: '/products?q=mat' },
  { label: 'Night Lights',         img: '/images/nursery/dl-0130.jpeg',   href: '/products?q=night+light' },
  { label: 'Mosquito Nets',        img: '/images/nursery/dl-0134.jpeg',   href: '/products?q=mosquito+net' },
];

const CLOTHING_SUBCATS = [
  { label: 'Infant Wear',          img: '/images/baby-clothing/dl-0001.jpeg', href: '/products?q=infant+wear' },
  { label: 'Baby Rompers',         img: '/images/baby-clothing/dl-0003.jpeg', href: '/products?q=romper' },
  { label: 'Bodysuits',            img: '/images/baby-clothing/dl-0005.jpeg', href: '/products?q=bodysuit' },
  { label: 'Ethnic Wear',          img: '/images/baby-clothing/dl-0006.jpeg', href: '/products?q=kurta' },
  { label: 'Sets & Combos',        img: '/images/baby-clothing/dl-0008.jpeg', href: '/products?q=set' },
  { label: 'Caps & Mittens',       img: '/images/baby-clothing/dl-0009.jpeg', href: '/products?q=cap' },
  { label: 'Socks & Bootees',      img: '/images/baby-clothing/dl-0010.jpeg', href: '/products?q=socks' },
  { label: 'Winter Wear',          img: '/images/baby-clothing/dl-0011.jpeg', href: '/products?q=winter' },
];

// Reusable section block
function SectionBlock({
  title, accent, subcats, viewAllHref, cols = 7,
  bannerGradient, bannerEmoji, bannerTitle, bannerCta,
}: {
  title: string; accent?: string; subcats: { label: string; img: string; href: string }[];
  viewAllHref: string; cols?: number;
  bannerGradient?: string; bannerEmoji?: string; bannerTitle?: string; bannerCta?: string;
}) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-display font-black text-gray-900 uppercase tracking-wide">
          {accent
            ? <>{title.split(accent)[0]}<span className="text-sky-500">{accent}</span>{title.split(accent)[1]}</>
            : title
          }
        </h2>
        <Link to={viewAllHref} className="flex items-center gap-1 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors whitespace-nowrap">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Optional banner */}
      {bannerGradient && (
        <Link to={viewAllHref} className={`group block relative h-32 bg-gradient-to-r ${bannerGradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-25 group-hover:scale-110 transition-transform duration-500">{bannerEmoji}</div>
          <div className="absolute inset-0 flex items-center px-8">
            <div className="text-white">
              <h3 className="font-black text-2xl uppercase">{bannerTitle}</h3>
              <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                {bannerCta} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Link>
      )}

      {/* Sub-category image grid */}
      <div className={`grid grid-cols-4 sm:grid-cols-${Math.min(cols, 7)} lg:grid-cols-${cols}`}>
        {subcats.map((sub, i) => (
          <motion.div key={sub.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <Link to={sub.href}
              className="group flex flex-col items-center p-3 border-r border-b border-gray-100 hover:bg-sky-50/60 transition-colors last:border-r-0">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 border border-gray-100 group-hover:border-sky-300 group-hover:shadow-soft transition-all">
                <img src={sub.img} alt={sub.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                />
              </div>
              <p className="text-[10px] font-semibold text-gray-700 text-center leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                {sub.label} <span className="text-gray-300">›</span>
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function CategoryProductSection() {
  return (
    <section className="py-10 bg-gray-50 space-y-6">
      <div className="section-container space-y-6">

        {/* BABY CLOTHING */}
        <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-display font-black text-gray-900 uppercase">BABY <span className="text-sky-500">CLOTHING</span></h2>
            <Link to="/category/baby-clothing" className="flex items-center gap-1 text-sky-600 font-bold text-sm hover:text-sky-700">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          {/* Price filter strip */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-5">
            <div className="flex items-center justify-between">
              <div className="text-white font-black text-sm">☀️ SUNNY PLAY DAYS &nbsp; <span className="text-yellow-300">FLAT 40% OFF</span></div>
              <div className="flex gap-3">
                {[{ p: '249', href: '/products?maxPrice=249&categoryId=baby-clothing' }, { p: '449', href: '/products?maxPrice=449&categoryId=baby-clothing' }, { p: '749', href: '/products?maxPrice=749&categoryId=baby-clothing' }].map(b => (
                  <Link key={b.p} to={b.href}
                    className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/30 hover:bg-white/35 transition-all group">
                    <span className="text-white/70 text-[10px] font-bold uppercase">UNDER</span>
                    <span className="text-white font-black text-xl leading-none">₹{b.p}</span>
                    <ChevronRight className="w-3 h-3 text-white/60 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8">
            {CLOTHING_SUBCATS.map((sub, i) => (
              <Link key={sub.label} to={sub.href}
                className="group flex flex-col items-center p-3 border-r border-b border-gray-100 hover:bg-sky-50/60 transition-colors last:border-r-0">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 border border-gray-100 group-hover:border-sky-300 transition-all">
                  <img src={sub.img} alt={sub.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }} />
                </div>
                <p className="text-[10px] font-semibold text-gray-700 text-center group-hover:text-sky-600 transition-colors line-clamp-2">{sub.label} ›</p>
              </Link>
            ))}
          </div>
        </div>

        {/* BABY DIAPERS & MORE */}
        <SectionBlock title="BABY DIAPERS & MORE" subcats={DIAPER_SUBCATS} viewAllHref="/category/diapers-wipes" cols={7} />

        {/* BATH & SKINCARE */}
        <SectionBlock title="BATH & SKINCARE" accent="SKINCARE" subcats={BATH_SUBCATS} viewAllHref="/category/bath-skin-care" cols={7} />

        {/* FEEDING & KIDS FOOD with banner */}
        <SectionBlock
          title="FEEDING & KIDS FOOD"
          subcats={FEEDING_SUBCATS}
          viewAllHref="/category/feeding-essentials"
          cols={7}
          bannerGradient="from-green-500 to-teal-600"
          bannerEmoji="🍼"
          bannerTitle="Feeding & Kids Food"
          bannerCta="SHOP NOW"
        />

        {/* GEAR & ACTIVITY with banner */}
        <SectionBlock
          title="GEAR & ACTIVITY"
          subcats={GEAR_SUBCATS}
          viewAllHref="/category/baby-gear"
          cols={6}
          bannerGradient="from-purple-500 to-indigo-700"
          bannerEmoji="🚼"
          bannerTitle="Baby Gear & Activity"
          bannerCta="SHOP NOW"
        />

        {/* TOYS & GAMES */}
        <SectionBlock title="TOYS & GAMES" accent="GAMES" subcats={TOYS_SUBCATS} viewAllHref="/category/toys-games" cols={7} />

        {/* NURSERY */}
        <SectionBlock title="NURSERY & FURNITURE" subcats={NURSERY_SUBCATS} viewAllHref="/category/nursery" cols={6} />

        {/* BUILD YOUR OWN LIBRARY — Full-bleed CTA banner */}
        <Link to="/category/books"
          className="group block relative rounded-3xl overflow-hidden h-44 bg-gradient-to-r from-amber-700 to-orange-700 shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 gap-8">
            <div className="text-white">
              <h3 className="font-black text-4xl md:text-5xl uppercase leading-tight">Build Your<br />Own Library</h3>
              <button className="mt-4 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-orange-600 transition-colors">
                SHOP NOW <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">📚</div>
        </Link>

        {/* HEALTH & SAFETY */}
        <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-display font-black text-gray-900 uppercase">HEALTH & <span className="text-sky-500">SAFETY</span></h2>
            <Link to="/category/health-safety" className="flex items-center gap-1 text-sky-600 font-bold text-sm hover:text-sky-700">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6">
            {[
              { label: 'Thermometers',     img: '/images/health-safety/dl-0013.jpeg', href: '/products?q=thermometer' },
              { label: 'Nasal Aspirators', img: '/images/health-safety/dl-0038.jpeg', href: '/products?q=nasal+aspirator' },
              { label: 'Safety Gates',     img: '/images/health-safety/dl-0181.jpeg', href: '/products?q=safety+gate' },
              { label: 'Socket Covers',    img: '/images/health-safety/dl-0182.jpeg', href: '/products?q=socket' },
              { label: 'Grooming Kits',    img: '/images/health-safety/dl-0201.jpeg', href: '/products?q=nail+clip' },
              { label: 'Pulse Oximeters',  img: '/images/health-safety/dl-0482.jpeg', href: '/products?q=oximeter' },
            ].map(sub => (
              <Link key={sub.label} to={sub.href}
                className="group flex flex-col items-center p-4 border-r border-gray-100 hover:bg-sky-50/60 transition-colors last:border-r-0">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 border border-gray-100 group-hover:border-sky-300 transition-all">
                  <img src={sub.img} alt={sub.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }} />
                </div>
                <p className="text-[10px] font-semibold text-gray-700 text-center group-hover:text-sky-600 transition-colors">{sub.label} ›</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
