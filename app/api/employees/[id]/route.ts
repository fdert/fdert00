import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - جلب موظف واحد
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: params.id },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        return NextResponse.json(
            { error: 'Failed to fetch employee' },
            { status: 500 }
        );
    }
}

// PUT - تعديل موظف
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, department, role, status, imageUrl } = body;

        // التحقق من وجود الموظف
        const existingEmployee = await prisma.employee.findUnique({
            where: { id: params.id },
        });

        if (!existingEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        // التحقق من عدم تكرار البريد الإلكتروني
        if (email && email !== existingEmployee.email) {
            const emailExists = await prisma.employee.findUnique({
                where: { email },
            });

            if (emailExists) {
                return NextResponse.json(
                    { error: 'Employee with this email already exists' },
                    { status: 400 }
                );
            }
        }

        // تحديث الموظف
        const employee = await prisma.employee.update({
            where: { id: params.id },
            data: {
                firstName: firstName || existingEmployee.firstName,
                lastName: lastName || existingEmployee.lastName,
                email: email || existingEmployee.email,
                department: department || existingEmployee.department,
                role: role || existingEmployee.role,
                status: status || existingEmployee.status,
                imageUrl: imageUrl !== undefined ? imageUrl : existingEmployee.imageUrl,
            },
        });

        return NextResponse.json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        return NextResponse.json(
            { error: 'Failed to update employee' },
            { status: 500 }
        );
    }
}

// DELETE - حذف موظف
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // التحقق من وجود الموظف
        const existingEmployee = await prisma.employee.findUnique({
            where: { id: params.id },
        });

        if (!existingEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        // حذف الموظف
        await prisma.employee.delete({
            where: { id: params.id },
        });

        return NextResponse.json(
            { message: 'Employee deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting employee:', error);
        return NextResponse.json(
            { error: 'Failed to delete employee' },
            { status: 500 }
        );
    }
}
