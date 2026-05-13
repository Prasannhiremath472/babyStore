import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Navigation2, Search, MapPin, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORES = [
  {
    id: 1,
    name: 'My Baby — Koramangala',
    area: 'Koramangala 5th Block, Bengaluru, Karnataka',
    distance: '1.2 KM',
    time: '4 min Away',
    phone: '+91 80 4123 5678',
    lat: 12.9352,
    lng: 77.6245,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Koramangala+Bengaluru',
  },
  {
    id: 2,
    name: 'My Baby — Indiranagar',
    area: 'Indiranagar, Bengaluru, Karnataka',
    distance: '3.5 KM',
    time: '10 min Away',
    phone: '+91 80 4234 6789',
    lat: 12.9784,
    lng: 77.6408,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Indiranagar+Bengaluru',
  },
  {
    id: 3,
    name: 'My Baby — Whitefield',
    area: 'Whitefield Main Road, Bengaluru, Karnataka',
    distance: '8.1 KM',
    time: '22 min Away',
    phone: '+91 80 4345 7890',
    lat: 12.9698,
    lng: 77.7500,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Whitefield+Bengaluru',
  },
  {
    id: 4,
    name: 'My Baby — Andheri West',
    area: 'Lokhandwala Complex, Andheri West, Mumbai, Maharashtra',
    distance: '0.3 KM',
    time: '2 min Away',
    phone: '+91 22 4345 7890',
    lat: 19.1362,
    lng: 72.8296,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Andheri+West+Mumbai',
  },
  {
    id: 5,
    name: 'My Baby — Bandra West',
    area: 'Hill Road, Bandra West, Mumbai, Maharashtra',
    distance: '3.8 KM',
    time: '11 min Away',
    phone: '+91 22 4456 8901',
    lat: 19.0596,
    lng: 72.8295,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Bandra+West+Mumbai',
  },
  {
    id: 6,
    name: 'My Baby — Powai',
    area: 'Hiranandani Gardens, Powai, Mumbai, Maharashtra',
    distance: '2.9 KM',
    time: '9 min Away',
    phone: '+91 22 4567 9012',
    lat: 19.1176,
    lng: 72.9060,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Powai+Mumbai',
  },
  {
    id: 7,
    name: 'My Baby — Connaught Place',
    area: 'Inner Circle, Connaught Place, New Delhi',
    distance: '9.2 KM',
    time: '28 min Away',
    phone: '+91 11 4567 9012',
    lat: 28.6315,
    lng: 77.2167,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Connaught+Place+Delhi',
  },
  {
    id: 8,
    name: 'My Baby — Anna Nagar',
    area: '2nd Avenue, Anna Nagar, Chennai, Tamil Nadu',
    distance: '4.4 KM',
    time: '14 min Away',
    phone: '+91 44 4678 0123',
    lat: 13.0850,
    lng: 80.2101,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=120&q=80',
    mapUrl: 'https://www.google.com/maps/search/My+Baby+Store+Anna+Nagar+Chennai',
  },
];

