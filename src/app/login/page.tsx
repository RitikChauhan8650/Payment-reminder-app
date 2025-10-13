'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { CreditCard, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
            // const res = await fetch("http://localhost:4000/users/signin", {
            const res = await fetch("https://payment-reminder-backend-2.onrender.com/users/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log("res--------------", res);
            const data = await res.json();
            console.log("data--------------", data);

            if (res.ok && data.token) {
                setToken(data.token);
                router.push("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }

        } catch (err) {
            console.error(err);
            alert("Error logging in");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
                <div className="absolute bottom-40 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl">
                                <CreditCard className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 mt-2 flex items-center justify-center gap-1">
                            <Sparkles className="w-4 h-4" />
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