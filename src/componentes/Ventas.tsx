import React, { useState } from "react";
import ButtonRegresar from "./shared/ButtonRegresar";
import { useNavigate } from 'react-router-dom';

const Ventas: React.FC = () => {
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const navigate = useNavigate();

    const calcularTotal = () => {
        const total = (parseFloat(cantidad) * parseFloat(precio) * (parseFloat(porcentaje) / 100)).toFixed(2);
        return total;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total = calcularTotal();
        navigate('/bingo', { state: { total } });
    };

    return (
        <div className="py-10">
            <h1 className="text-center sm:text-4xl md:text-5xl lg:text-6lg font-semibold my-5">
                Venta de cartillas para Bingo Parley
            </h1>
            <div className="mt-8 mx-auto max-w-md">
                <div className="bg-white py-8 px-4 shadow-md">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cantidad" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Cartillas vendidas
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese la cantidad vendida"
                                name="cantidad"
                                id="cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="precio" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Precio de cartilla
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese el precio"
                                name="precio"
                                id="precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="porcentaje" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Porcentaje de premio
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese el porcentaje a jugar"
                                name="porcentaje"
                                id="porcentaje"
                                value={porcentaje}
                                onChange={(e) => setPorcentaje(e.target.value)}
                            />
                        </div>
                        <ButtonRegresar />
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-md ml-10">
                            Enviar al Bingo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Ventas;
