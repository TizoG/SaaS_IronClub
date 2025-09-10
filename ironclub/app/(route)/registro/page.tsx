// app/page.tsx

import { FormUser } from '@/components/componentForm/form';

export default function Home() {
    return (
        <section className="flex min-h-screen overflow-y-hidden">
            {/* Columna izquierda con imagen */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center overflow-y-hidden"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1676109829011-a9f0f3e40f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3ZWlnaHRzJTIwZml0bmVzcyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTcwNjM2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080')",
                }}
            >
                <div className="flex flex-col justify-end p-10 bg-black/40 w-full text-white">
                    <h2 className="text-3xl font-bold mb-2">
                        ÚNETE A{' '}
                        <span className="text-yellow-400">IRON CLUB</span>
                    </h2>
                    <p className="text-sm">Tu transformación comienza aquí</p>
                </div>
            </div>

            {/* Columna derecha con formulario */}
            <div className=" flex w-full md:w-1/2 items-center justify-center bg-[#0f0f12]">
                <div className="w-full max-w-md bg-[#1c1c1f] rounded-xl shadow-lg p-8">
                    {/* Formulario */}
                    <FormUser />

                    {/* Footer */}
                </div>
            </div>
        </section>
    );
}
