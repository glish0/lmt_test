'use client';

import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-gray-900">
                LMT Library Stock
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
