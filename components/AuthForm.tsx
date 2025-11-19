import React, { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (username: string, password: string, role: string) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, role);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:text-blue-700">
              Register
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;