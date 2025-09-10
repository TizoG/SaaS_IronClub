'use client';

import { Dumbbell, Mail, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import z, { email } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email({ message: 'Ingrese un correo válido.' }),
    password: z.string().min(4, {
        message: 'La contraseña debe tener al menos 4 caracteres.',
    }),
});
export function FormLogins() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post(
                'http://localhost:8000/users/users/login',
                {
                    email: values.email,
                    password: values.password,
                }
            );
            const data = await response.data;
            localStorage.setItem('token', data.token);

            toast.success('Usuario logeado ✅');

            // 👉 ejemplo de respuesta esperada del backend
            // response.data = { token: "xxx", role: "admin" | "user" }

            if (response.data.role === 'admin') {
                router.push('/admin/dashboard'); // dashboard admin
            } else {
                router.push('/user/dashboard'); // dashboard user
            }
        } catch (error) {
            console.error('Error al logearse:', error);
            toast.error('Error al logearse ❌');
        }
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
                        Bienvenido de nuevo
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Ingresa a tu cuenta para continuar
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                                Email
                            </Label>
                            <div className="relative flex items-center ">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="tu@email.com"
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
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">
                                Password
                            </Label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    {...form.register('password')}
                                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                                />
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                        >
                            Iniciar Sesión
                        </Button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-gray-400 mt-4">
                        ¿No tienes cuenta?{' '}
                        <Button
                            variant="link"
                            className="text-yellow-400 hover:text-yellow-300 p-0"
                        >
                            <Link href="/registro">Registrate aquí</Link>
                        </Button>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
