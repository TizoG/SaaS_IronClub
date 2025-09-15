'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/animate-ui/components/radix/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Edit, Mail, Phone, UserCheck, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Usuario } from './tableMiembers';
import { useState } from 'react';

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    lastName: z
        .string()
        .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
    email: z.string().email({ message: 'Ingrese un correo válido.' }),
    phone: z
        .string()
        .min(10, { message: 'El teléfono debe tener al menos 10 dígitos.' }),
    membershipType: z
        .string()
        .min(1, { message: 'Seleccione un tipo de membresía.' }),
    state: z.string().min(1, { message: 'Seleccione un estado.' }),
});

type Props = {
    user: Usuario;
    onUpdate: () => void;
};

export const EditButton = ({ user, onUpdate }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.name,
            lastName: user.surname,
            email: user.email,
            phone: user.phone,
            membershipType: user.membership,
            state: user.state,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const payload = {
            name: values.firstName,
            surname: values.lastName,
            email: values.email,
            phone: values.phone,
            membership: values.membershipType,
            state: values.state,
        };

        console.log('Actualizando usuario con ID:', user.id);

        axios
            .put(`http://localhost:8000/users/users/${user.id}`, payload)
            .then((response) => {
                console.log('Usuario actualizado con éxito', response.data);
                toast.success('Usuario actualizado con éxito');
                form.reset(response.data);
                setOpen(false);
                onUpdate();
            })
            .catch((error) => {
                console.error('Error al actualizar el usuario', error);
                if (error.response?.data?.detail) {
                    toast.error(error.response.data.detail);
                } else {
                    toast.error('Error al actualizar el usuario');
                }
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-4 mb-2">
                            <UserCheck className="w-6 h-6 text-amber-600" />
                            Actualizar Miembro
                        </DialogTitle>
                    </DialogHeader>

                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="firstName"
                                    placeholder="Juan"
                                    {...form.register('firstName')}
                                    className="pl-10 placeholder:text-gray-400 focus:border-yellow-500"
                                />
                            </div>
                            {form.formState.errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input
                                id="lastName"
                                placeholder="Pérez"
                                {...form.register('lastName')}
                                className="placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 my-4">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="juan@email.com"
                                {...form.register('email')}
                                className="pl-10 placeholder:text-gray-400 focus:border-yellow-500"
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2 my-4">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                {...form.register('phone')}
                                className="pl-10 placeholder:text-gray-400 focus:border-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Membresía */}
                    <div className="space-y-2 my-4">
                        <Label>Tipo de membresía</Label>
                        <Controller
                            control={form.control}
                            name="membershipType"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="focus:border-yellow-500">
                                        <SelectValue placeholder="Selecciona tu membresía" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basic">
                                            Básica - $29/mes
                                        </SelectItem>
                                        <SelectItem value="premium">
                                            Premium - $49/mes
                                        </SelectItem>
                                        <SelectItem value="vip">
                                            VIP - $79/mes
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Estado */}
                    <div className="space-y-2 my-4">
                        <Label>Estado</Label>
                        <Controller
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="focus:border-yellow-500">
                                        <SelectValue placeholder="Selecciona el estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="activo">
                                            Activo
                                        </SelectItem>
                                        <SelectItem value="inactivo">
                                            Inactivo
                                        </SelectItem>
                                        <SelectItem value="suspendido">
                                            Suspendido
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Actualizar Miembro</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
