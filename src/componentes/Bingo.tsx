import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import ButtonRegresar from './shared/ButtonRegresar';
import { useBingoLogic } from '../hooks/useBingoLogic';

const Bingo: React.FC = () => {
    const { state } = useLocation();
    const [total, setTotal] = useState<string>('0.00');
    const { numbers, lastThreeNumbers, generateRandomNumber, currentNumber } = useBingoLogic();

    useEffect(() => {
        // Leer el valor inicial de total desde localStorage o state
        const storedTotal = state?.total || localStorage.getItem('totalAJugar') || '0.00';
        setTotal(storedTotal);
    }, [state?.total]);

    const handleResetGame = () => {
        localStorage.setItem('totalAJugar', '0.00'); // Reinicia el valor de total a 0
        setTotal('0.00'); // Actualiza el estado de total
        window.location.reload(); // Recarga la página
    };

    // Validar si el botón de generar número debe estar habilitado
    const isGenerateButtonDisabled = total === '0.00';

    return (
        <>
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-0 font-semibold text-center text-slate-900">
                    BINGO PARLEY
                </h1>
                <div className="flex items-start justify-between w-full max-w-7xl">
                    <h1 className='text-normal sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl mt-4 -ml-32'>Total a jugar: {total} soles</h1>
                </div>
                <div className="flex flex-col md:py-2 lg:py-2 sm:flex-row md:flex-row items-start justify-between max-w-max shadow-lg mt-8">
                    <div className="grid sm:grid-cols-8 md:grid-cols-8 md:gap-2 lg:grid-cols-15 lg:gap-4 xl:grid-cols-15 xl:gap-5 w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
                        {Array.from({ length: 75 }, (_, index) => {
                            const num = index + 1;
                            return (
                                <div
                                    key={num}
                                    className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 flex items-center justify-center rounded-full text-white font-semibold text-2xl ${numbers.includes(num) ? 'bg-yellow-600' : 'bg-gray-400'}`}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-center gap-4 mx-2">
                        <div className="flex gap-4">
                            <button
                                onClick={generateRandomNumber}
                                className={classNames(
                                    'px-1 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-8 lg:py-2 rounded-lg focus:outline-none focus:ring-2',
                                    'bg-blue-600 text-white font-semibold',
                                    isGenerateButtonDisabled
                                        ? 'bg-gray-400 cursor-not-allowed' // Estilos cuando el botón está deshabilitado
                                        : 'hover:bg-blue-700 focus:ring-blue-400' // Estilos cuando el botón está habilitado
                                )}
                                disabled={isGenerateButtonDisabled}
                            >
                                Generar<br />Número
                            </button>

                            <button
                                onClick={handleResetGame}
                                className="px-1 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-8 lg:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                disabled={isGenerateButtonDisabled}
                            >
                                Reiniciar<br />Juego
                            </button>
                        </div>
                        <div className="mt-10 text-xl sm:text-2xl md:text-5xl lg:text-9xl font-semibold text-center text-yellow-600">
                            {currentNumber !== null ? currentNumber : '0'}
                        </div>
                    </div>
                </div>
                <div className="mt-0 w-full max-w-7xl py-5">
                    <h2 className="text-xl sm:pb-4 md:pb-4 lg:pb-4 sm:text-2xl md:text-2xl lg:text-3xl font-semibold mb-2 text-center">Últimos 3 Números Marcados</h2>
                    <div className="flex justify-center gap-4">
                        {lastThreeNumbers.map(num => (
                            <div
                                key={num}
                                className={classNames(
                                    'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-15 xl:h-15 flex items-center justify-center text-yellow-600 text-2xl font-semibold bg-black transform transition-transform duration-300',
                                    'scale-110'
                                )}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-auto pt-4">
                    <ButtonRegresar />
                </div>
            </div>
        </>
    );
};

export default Bingo;
