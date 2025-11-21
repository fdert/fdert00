import React from 'react';
import { User, Lock, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary-100 p-3 rounded-full">
                            <ShieldCheck className="w-10 h-10 text-primary-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-secondary-800 mb-2">Welcome Back</h2>
                    <p className="text-center text-secondary-500 mb-8">Sign in to access the HR Portal</p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="admin@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            type="button" // Changed to button to prevent submit for demo
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-[1.02]"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="bg-secondary-50 px-8 py-4 border-t border-secondary-100 text-center">
                    <p className="text-xs text-secondary-500">
                        &copy; 2025 Employee Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
