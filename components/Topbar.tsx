"use client";

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export default function Topbar() {
    return (
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-secondary-200">
            <button
                type="button"
                className="px-4 border-r border-secondary-200 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                    <form className="w-full flex md:ml-0" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full text-secondary-400 focus-within:text-secondary-600">
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                <Search className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                                id="search-field"
                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-secondary-900 placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                placeholder="Search employees, departments..."
                                type="search"
                                name="search"
                            />
                        </div>
                    </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="bg-white p-1 rounded-full text-secondary-400 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
