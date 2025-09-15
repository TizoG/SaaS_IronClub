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
import {
    Calendar,
    Mail,
    Phone,
    Plus,
    User,
    UserCheck,
    Lock,
    EyeOff,
    Eye,
} from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
    showCloseButton: boolean;
};

const formSchema = z
    .object({
        firstName: z
            .string()
            .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
        lastName: z.string().min(2, {
            message: 'El apellido debe tener al menos 2 caracteres.',
        }),
        email: z.string().email({ message: 'Ingrese un correo válido.' }),
        phone: z.string().min(10, {
            message: 'El teléfono debe tener al menos 10 dígitos.',
        }),
        dateOfBirth: z
            .string()
            .min(1, { message: 'Seleccione una fecha válida.' }),
        membershipType: z
            .string()
            .min(1, { message: 'Seleccione un tipo de membresía.' }),
        role: z.string().min(1, { message: 'Seleccione un rol.' }),
        state: z.string().min(1, { message: 'Seleccione un estado.' }),
        password: z.string().min(6, {
            message: 'La contraseña debe tener al menos 6 caracteres.',
        }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Confirme su contraseña.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    });

export const FormsButton = ({ showCloseButton }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            membershipType: '',
            role: '',
            state: '',
            password: '',
            confirmPassword: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            name: values.firstName,
            surname: values.lastName,
            email: values.email,
            phone: values.phone,
            birthdate: values.dateOfBirth,
            membership: values.membershipType,
            role: values.role,
            state: values.state,
            password: values.password,
            // Opcionales
            photo: null,
            address: null,
            emergency_contact: null,
            tall: null,
            weight: null,
            fitness_level: null,
            fitness_objective: null,
            medical_condition: null,
            allergies: null,
            class_reminder: false,
            payment_reminder: false,
            class_summary: false,
            promotions_offers: false,
            social_updates: false,
            visible_profile: false,
            share_progress: false,
            show_ranking: false,
        };

        axios
            .post('http://localhost:8000/users/users/', payload)
            .then((response) => {
                console.log('Usuario creado con éxito', response.data);
                toast.success('Cuenta creada con éxito');
                form.reset();
            })
            .catch((error) => {
                console.error('Error al crear el usuario', error);
                if (error.response?.data?.detail) {
                    toast.error(error.response.data.detail);
                } else {
                    toast.error('Error al crear el usuario');
                }
            });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                    Nuevo Miembro
                </Button>
            </DialogTrigger>
            <DialogContent
                title="Edit profile"
                showCloseButton={showCloseButton}
                className="sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] overflow-y-auto"
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader className="">
                        <DialogTitle className="flex items-center gap-4 mb-2">
                            <UserCheck
                                className="w-6 h-6 text-amber-600"
                                aria-hidden="true"
                            />
                            Nuevo Miembro
                        </DialogTitle>
                    </DialogHeader>

                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-2 gap-4 space-y-4 my-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
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
                            <Mail
                                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
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
                            <Phone
                                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                {...form.register('phone')}
                                className="pl-10 placeholder:text-gray-400 focus:border-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="space-y-2 my-4">
                        <Label htmlFor="dateOfBirth">Fecha de nacimiento</Label>
                        <div className="relative">
                            <Calendar
                                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                            <Input
                                id="dateOfBirth"
                                type="date"
                                {...form.register('dateOfBirth')}
                                className="pl-10 focus:border-yellow-500"
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
                        {form.formState.errors.membershipType && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.membershipType.message}
                            </p>
                        )}
                    </div>

                    {/* Rol */}
                    <div className="space-y-2 my-4">
                        <Label>Rol</Label>
                        <Controller
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="focus:border-yellow-500">
                                        <SelectValue placeholder="Selecciona el rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">
                                            Usuario
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Administrador
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.role && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.role.message}
                            </p>
                        )}
                    </div>
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
                                        <SelectValue placeholder="Selecciona el rol" />
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
                        {form.formState.errors.role && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="space-y-2 my-4">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...form.register('password')}
                                className="pl-10 pr-10 placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-black"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="space-y-2 my-4">
                        <Label htmlFor="confirmPassword">
                            Confirmar contraseña
                        </Label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...form.register('confirmPassword')}
                                className="pl-10 pr-10 placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-black"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Crear Miembro</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
