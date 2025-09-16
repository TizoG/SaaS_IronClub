'use client';

import { Calendar, Hourglass, MapPin, Users2, UserX } from 'lucide-react';
import Cards from '../miembros/components/cards';
import { useState } from 'react';

export default function Clases() {
    const [clases, setClases] = useState(0);
    const [participantes, setParticipantes] = useState(0);
    const [zonas, setZonas] = useState(0);
    const [horas, setHoras] = useState(0);
    return (
        <section className="w-full min-h-screen overflow-x-hidden px-4 md:px-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Clases</h1>
                    <p className="text-gray-600">
                        Administra el horario y las clases del gimnasio
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                <Cards
                    icon={<Calendar className="w-6 h-6 text-green-600" />}
                    bgColor="bg-green-100"
                    name="Clases hoy"
                    metric={clases}
                />
                <Cards
                    icon={<Users2 className="w-6 h-6 text-violet-600" />}
                    bgColor="bg-violet-100"
                    name="Participantes"
                    metric={participantes}
                />
                <Cards
                    icon={<MapPin className="w-6 h-6 text-amber-600" />}
                    bgColor="bg-amber-100"
                    name="Zona de clase"
                    metric={zonas}
                />
                <Cards
                    icon={<Hourglass className="w-6 h-6 text-blue-600" />}
                    bgColor="bg-blue-100"
                    name="Horas Programadas"
                    metric={horas}
                />
            </div>
        </section>
    );
}
