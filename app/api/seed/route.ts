import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const initialEmployees = [
    {
        firstName: 'Jane',
        lastName: 'Cooper',
        email: 'jane.cooper@example.com',
        department: 'Human Resources',
        role: 'HR Manager',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        firstName: 'Cody',
        lastName: 'Fisher',
        email: 'cody.fisher@example.com',
        department: 'Engineering',
        role: 'Software Engineer',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        firstName: 'Esther',
        lastName: 'Howard',
        email: 'esther.howard@example.com',
        department: 'Design',
        role: 'Creative Director',
        status: 'On Leave',
        imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        firstName: 'Jenny',
        lastName: 'Wilson',
        email: 'jenny.wilson@example.com',
        department: 'Marketing',
        role: 'Marketing Lead',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        firstName: 'Kristin',
        lastName: 'Watson',
        email: 'kristin.watson@example.com',
        department: 'Sales',
        role: 'Sales Manager',
        status: 'Terminated',
        imageUrl: 'https://images.unsplash.com/photo-1532417344469-368f9df6d9ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
];

// POST - إضافة البيانات الأولية
export async function POST() {
    try {
        // حذف جميع الموظفين الحاليين
        await prisma.employee.deleteMany();

        // إضافة الموظفين الجدد
        const employees = await prisma.employee.createMany({
            data: initialEmployees,
        });

        return NextResponse.json({
            message: 'Database seeded successfully',
            count: employees.count,
        });
    } catch (error) {
        console.error('Error seeding database:', error);
        return NextResponse.json(
            { error: 'Failed to seed database' },
            { status: 500 }
        );
    }
}
