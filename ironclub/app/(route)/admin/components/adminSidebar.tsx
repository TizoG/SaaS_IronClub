'use client';

import {
    Calendar,
    ChartColumn,
    CreditCard,
    Dumbbell,
    FileText,
    Group,
    Home,
    Inbox,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    UserCheck,
    Users2,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// Menu items.
const items = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Miembros',
        url: '/admin/miembros',
        icon: Users2,
    },
    {
        title: 'Clases',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Entrenadores',
        url: '#',
        icon: UserCheck,
    },
    {
        title: 'Planes Personalizados',
        url: '#',
        icon: FileText,
    },
    {
        title: 'Pagos',
        url: '#',
        icon: CreditCard,
    },
    {
        title: 'Análisis',
        url: '#',
        icon: ChartColumn,
    },
    {
        title: 'Configuración',
        url: '#',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    function LogoutButton() {
        const router = useRouter();

        const handleLogout = () => {
            // Borra el token o sesión
            localStorage.removeItem('token');
            // Redirecciona al inicio de sesión
            router.push('/');
        };

        return (
            <button
                onClick={handleLogout}
                className="hover:bg-red-500/20 hover:text-red-400 font-semibold flex items-center px-3 py-2 rounded-lg w-full"
            >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
            </button>
        );
    }

    return (
        <Sidebar className="bg-gray-900 text-white">
            <SidebarHeader className="border-b border-b-gray-50 ">
                <div className="flex items-center justify-center space-x-2 my-4 ">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <Dumbbell className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex flex-col ">
                        <span className="text-2xl font-bold ">IRON CLUB</span>
                        <span className="text-sm text-gray-50">
                            PANEL ADMIN
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="mt-2">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = item.url === pathname;
                                return (
                                    <Link href={item.url} key={item.title}>
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                className={`
                                                ${
                                                    isActive
                                                        ? 'bg-gray-700'
                                                        : ''
                                                } cursor-pointer
                                            `}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </Link>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-50">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <LogoutButton />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}
