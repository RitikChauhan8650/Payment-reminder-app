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
            alert('Signup successful!');
        } catch (error: any) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert('Signup failed!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-16 w-18 h-18 bg-emerald-200 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-32 right-24 w-14 h-14 bg-teal-200 rounded-full opacity-20 animate-bounce delay-300"></div>
                <div className="absolute bottom-32 left-12 w-22 h-22 bg-cyan-200 rounded-full opacity-20 animate-bounce delay-700"></div>
                <div className="absolute bottom-16 right-16 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
            </div>

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

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Zap className="w-4 h-4 text-teal-500" />
                            <span>Fast Setup</span>
                        </div>
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

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center mt-6">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>

                {/* Bottom decoration */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
