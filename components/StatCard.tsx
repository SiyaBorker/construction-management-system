import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendDirection }) => {
  const trendColor = trendDirection === 'up' ? 'text-green-600' : 'text-red-600';
  const trendIcon = trendDirection === 'up' ? '↑' : '↓';
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg border border-gray-200">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && (
            <p className={`text-xs mt-2 flex items-center ${trendColor}`}>
                {trendIcon} {trend}
            </p>
        )}
      </div>
      <div className="bg-gray-100 p-3 rounded-full text-amber-600">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;