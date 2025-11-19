
'use client';

import { useEffect, useState } from 'react';
import { articles } from '@/data/articles';
import { Article } from '@/types';
import { StatsCard } from '@/components/ui/stats-card';
import { BarChart } from '@/components/ui/bar-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  // Calculate statistics
  const totalArticles = articles.length;
  const totalStock = articles.reduce((sum, article) => sum + article.stock, 0);
  const averagePrice = articles.reduce((sum, article) => sum + article.price, 0) / totalArticles;

  // Count articles by category
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the bar chart - top 5 articles by stock
  const stockData = [...articles]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map(article => ({
      name: article.title,
      value: article.stock,
    }));

  // Group articles by category for the category chart
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Create data for stock status chart (low stock vs sufficient stock)
  const LOW_STOCK_THRESHOLD = 10;
  const lowStockCount = articles.filter(article => article.stock < LOW_STOCK_THRESHOLD).length;
  const sufficientStockCount = articles.filter(article => article.stock >= LOW_STOCK_THRESHOLD).length;

  const stockStatusData = [
    { name: "Low Stock (< 10)", value: lowStockCount, color: "var(--chart-4)" },
    { name: "Sufficient Stock", value: sufficientStockCount, color: "var(--chart-1)" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Articles" 
          value={totalArticles} 
          description="Total number of articles in the system" 
        />
        <StatsCard 
          title="Total Stock" 
          value={totalStock} 
          description="Total units in stock" 
        />
        <StatsCard 
          title="Low Stock Items" 
          value={lowStockCount} 
          description={`Articles with less than ${LOW_STOCK_THRESHOLD} units`}
          className="bg-amber-50" 
        />
        <StatsCard 
          title="Average Price" 
          value={`$${averagePrice.toFixed(2)}`} 
          description="Average price of all articles" 
        />
      </div>

      {/* More Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Categories" 
          value={Object.keys(categoryCounts).length} 
          description="Number of unique categories" 
        />
        <StatsCard 
          title="Highest Stock" 
          value={Math.max(...articles.map(a => a.stock))} 
          description="Maximum units for a single article" 
        />
        <StatsCard 
          title="Lowest Stock" 
          value={Math.min(...articles.map(a => a.stock))} 
          description="Minimum units for a single article"
          className="bg-amber-50" 
        />
        <StatsCard 
          title="Total Value" 
          value={`$${articles.reduce((sum, a) => sum + a.price * a.stock, 0).toFixed(2)}`} 
          description="Total inventory value" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChart 
          title="Top 5 Articles by Stock" 
          data={stockData} 
        />
        <BarChart 
          title="Articles by Category" 
          data={categoryData} 
        />
        <BarChart 
          title="Stock Status" 
          data={stockStatusData} 
        />
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
          <CardDescription>The latest articles added to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {articles.slice(0, 5).map(article => (
              <div key={article.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${article.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Stock: {article.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
