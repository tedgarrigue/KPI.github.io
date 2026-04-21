'use client';

interface KpiCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function KpiCard({ icon, title, value, subtitle }: KpiCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-brand-orange mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}
