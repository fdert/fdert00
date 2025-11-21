import React from 'react';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-secondary-900">Settings</h1>
                <p className="mt-2 text-sm text-secondary-700">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <p className="text-secondary-500">Settings configuration will go here.</p>
            </div>
        </div>
    );
}
