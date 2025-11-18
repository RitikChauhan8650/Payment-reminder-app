'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { CreditCard, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
            const data = await apiFetch('/users/signin', {
                method: 'POST',
                json: { email, password },
            });

            if (data?.token) {
                setToken(data.token);
                router.push('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }

        } catch (err: any) {
            console.error(err);
            alert(err?.message || 'Error logging in');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">

            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-gray-600 mt-2 flex items-center justify-center gap-1">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Auth Form */}
                    <AuthForm type="login" onSubmit={handleLogin} />

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}