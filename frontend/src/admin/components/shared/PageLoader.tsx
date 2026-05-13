export default function AdminPageLoader() {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 animate-pulse">
          🐣
        </div>
        <div className="flex gap-1.5 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
