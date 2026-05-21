'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContextGastos } from "../../Provider/ProviderGastos";

export default function page() {

    const router = useRouter();
    const { guardarPresupuesto } = useContextGastos();

    const [monto, setMonto] = useState(0);

    function guardar() {
        guardarPresupuesto(monto);
        router.push("/gastos");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">

            <div className="w-96 bg-white shadow-md rounded p-6">

                <h1 className="text-center font-bold mb-6 text-black">
                    Establecer Presupuesto Mensual
                </h1>

                <input
                    type="number"
                    placeholder="Monto de presupuesto Mensual"
                    className="w-full border rounded p-2 mb-4 text-black placeholder-gray-500"
                    onChange={(e) => setMonto(Number(e.target.value))}
                />

                <button
                    type="button"
                    className="bg-blue-600 text-white rounded px-4 py-2 w-full"
                    onClick={guardar}
                >
                    Guardar Presupuesto
                </button>

            </div>

        </div>
    )
}