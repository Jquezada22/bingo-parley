import React from "react";
import ButtonRegresar from "./shared/ButtonRegresar";

const Ventas: React.FC = () => {

    return (
        <div className="py-10">
            <h1 className="text-center sm:text-4xl md:text-5xl lg:text-6lg font-semibold my-5">
                Venta de cartillas para Bingo Parley</h1>
            <div className="mt-8 mx-auto max-w-md">
                <div className="bg-white py-8 px-4 shadow-md">
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="cantidad" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold"
                            >
                                Cartillas vendidas
                            </label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text" placeholder="Ingrese la cantidad vendida" name="cantidad" id="cantidad" />
                        </div>
                        <div>
                            <label htmlFor="precio" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold"
                            >
                                Precio de cartilla
                            </label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text" placeholder="Ingrese el precio" name="precio" id="precio" />
                        </div>
                        <ButtonRegresar />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ventas;