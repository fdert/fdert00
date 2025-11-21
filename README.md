# Employee Management System

A modern, responsive web application for managing employee records.

## Features

- **Dashboard**: Overview of key metrics (Total Employees, New Hires, etc.).
- **Employee Management**: List, search, and filter employees.
- **Reports**: Access and download reports.
- **Authentication**: Secure login page (UI only for now).
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: Application source code (Next.js App Router).
  - `(auth)/`: Authentication routes (Login).
  - `(dashboard)/`: Main application routes (Dashboard, Employees, Reports).
- `components/`: Reusable UI components.
- `lib/`: Utility functions and mock data.
