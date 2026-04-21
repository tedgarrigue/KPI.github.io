'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  dataKey?: string;
}

export default function BarChartCard({
  title,
  data,
  dataKey = 'value',
}: BarChartCardProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">Pas de données disponibles</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: item.name,
    [dataKey]: item.value,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#FF6B35" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
