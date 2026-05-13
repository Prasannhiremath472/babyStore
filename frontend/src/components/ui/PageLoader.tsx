import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
          <span className="text-3xl animate-bounce">🐣</span>
        </div>
        <div className="flex gap-1.5 justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
