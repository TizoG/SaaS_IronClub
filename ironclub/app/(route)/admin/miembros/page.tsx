'use client';

import { Calendar, CreditCard, Plus, UserCheck, UserX } from 'lucide-react';
import Cards from './components/cards';
import { FormsButton } from './components/formsButton';
import { TableMiembros } from './components/tableMiembers';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Miembros() {
    const [activo, setActivo] = useState(0);
    const [inactivo, setInactivo] = useState(0);
    const [nuevo, setNuevo] = useState(0);
    const [suspendido, setSuspendido] = useState(0);

    useEffect(() => {
        axios
            .get('http://localhost:8000/users/users')
            .then((res) => {
                const users = res.data;
                setActivo(
                    users.filter((user: any) => user.state === 'activo').length
                );
                setInactivo(
                    users.filter((user: any) => user.state === 'inactivo')
                        .length
                );
                setNuevo(
                    users.filter((user: any) => user.state === 'nuevo').length
                );
                setSuspendido(
                    users.filter((user: any) => user.state === 'suspendido')
                        .length
                );
            })
            .catch((err) => console.error(err));
    });
    return (
        <section className="w-full min-h-screen overflow-x-hidden px-4 md:px-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Miembros</h1>
                    <p className="text-gray-600">
                        Administra todos los miembros del gimnasio
                    </p>
                </div>
                <FormsButton showCloseButton={false} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                <Cards
                    icon={<UserCheck className="w-6 h-6 text-green-600" />}
                    bgColor="bg-green-100"
                    name="Activos"
                    metric={activo}
                />
                <Cards
                    icon={<UserX className="w-6 h-6 text-red-600" />}
                    bgColor="bg-red-100"
                    name="Inactivos"
                    metric={inactivo}
                />
                <Cards
                    icon={<Calendar className="w-6 h-6 text-amber-600" />}
                    bgColor="bg-amber-100"
                    name="Nuevos este mes"
                    metric={nuevo}
                />
                <Cards
                    icon={<CreditCard className="w-6 h-6 text-blue-600" />}
                    bgColor="bg-blue-100"
                    name="Pagos pendientes"
                    metric={suspendido}
                />
            </div>
            <TableMiembros />
        </section>
    );
}
