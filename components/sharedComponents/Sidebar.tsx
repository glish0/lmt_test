'use client';

import Link from 'next/link';
import { NavItems } from "@/constants";
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Filter
  const filteredNavItems = NavItems.filter(item => {

    if (isAuthenticated && (item.title === 'Login' || item.title === 'Register')) {
      return false;
    }
    return true;
  });

  return (
    <aside className="bg-gray-100  h-screen p-4 fixed left-0 top-0 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold">LMT Library Stock</h1>
      </div>

      {isAuthenticated && (
        <div className="mb-4 p-3 bg-blue-100 rounded">
          <p className="text-sm font-medium">Logged in as:</p>
          <p className="font-bold">{user?.username}</p>
          <p className="text-xs text-gray-600">Role: {user?.role}</p>
        </div>
      )}

      <nav>
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className="block p-2 rounded hover:bg-gray-200 transition-colors"
              >
                {item.title}
              </Link>
            </li>
          ))}

          {isAuthenticated && (
            <li>
              <button
                onClick={logout}
                className="w-full text-left block p-2 rounded hover:bg-gray-200 transition-colors text-red-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
