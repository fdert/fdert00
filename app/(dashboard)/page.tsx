import React from 'react';
import { Users, UserPlus, Briefcase, TrendingUp } from 'lucide-react';

const stats = [
    { name: 'Total Employees', stat: '148', icon: Users, change: '12%', changeType: 'increase' },
    { name: 'New Hires (Month)', stat: '12', icon: UserPlus, change: '4%', changeType: 'increase' },
    { name: 'Open Vacancies', stat: '5', icon: Briefcase, change: '2', changeType: 'decrease' },
    { name: 'Retention Rate', stat: '94%', icon: TrendingUp, change: '1%', changeType: 'increase' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-secondary-900">Dashboard</h1>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden transition-all hover:shadow-md">
                        <dt>
                            <div className="absolute bg-primary-500 rounded-md p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-sm font-medium text-secondary-500 truncate">{item.name}</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-secondary-900">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                )}
                            >
                                {item.changeType === 'increase' ? '↑' : '↓'}
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Placeholder for Charts */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">Department Distribution</h3>
                    <div className="h-64 bg-secondary-50 rounded flex items-center justify-center text-secondary-400">
                        [Chart Component Placeholder]
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">Recent Activities</h3>
                    <ul className="divide-y divide-secondary-200">
                        {[1, 2, 3, 4].map((i) => (
                            <li key={i} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="h-8 w-8 rounded-full bg-secondary-200 flex items-center justify-center">
                                        <span className="text-xs font-medium text-secondary-500">JD</span>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium">John Doe updated profile</h3>
                                            <p className="text-sm text-secondary-500">2h ago</p>
                                        </div>
                                        <p className="text-sm text-secondary-500">Changed contact information.</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