export default function StoreLocatorPage() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [detecting, setDetecting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = STORES.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.area.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStore = STORES.find(s => s.id === selectedId);

  // Auto-detect location
  const detectLocation = () => {
    setDetecting(true);
    navigator.geolocation?.getCurrentPosition(
      pos => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setDetecting(false);
      },
      () => setDetecting(false)
    );
  };

  // Build Google Maps embed URL — shows all stores or focused on selected
  const mapSrc = () => {
    const base = 'https://www.google.com/maps/embed/v1/search';
    const key  = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'; // demo key — replace with yours
    if (selectedStore) {
      return `https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=16&output=embed`;
    }
    return `https://maps.google.com/maps?q=baby+store+india&z=6&output=embed`;
  };

  const handleStoreClick = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Store Locator — My Baby | Find Baby Store Near You in India</title>
        <meta name="description" content="Find My Baby stores near you across India. Get directions, store timings, phone numbers and in-store services. Locations in Bengaluru, Mumbai, Delhi, Chennai & more." />
        <meta name="keywords" content="My Baby store near me, baby store location, baby shop India, baby store Bengaluru, baby store Mumbai" />
        <link rel="canonical" href="https://www.mybabystore.net/store-locator" />
        <meta property="og:title" content="Store Locator — Find My Baby Store Near You" />
        <meta property="og:description" content="Find My Baby stores near you across India with directions and store hours." />
        <meta property="og:url" content="https://www.mybabystore.net/store-locator" />
      </Helmet>

      {/* Full-height layout — fills parent flex column */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* ── Top bar (back + title) ── */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-200 bg-white shrink-0">
          <Link to="/" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="font-bold text-lg text-gray-900">My Baby Store</h1>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ══ LEFT — Store list ══════════════════════════════════════════════ */}
          <div className="w-full md:w-[380px] lg:w-[420px] flex flex-col shrink-0 border-r border-gray-200 bg-white overflow-hidden">

            {/* Search inside list */}
            <div className="px-4 py-3 border-b border-gray-100 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search for Store"
                  className="w-full pl-9 pr-9 py-2.5 rounded-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all border border-transparent focus:border-primary/20"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Store list */}
            <div ref={listRef} className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                  <MapPin className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="font-semibold text-gray-500">No stores found</p>
                  <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                </div>
              ) : (
                filtered.map(store => (
                  <button
                    key={store.id}
                    onClick={() => handleStoreClick(store.id)}
                    className={`w-full text-left flex items-start gap-3.5 px-4 py-4 border-b border-gray-100 transition-colors ${
                      selectedId === store.id
                        ? 'bg-primary/5 border-l-4 border-l-primary'
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Store image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML =
                            '<div class="w-full h-full flex items-center justify-center bg-primary/10"><span style="font-size:28px">🛍️</span></div>';
                        }}
                      />
                    </div>

                    {/* Store info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 leading-snug mb-0.5">
                        {store.area}
                      </p>
                      <p className="text-xs text-gray-500">
                        {store.distance} | {store.time}
                      </p>
                    </div>

                    {/* Action icons */}
                    <div className="flex items-center gap-3 shrink-0 mt-1">
                      <a
                        href={`tel:${store.phone}`}
                        onClick={e => e.stopPropagation()}
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="Call store"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <a
                        href={store.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="Get directions"
                      >
                        <Navigation2 className="w-5 h-5" />
                      </a>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Auto detect location */}
            <div className="shrink-0 border-t border-gray-200 bg-white">
              <button
                onClick={detectLocation}
                disabled={detecting}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                <MapPin className="w-4 h-4 text-primary" />
                {detecting ? 'Detecting location…' : 'Auto Detect Location'}
              </button>
            </div>
          </div>

          {/* ══ RIGHT — Map ════════════════════════════════════════════════════ */}
          <div className="hidden md:flex flex-1 relative bg-gray-100">
            <iframe
              key={selectedId ?? 'all'}
              title="Store Map"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={
                selectedStore
                  ? `https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=15&output=embed&hl=en`
                  : `https://maps.google.com/maps?q=baby+store+bangalore+india&z=5&output=embed&hl=en`
              }
            />

            {/* Selected store info card floating over map */}
            {selectedStore && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 min-w-[320px] max-w-[90%] border border-gray-100 z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">{selectedStore.name}</p>
                  <p className="text-xs text-gray-500 truncate">{selectedStore.area}</p>
                  <p className="text-xs font-semibold text-primary mt-0.5">{selectedStore.distance} · {selectedStore.time}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href={selectedStore.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Navigation2 className="w-3 h-3" /> Directions
                  </a>
                  <a
                    href={`tel:${selectedStore.phone}`}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-3 h-3" /> Call
                  </a>
                </div>
              </div>
            )}

            {/* Zoom hint */}
            {!selectedStore && (
              <div className="absolute top-4 right-4 bg-gray-900/80 text-white text-xs font-medium px-3 py-2 rounded-lg backdrop-blur-sm">
                Click a store to zoom in
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
