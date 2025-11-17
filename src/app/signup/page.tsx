'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { UserPlus, Shield, Zap } from 'lucide-react';
import { signupUser } from '../api/userApi';
import { SignupFormData } from '@/constants';

export default function SignupPage() {


    const handleSignup = async (email: string, password: string, name?: string) => {
        console.log('Signup', { email, password, name });
        const formData: any = { email, password, name };

        try {
            const data = await signupUser(formData);

            console.log('Signup success:', data);
            alert(data?.message);
        } catch (error: any) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert('Signup failed!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-gray-600 mt-2">Join us and start managing your payments</p>
                    </div>

                    {/* Auth Form */}
                    <AuthForm type="signup" onSubmit={handleSignup} />

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
