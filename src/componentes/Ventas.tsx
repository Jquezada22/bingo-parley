import React, { useState } from "react";
import ButtonRegresar from "./shared/ButtonRegresar";
import { useNavigate } from 'react-router-dom';
import Modal from './shared/Modal';


const Ventas: React.FC = () => {
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const navigate = useNavigate();

    const calcularTotal = () => {
        const total = (parseFloat(cantidad) * parseFloat(precio) * (parseFloat(porcentaje) / 100)).toFixed(0);
        return total;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total = calcularTotal();
        localStorage.setItem('totalAJugar', total); // Guarda el total en localStorage
        setIsModalOpen(true); // Abre el modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCantidad('');
        setPrecio('');
        setPorcentaje('');
        navigate('/ventas'); // Navega a la página de Bingo
    };

    const isButtonDisabled = !cantidad || !precio || !porcentaje || isNaN(Number(cantidad)) || isNaN(Number(precio)) || isNaN(Number(porcentaje));

    return (
        <div className="py-10">
            <div className="mt-36 mx-auto max-w-md">
                <div className="bg-white py-4 px-4 shadow-md rounded-lg">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="block text-center text-gray-500 font-bold text-3xl uppercase">Ventas</h1>
                        </div>
                        <div>
                            <label htmlFor="cantidad" className="block md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
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
                        <div>
                            <label htmlFor="rondas" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Número de rondas
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese el número de rondas a jugar"
                                name="rondas"
                                id="rondas"
                            />
                        </div>
                        <div className="flex gap-4 justify-around">
                            <ButtonRegresar />
                            <button
                                type="submit"
                                className="bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-8 rounded-md ml-10 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isButtonDisabled}
                            >
                                Enviar al Bingo
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4">
                    <form>
                        <div>
                            <h1 className="block text-center text-gray-500 font-bold text-3xl uppercase mb-4">Control del Bingo</h1>
                        </div>
                        <div className="flex gap-4 justify-around">
                            <button className="bg-slate-700 hover:bg-slate-600 font-bold py-2 px-10 rounded-lg text-white">Generar Número</button>
                            <button className="bg-teal-700 hover:bg-teal-600 font-semibold py-2 px-10 rounded-lg text-white">Cantar Bingo</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold my-4">Se envio {calcularTotal()} soles al juego.</h2>
                <div className="mx-auto my-2">
                    <button onClick={handleCloseModal}
                        className="mx-20 my-4 py-2 px-6 bg-teal-700 hover:bg-teal-600 rounded-lg text-white font-semibold shadow-lg"
                    >Aceptar</button>
                </div>
            </Modal>
        </div>
    );
};

export default Ventas;
