'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dumbbell,
    Mail,
    Lock,
    User,
    Calendar,
    Eye,
    EyeOff,
    Phone,
    Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Link from 'next/link';

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

export function FormUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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
            password: '',
            confirmPassword: '',
        },
    });

    // Creamos con axios una peticion a la api
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Preparamos los datos para enviarlos a la api
        const payload = {
            name: values.firstName,
            surname: values.lastName,
            email: values.email,
            phone: values.phone,
            birthdate: values.dateOfBirth,
            membership: values.membershipType,
            role: values.role,
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
                console.log('Usuario creado con exito', response.data);
                toast.success('Cuenta creada con exito');
                form.reset();
            })
            .catch((error) => {
                console.log('Error al crear el usuario', error);
                toast.error('Error al crear el usuario');
            });
    }

    return (
        <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm my- overflow-y-hidden">
            <CardHeader className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
                        <Dumbbell className="h-6 w-6 text-black" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                        IRON CLUB
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Crear cuenta
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Completa tus datos para unirte
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="firstName"
                                className="text-gray-300"
                            >
                                Nombre
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="firstName"
                                    placeholder="Juan"
                                    {...form.register('firstName')}
                                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                                />
                            </div>
                            {form.formState.errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-300">
                                Apellido
                            </Label>
                            <Input
                                id="lastName"
                                placeholder="Pérez"
                                {...form.register('lastName')}
                                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="juan@email.com"
                                {...form.register('email')}
                                className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">
                            Teléfono
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                {...form.register('phone')}
                                className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-gray-300">
                            Fecha de nacimiento
                        </Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="dateOfBirth"
                                type="date"
                                {...form.register('dateOfBirth')}
                                className="pl-10 bg-gray-700/50 border-gray-600 text-white focus:border-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Membresía */}
                    <div className="space-y-2">
                        <Label className="text-gray-300">
                            Tipo de membresía
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                form.setValue('membershipType', value)
                            }
                        >
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-yellow-500">
                                <SelectValue placeholder="Selecciona tu membresía" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem
                                    value="basic"
                                    className="text-white hover:bg-gray-700"
                                >
                                    Básica - $29/mes
                                </SelectItem>
                                <SelectItem
                                    value="premium"
                                    className="text-white hover:bg-gray-700"
                                >
                                    Premium - $49/mes
                                </SelectItem>
                                <SelectItem
                                    value="vip"
                                    className="text-white hover:bg-gray-700"
                                >
                                    VIP - $79/mes
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.membershipType && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.membershipType.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Rol</Label>
                        <Select
                            onValueChange={(value) =>
                                form.setValue('role', value)
                            }
                        >
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-yellow-500">
                                <SelectValue placeholder="Selecciona el rol" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem
                                    value="user"
                                    className="text-white hover:bg-gray-700"
                                >
                                    Usuario
                                </SelectItem>
                                <SelectItem
                                    value="admin"
                                    className="text-white hover:bg-gray-700"
                                >
                                    Administrador
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.role && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...form.register('password')}
                                className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-gray-300"
                        >
                            Confirmar contraseña
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...form.register('confirmPassword')}
                                className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Botón */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                    >
                        {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {loading ? 'Registrando...' : 'Registrarme'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-gray-400 mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <Button
                            variant="link"
                            className="text-yellow-400 hover:text-yellow-300 p-0"
                        >
                            <Link href={'/'}>Inicia sesión aquí</Link>
                        </Button>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
