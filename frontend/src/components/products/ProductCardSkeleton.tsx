export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
      {/* Square image */}
      <div className="skeleton" style={{ aspectRatio: '1/1' }} />
      {/* Info */}
      <div className="p-2.5 space-y-2">
        <div className="skeleton h-2.5 w-14 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-2 w-28 rounded" />
        <div className="skeleton h-2 w-24 rounded" />
        <div className="skeleton h-8 w-full rounded-lg mt-1" />
      </div>
    </div>
  );
}
