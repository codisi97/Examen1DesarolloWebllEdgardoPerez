'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Vista } from '../Modelos/Vista';
import { Gasto } from '../Modelos/Gasto';
import { contextGastos } from '../Context/ContextGastos';

export default function ProviderGastos({ children }: Vista) {

    const [presupuesto, setPresupuesto] = useState(0);
    const [gastos, setGastos] = useState<Gasto[]>([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);

    function iniciarSesion(usuario: string, clave: string) {
        if (usuario === "admin" && clave === "admin123") {
            setUsuarioLogueado(true);
            alert("Inicio de sesión correcto");
        } else {
            alert("Usuario o clave incorrectos");
        }
    }

    function guardarPresupuesto(monto: number) {
        setPresupuesto(monto);
        alert("Presupuesto guardado correctamente");
    }

    async function obtenerGastos() {
        const response = await fetch('http://localhost:5000/gasto');
        const data = await response.json();
        setGastos(data);
    }

    async function agregarGasto(gasto: Gasto, opcion: number) {

        if (opcion === 1) {
            const response = await fetch('http://localhost:5000/gasto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gasto),
            });

            if (response.ok) {
                obtenerGastos();
                alert('Gasto agregado correctamente');
            } else {
                console.log('Error al agregar el gasto');
            }
        } else {
            const response = await fetch(`http://localhost:5000/gasto/${gasto.idgasto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gasto),
            });

            if (response.ok) {
                obtenerGastos();
                alert('Gasto actualizado correctamente');
            } else {
                console.log('Error al actualizar el gasto');
            }
        }
    }

    async function eliminarGasto(idgasto: number) {
        const response = await fetch(`http://localhost:5000/gasto/${idgasto}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            obtenerGastos();
            alert('Gasto eliminado correctamente');
        }
    }

    useEffect(() => {
        obtenerGastos();
    }, []);

    return (
        <div>
            <contextGastos.Provider value={{
                presupuesto,
                gastos,
                usuarioLogueado,
                iniciarSesion,
                guardarPresupuesto,
                obtenerGastos,
                agregarGasto,
                eliminarGasto
            }}>
                {children}
            </contextGastos.Provider>
        </div>
    )
}

export function useContextGastos() {
    return useContext(contextGastos);
}