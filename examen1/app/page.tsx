'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContextGastos } from "./Provider/ProviderGastos";

export default function Home() {

  const router = useRouter();

  const { iniciarSesion } = useContextGastos();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  function login() {
    iniciarSesion(usuario, clave);

    if (usuario === "admin" && clave === "admin123") {
      router.push("/presupuesto");
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans">

      <h1 className="text-2xl font-bold mb-6 text-black">Gastos Personales</h1>

      <form className="w-96 bg-white shadow-md rounded p-6">

        <h3 className="text-center font-bold mb-4 text-black">Inicio de Sesion</h3>

        <input
          type="text"
          placeholder="Usuario"
          className="w-full border rounded p-2 mb-3 text-black"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Clave"
          className="w-full border rounded p-2 mb-3 text-black"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <button
          type="button"
          className="bg-blue-600 text-white rounded px-4 py-2 w-full"
          onClick={login}
        >
          Iniciar Sesion
        </button>

      </form>

    </div>
  );
}