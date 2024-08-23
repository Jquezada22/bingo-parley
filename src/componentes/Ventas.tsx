import React, { useState } from "react";
import ButtonRegresar from "./shared/ButtonRegresar";
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const Ventas: React.FC = () => {
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [porcentajeCasa, setPorcentajeCasa] = useState('');
    const [porcentajeApagon, setPorcentajeApagon] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const calcularTotal = () => {
        const totalVenta = parseFloat(cantidad) * parseFloat(precio);

        // Calcula los montos basados en los porcentajes ingresados
        const totalAJugar = (totalVenta * (parseFloat(porcentaje) / 100)).toFixed(2);
        const totalCasa = (totalVenta * (parseFloat(porcentajeCasa) / 100)).toFixed(2);
        const totalApagon = (totalVenta * (parseFloat(porcentajeApagon) / 100)).toFixed(2);

        return { totalAJugar, totalApagon, totalCasa };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que la suma de los porcentajes no exceda el 100%
        const sumaPorcentajes = parseFloat(porcentaje) + parseFloat(porcentajeCasa) + parseFloat(porcentajeApagon);
        if (sumaPorcentajes > 100) {
            setErrorMessage('La suma de los porcentajes no puede exceder el 100%');
            return;
        }

        // Limpiar el mensaje de error si la validación es correcta
        setErrorMessage('');

        const { totalAJugar, totalApagon, totalCasa } = calcularTotal();
        localStorage.setItem('totalAJugar', totalAJugar);
        localStorage.setItem('totalApagon', totalApagon);
        localStorage.setItem('totalCasa', totalCasa);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCantidad('');
        setPrecio('');
        setPorcentaje('');
        setPorcentajeCasa('');
        setPorcentajeApagon('');
        navigate('/ventas');
    };

    const goReportes = () => {
        navigate('/reportes');
    };

    const isButtonDisabled = !cantidad || !precio || !porcentaje || !porcentajeCasa || !porcentajeApagon ||
        isNaN(Number(cantidad)) || isNaN(Number(precio)) || isNaN(Number(porcentaje)) || isNaN(Number(porcentajeCasa)) || isNaN(Number(porcentajeApagon));

    return (
        <div className="py-10">
            <h1 className="text-center md:text-5xl lg:text-6lg font-bold my-5 uppercase">
                Administración bingo parley
            </h1>
            <div className="mt-8 mx-auto max-w-md">
                <div className="bg-white py-4 px-4 shadow-md rounded-lg">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="block text-center text-gray-500 font-bold text-3xl uppercase">Ventas</h1>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-center font-bold">
                                {errorMessage}
                            </div>
                        )}
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
                            <label htmlFor="porcentajeCasa" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Porcentaje de la casa
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese el porcentaje para la casa"
                                name="porcentajeCasa"
                                id="porcentajeCasa"
                                value={porcentajeCasa}
                                onChange={(e) => setPorcentajeCasa(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="porcentajeApagon" className="block sm:text-1xl md:text-1xl lg:text-1xl uppercase text-gray-500 mb-3 font-bold">
                                Porcentaje apagón
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingrese el porcentaje para el apagón"
                                name="porcentajeApagon"
                                id="porcentajeApagon"
                                value={porcentajeApagon}
                                onChange={(e) => setPorcentajeApagon(e.target.value)}
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
                            <button className="bg-slate-700 hover:bg-slate-600 py-2 px-8 rounded-lg text-white">Generar Número</button>
                            <button className="bg-teal-700 hover:bg-teal-600 py-2 px-8 rounded-lg text-white">Cantar Bingo</button>
                            <button className="bg-orange-700 hover:bg-orange-600 py-2 px-8 rounded-lg text-white"
                                onClick={goReportes}>Reportes</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="flex flex-col mx-auto my-2">
                    <div>
                        <h2 className="text-xl font-semibold my-4 uppercase">
                            Se envió {calcularTotal().totalAJugar} soles al juego.<br />
                            Se envió {calcularTotal().totalApagon} soles al apagón.<br />
                            Se envió {calcularTotal().totalCasa} soles a la casa.
                        </h2>
                    </div>
                    <div className="mx-auto">
                        <button onClick={handleCloseModal}
                            className="mx-20 my-4 py-2 px-6 bg-teal-700 hover:bg-teal-600 rounded-lg text-white font-semibold shadow-lg"
                        >Aceptar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Ventas;
