import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
}

export default function KPICard({
  title, value, change, icon: Icon,
  iconColor = 'text-indigo-600 bg-indigo-100',
  prefix = '', suffix = '', isLoading,
}: Props) {
  if (isLoading) return (
    <div className="kpi-card">
      <div className="admin-skeleton h-4 w-24 mb-4 rounded" />
      <div className="admin-skeleton h-8 w-32 mb-2 rounded" />
      <div className="admin-skeleton h-3 w-20 rounded" />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
      </p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {Math.abs(change)}% vs last month
        </div>
      )}
    </motion.div>
  );
}
