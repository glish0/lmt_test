'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BarChartProps {
  title: string;
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
}

export function BarChart({ title, data }: BarChartProps) {
  // Find the maximum value to calculate percentages
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Default colors if not provided
  const defaultColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.value}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || defaultColors[index % defaultColors.length]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}