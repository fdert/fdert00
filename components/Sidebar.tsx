"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileBarChart, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Reports', href: '/reports', icon: FileBarChart },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-secondary-900 text-white">
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center h-16 flex-shrink-0 px-4 bg-secondary-950">
                    <ShieldCheck className="h-8 w-8 text-primary-500 mr-2" />
                    <span className="text-xl font-bold tracking-tight">EMS Portal</span>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto py-4">
                    <nav className="flex-1 px-2 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        isActive
                                            ? 'bg-primary-600 text-white'
                                            : 'text-secondary-300 hover:bg-secondary-800 hover:text-white',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                                    )}
                                >
                                    <item.icon
                                        className={clsx(
                                            isActive ? 'text-white' : 'text-secondary-400 group-hover:text-white',
                                            'mr-3 flex-shrink-0 h-6 w-6 transition-colors'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-secondary-800 p-4">
                    <button className="flex-shrink-0 w-full group block">
                        <div className="flex items-center">
                            <div className="inline-block h-9 w-9 rounded-full overflow-hidden bg-secondary-100">
                                <svg className="h-full w-full text-secondary-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs font-medium text-secondary-400 group-hover:text-secondary-300">View Profile</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
