import { createContext } from "react";
import { Gasto } from "../Modelos/Gasto";

export const contextGastos = createContext({
    presupuesto: 0,
    gastos: [] as Gasto[],
    usuarioLogueado: false,

    iniciarSesion: (usuario: string, clave: string) => {},
    guardarPresupuesto: (monto: number) => {},
    obtenerGastos: () => {},
    agregarGasto: (gasto: Gasto, opcion: number) => {},
    eliminarGasto: (idgasto: number) => {},
});