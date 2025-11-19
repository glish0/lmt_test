
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (username: string, password: string, role: string) => {
        setIsLoading(true);
        setError('');

        try {
            const success = await login(username, password, role);

            if (success) {
                router.push('/'); // Redirect to dashboard on successful login
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <AuthForm 
                    type="login" 
                    onSubmit={handleSubmit} 
                    isLoading={isLoading} 
                />
            </div>
        </div>
    );
};

export default Login;
