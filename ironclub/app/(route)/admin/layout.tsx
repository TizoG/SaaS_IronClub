'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './components/adminSidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, [router]);

    return (
        <SidebarProvider>
            <div className="flex w-screen min-h-screen overflow-x-hidden">
                <AdminSidebar />
                <main className="flex-1 w-full overflow-x-hidden">
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
