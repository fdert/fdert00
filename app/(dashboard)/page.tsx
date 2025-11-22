import React from 'react';
import { Users, UserPlus, Briefcase, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default async function DashboardPage() {
    // جلب البيانات من قاعدة البيانات
    const totalEmployees = await prisma.employee.count();
    const activeEmployees = await prisma.employee.count({
        where: { status: 'Active' },
    });
    const onLeaveEmployees = await prisma.employee.count({
        where: { status: 'On Leave' },
    });

    // حساب الموظفين الجدد في الشهر الحالي
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newHires = await prisma.employee.count({
        where: {
            createdAt: {
                gte: oneMonthAgo,
            },
        },
    });

    // حساب معدل الاحتفاظ
    const retentionRate = totalEmployees > 0
        ? Math.round((activeEmployees / totalEmployees) * 100)
        : 0;

    const stats = [
        {
            name: 'Total Employees',
            stat: totalEmployees.toString(),
            icon: Users,
            change: '12%',
            changeType: 'increase'
        },
        {
            name: 'New Hires (Month)',
            stat: newHires.toString(),
            icon: UserPlus,
            change: '4%',
            changeType: 'increase'
        },
        {
            name: 'On Leave',
            stat: onLeaveEmployees.toString(),
            icon: Briefcase,
            change: '2',
            changeType: 'decrease'
        },
        {
            name: 'Retention Rate',
            stat: `${retentionRate}%`,
            icon: TrendingUp,
            change: '1%',
            changeType: 'increase'
        },
    ];

    // جلب أحدث الموظفين
    const recentEmployees = await prisma.employee.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
    });

    // حساب توزيع الأقسام
    const departments = await prisma.employee.groupBy({
        by: ['department'],
        _count: {
            department: true,
        },
    });

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
                {/* Department Distribution */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">Department Distribution</h3>
                    <div className="space-y-3">
                        {departments.length > 0 ? (
                            departments.map((dept) => {
                                const percentage = totalEmployees > 0
                                    ? Math.round((dept._count.department / totalEmployees) * 100)
                                    : 0;
                                return (
                                    <div key={dept.department}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-secondary-700">{dept.department}</span>
                                            <span className="text-secondary-500">{dept._count.department} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-secondary-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="h-64 bg-secondary-50 rounded flex items-center justify-center text-secondary-400">
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Employees */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">Recent Employees</h3>
                    <ul className="divide-y divide-secondary-200">
                        {recentEmployees.length > 0 ? (
                            recentEmployees.map((employee) => (
                                <li key={employee.id} className="py-4">
                                    <div className="flex space-x-3">
                                        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                                            <img
                                                src={employee.imageUrl || `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}`}
                                                alt={`${employee.firstName} ${employee.lastName}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium">{employee.firstName} {employee.lastName}</h3>
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {employee.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-secondary-500">{employee.role} - {employee.department}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="py-12 text-center text-secondary-400">
                                No employees yet
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
