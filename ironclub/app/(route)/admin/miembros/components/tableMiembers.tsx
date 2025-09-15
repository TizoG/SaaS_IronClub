'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Edit, Mail, Phone, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditButton } from './editButtom';
import { DeleteButton } from './deleteButton';
export type Usuario = {
    id: number;
    photo: string;
    name: string;
    surname: string;
    created_at: Date;
    updated_at: Date;
    email: string;
    phone: string;
    membership: string;
    state?: string;
    last_login?: Date;
    role: string;
    password: string;
    birthdate: Date;
    address: string;
};
type Estado = 'activo' | 'suspendido' | 'inactivo';
type Membrisa = 'basic' | 'premium' | 'vip';
type TextColor =
    | 'activo'
    | 'suspendido'
    | 'inactivo'
    | 'basic'
    | 'premium'
    | 'vip';
export const TableMiembros = () => {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [status, setEstatus] = useState<string>('todos');
    const [search, setSearch] = useState<string>('');
    const colorEstado: Record<Estado, string> = {
        activo: 'bg-green-300/50',
        suspendido: 'bg-red-300/50',
        inactivo: 'bg-yellow-300/50',
    };
    const colorMembrisa: Record<Membrisa, string> = {
        basic: 'bg-blue-300/50',
        premium: 'bg-yellow-300/50',
        vip: 'bg-violet-300/50',
    };

    const textColor: Record<TextColor, string> = {
        activo: 'text-green-900',
        suspendido: 'text-red-900',
        inactivo: 'text-yellow-900',
        basic: 'text-blue-900',
        premium: 'text-yellow-900',
        vip: 'text-violet-900',
    };

    const actualizarTabla = () => {
        axios
            .get('http://localhost:8000/users/users') // siempre traes todos
            .then((res) => {
                let filtered = res.data;

                // Filtrar por estado
                if (status !== 'todos') {
                    filtered = filtered.filter(
                        (u: Usuario) =>
                            u.state?.toLowerCase() === status.toLowerCase()
                    );
                }

                // Filtrar por búsqueda
                if (search.trim() !== '') {
                    const query = search.toLowerCase();
                    filtered = filtered.filter(
                        (u: Usuario) =>
                            u.name.toLowerCase().includes(query) ||
                            u.surname.toLowerCase().includes(query) ||
                            `${u.name} ${u.surname}`
                                .toLowerCase()
                                .includes(query)
                    );
                }

                setUsers(filtered);
            })
            .catch((err) => console.error(err));
    };

    // Se ejecuta cada vez que cambia status o search
    useEffect(() => {
        actualizarTabla();
    }, [status, search]);

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '—';
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatLastLogin = (date?: string | Date) => {
        if (!date) return '—'; // ya cubre undefined y null
        const d = new Date(date);
        const now = new Date();
        const diffTime = now.getTime() - d.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `hace ${diffDays} días. `;
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="mt-8  border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between p-8 bg-gray-200 rounded-lg">
                <p>Lista de Miembros ({users.length})</p>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />
                        <Input
                            id="firstName"
                            placeholder="Juan"
                            className="pl-10 placeholder:text-gray-400 focus:border-yellow-500 bg-gray-50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={actualizarTabla}
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        Buscar
                    </Button>
                    <Select
                        defaultValue="todos"
                        onValueChange={(e) => setEstatus(e)}
                    >
                        <SelectTrigger className="focus:border-yellow-500 bg-gray-50">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="activo">Activos</SelectItem>
                            <SelectItem value="inactivo">Inactivos</SelectItem>
                            <SelectItem value="suspendido">
                                Suspendidos
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {users.length === 0 ? (
                <p>No hay miembros</p>
            ) : (
                <table className="w-full">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Miembro
                            </th>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Contacto
                            </th>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Membrísa
                            </th>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Estado
                            </th>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Última Visita
                            </th>
                            <th className="text-left p-4 font-medium text-gray-600">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.email} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src={
                                                    `${user.photo}` ||
                                                    'https://media.istockphoto.com/id/1364105164/es/foto/holograma-de-cabeza-humana-deep-learning-and-artificial-intelligence-abstract-background.jpg?s=2048x2048&w=is&k=20&c=3d374BLP30Y2DwUmBfnuksgVdyQ1_ujHIC2Q01UqyIM='
                                                }
                                                alt="Avatar"
                                            />
                                            <AvatarFallback className="bg-gray-200">
                                                {user.name}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex gap-2">
                                                <p className="font-medium text-gray-900">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.name
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {user.surname
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.surname
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(user.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Mail className="h-3 w-3 text-gray-400" />
                                        <span className="text-gray-600">
                                            {user.email}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Phone className="h-3 w-3 text-gray-400" />
                                        <span className="text-gray-600">
                                            {user.phone}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Badge
                                        className={
                                            colorMembrisa[
                                                user.membership as Membrisa
                                            ] || 'bg-gray-500'
                                        }
                                    >
                                        <span
                                            className={
                                                textColor[
                                                    user.membership as TextColor
                                                ] || 'text-gray-500'
                                            }
                                        >
                                            {user.membership}
                                        </span>
                                    </Badge>
                                </td>

                                <td className="p-4">
                                    <Badge
                                        className={
                                            colorEstado[user.state as Estado]
                                        }
                                    >
                                        <span
                                            className={
                                                textColor[
                                                    user.state as TextColor
                                                ] || 'text-gray-500'
                                            }
                                        >
                                            {user.state}
                                        </span>
                                    </Badge>
                                </td>
                                <td className="p-4 text-gray-600">
                                    {formatLastLogin(user.last_login)}
                                </td>
                                <td className="p-4">
                                    <div
                                        className="flex items-center space-x-2"
                                        key={user.id}
                                    >
                                        <EditButton
                                            user={user}
                                            onUpdate={actualizarTabla}
                                        />
                                        <DeleteButton
                                            user={user}
                                            onUpdate={actualizarTabla}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
