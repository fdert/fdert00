import React from 'react';
import { FileText, Download } from 'lucide-react';

const reports = [
    { name: 'Headcount Report', description: 'Total number of employees by department and role.', date: 'Aug 1, 2025' },
    { name: 'New Hires', description: 'List of new employees joined in the last 30 days.', date: 'Aug 1, 2025' },
    { name: 'Terminations', description: 'Employees who have left the company recently.', date: 'Jul 28, 2025' },
    { name: 'Department Summary', description: 'Detailed breakdown of each department statistics.', date: 'Jul 15, 2025' },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-secondary-900">Reports</h1>
                <p className="mt-2 text-sm text-secondary-700">
                    Generate and download reports for your organization.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                    <div key={report.name} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-secondary-200 hover:shadow-md transition-shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-primary-100 rounded-md p-2">
                                        <FileText className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <h3 className="ml-3 text-lg font-medium text-secondary-900">{report.name}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <p className="text-sm text-secondary-500">{report.description}</p>
                            <p className="mt-2 text-xs text-secondary-400">Last generated: {report.date}</p>
                        </div>
                        <div className="px-4 py-4 sm:px-6 bg-secondary-50">
                            <button className="w-full flex justify-center items-center px-4 py-2 border border-secondary-300 shadow-sm text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                <Download className="h-4 w-4 mr-2 text-secondary-500" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
