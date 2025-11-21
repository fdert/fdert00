import React from 'react';
import { employees } from '@/lib/data';
import { Plus, Search, Filter, MoreVertical, Printer, Edit2, Trash2 } from 'lucide-react';

export default function EmployeesPage() {
    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-secondary-900">Employees</h1>
                    <p className="mt-2 text-sm text-secondary-700">
                        A list of all the employees in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-secondary-200">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Search employees..."
                    />
                </div>
                <div className="flex gap-2">
                    <button className="inline-flex items-center px-3 py-2 border border-secondary-300 shadow-sm text-sm leading-4 font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <Filter className="h-4 w-4 mr-2 text-secondary-500" />
                        Filter
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-secondary-300 shadow-sm text-sm leading-4 font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <Printer className="h-4 w-4 mr-2 text-secondary-500" />
                        Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-secondary-300">
                                <thead className="bg-secondary-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-secondary-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-secondary-200 bg-white">
                                    {employees.map((person) => (
                                        <tr key={person.email} className="hover:bg-secondary-50 transition-colors">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-10 w-10 rounded-full object-cover" src={person.imageUrl} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-secondary-900">{person.firstName} {person.lastName}</div>
                                                        <div className="text-secondary-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-500">
                                                <div className="text-secondary-900">{person.role}</div>
                                                <div className="text-secondary-500">{person.department}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-500">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${person.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        person.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {person.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-500">{person.role}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <button className="text-primary-600 hover:text-primary-900">
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
