import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - جلب جميع الموظفين
export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        return NextResponse.json(
            { error: 'Failed to fetch employees' },
            { status: 500 }
        );
    }
}

// POST - إضافة موظف جديد
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, department, role, status, imageUrl } = body;

        // التحقق من البيانات المطلوبة
        if (!firstName || !lastName || !email || !department || !role) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // التحقق من عدم تكرار البريد الإلكتروني
        const existingEmployee = await prisma.employee.findUnique({
            where: { email },
        });

        if (existingEmployee) {
            return NextResponse.json(
                { error: 'Employee with this email already exists' },
                { status: 400 }
            );
        }

        // إنشاء الموظف
        const employee = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                email,
                department,
                role,
                status: status || 'Active',
                imageUrl: imageUrl || 'https://ui-avatars.com/api/?name=' + firstName + '+' + lastName,
            },
        });

        return NextResponse.json(employee, { status: 201 });
    } catch (error) {
        console.error('Error creating employee:', error);
        return NextResponse.json(
            { error: 'Failed to create employee' },
            { status: 500 }
        );
    }
}
