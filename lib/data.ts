export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    imageUrl: string;
}

export const employees: Employee[] = [
    {
        id: '1',
        firstName: 'Jane',
        lastName: 'Cooper',
        email: 'jane.cooper@example.com',
        department: 'Human Resources',
        role: 'HR Manager',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: '2',
        firstName: 'Cody',
        lastName: 'Fisher',
        email: 'cody.fisher@example.com',
        department: 'Engineering',
        role: 'Software Engineer',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: '3',
        firstName: 'Esther',
        lastName: 'Howard',
        email: 'esther.howard@example.com',
        department: 'Design',
        role: 'Creative Director',
        status: 'On Leave',
        imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: '4',
        firstName: 'Jenny',
        lastName: 'Wilson',
        email: 'jenny.wilson@example.com',
        department: 'Marketing',
        role: 'Marketing Lead',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        id: '5',
        firstName: 'Kristin',
        lastName: 'Watson',
        email: 'kristin.watson@example.com',
        department: 'Sales',
        role: 'Sales Manager',
        status: 'Terminated',
        imageUrl: 'https://images.unsplash.com/photo-1532417344469-368f9df6d9ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
];
