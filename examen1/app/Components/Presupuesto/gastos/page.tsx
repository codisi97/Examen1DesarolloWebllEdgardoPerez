'use client'

import { useState } from "react";
import { useContextGastos } from "../../../Provider/ProviderGastos";

export default function page() {

  const {
        presupuesto,
        gastos,
        agregarGasto, 
        eliminarGasto
      } = useContextGastos();

  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState("");

  const totalGastado = gastos.reduce(
        (total, gasto) => total + Number(gasto.monto),
        0
  );

  const porcentaje = (totalGastado / presupuesto) * 100;

  function guardar() {

        agregarGasto({categoria,monto,fecha}, 1);
        setCategoria("");
        setMonto(0);
        setFecha("");
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-zinc-50 p-8">

            <div className="w-full max-w-3xl bg-white shadow-md rounded p-6">

                <h1 className="text-2xl font-bold text-center mb-6 text-black">
                    Presupuesto Establecido Lps. {presupuesto}
                </h1>

                {
                    porcentaje >= 80 && porcentaje < 100 &&
                    <div className="bg-yellow-200 text-yellow-800 p-3 rounded mb-4">
                        Ha alcanzado el 80% del presupuesto
                    </div>
                }

                {
                    porcentaje >= 100 &&
                    <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
                        Has superado el limite del presupuesto
                    </div>
                }

                <div className="grid grid-cols-2 gap-4 mb-4">

                    <input
                        type="number"
                        placeholder="Monto"
                        className="border rounded p-2 text-black placeholder-gray-500"
                        value={monto}
                        onChange={(e) => setMonto(Number(e.target.value))}
                    />

                    <input
                        type="text"
                        placeholder="Categoría"
                        className="border rounded p-2 text-black placeholder-gray-500"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />

                    <input
                        type="date"
                        className="border rounded p-2 text-black"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />

                </div>

                <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
                    onClick={guardar}
                >
                    Guardar Gasto
                </button>

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-200 text-black">

                            <th className="border p-2">Monto</th>
                            <th className="border p-2">Categoria</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Eliminar</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            gastos.map((gasto) => (

                                <tr key={gasto.idgasto} className="text-center text-black">

                                    <td className="border p-2">
                                        {gasto.monto}
                                    </td>

                                    <td className="border p-2">
                                        {gasto.categoria}
                                    </td>

                                    <td className="border p-2">
                                        {gasto.fecha}
                                    </td>

                                    <td className="border p-2">

                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => eliminarGasto(gasto.idgasto!)}
                                        >
                                            Borrar
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}