import type { Metadata } from 'next';
import { Nunito_Sans, Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const nunito = Nunito({
    variable: '--font-nuito',
    subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Dashboard Iron Club',
    description:
        'Dashboard Iron Club | Control de Asistencia, Suscripciones y Pagos',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${nunito.className}  antialiased bg-gray-100`}>
                {children}
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}
