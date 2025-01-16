import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useBingoLogic } from '../../hooks/useBingoLogic';

const Bingo: React.FC = () => {
    const { state } = useLocation();
    const [total, setTotal] = useState<string>('0.00');
    const { numbers, lastThreeNumbers, generateRandomNumber, currentNumber } = useBingoLogic();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const storedTotal = state?.total || localStorage.getItem('totalAJugar') || '0.00';
        setTotal(storedTotal);
    }, [state?.total]);

    useEffect(() => {
        if (currentNumber !== null) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500); // Duración de la animación

            speakNumber(currentNumber); // Llamar a la función para leer el número en voz alta

            return () => clearTimeout(timer);
        }
    }, [currentNumber]);

    const speakNumber = (num: number) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.lang = 'es-ES'; // Configura el idioma a español
        synth.speak(utterance);
    };

    const handleResetGame = () => {
        localStorage.setItem('totalAJugar', '0.00');
        setTotal('0.00');
        window.location.reload();
    };

    const isGenerateButtonDisabled = total === '0.00';

    const formatNumber = (num: number) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    return (
        <>
            <div className="flex flex-col items-center justify-start min-h-screen p-10 relative">
                {/* Texto "Ronda numero 1" en la esquina superior izquierda */}
                <div className="absolute top-20 left-16">
                    <h1 className="font-bold text-white text-4xl uppercase">
                        partida numero 1
                    </h1>
                </div>

                <div className="flex flex-col md:py-6 lg:py-2 xl:py-6 md:flex-row lg:flex-row xl:flex-row items-start justify-between max-w-max shadow-2xl mt-32">
                    {/* Sección de la palabra "BINGO" en forma vertical */}
                    <div className="flex flex-col items-center justify-start mr-4 space-y-12 -mt-2">
                        {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
                            <div
                                key={index}
                                className="text-4xl md:text-6xl font-extrabold text-red-600 my-2"
                                style={{
                                    transform: `rotate(${index % 2 === 0 ? '-0deg' : '0deg'})`,
                                    color: ['#FFFF', '#FFFF', '#FFFF', '#FFFF', '#FFFF'][index], // Cambia el color por letra
                                }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>

                    {/* Contenedor de los 75 números */}
                    <div className="grid md:grid-cols-8 md:gap-2 lg:grid-cols-15 lg:gap-4 xl:grid-cols-15 xl:gap-5
                    md:gap-y-8 lg:gap-y-10 xl:gap-y-12
                     w-full md:w-3/4 lg:w-3/4 xl:w-3/4">
                        {Array.from({ length: 75 }, (_, index) => {
                            const num = index + 1;
                            const isSelected = numbers.includes(num); // Verifica si el número está seleccionado

                            return (
                                <div
                                    id="bingoBall"
                                    key={num}
                                    className={classNames(
                                        "md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center rounded-full text-black font-semibold text-2xl",
                                        {
                                            'bg-black text-red-600 font-extrabold text-3xl': isSelected, // Cambia el color y aumenta el grosor del texto
                                            'bg-gray-200': !isSelected,
                                            'animate-enlarge': isSelected, // Clase de animación para agrandar
                                        }
                                    )}
                                >
                                    {formatNumber(num)}
                                </div>
                            );
                        })}
                    </div>

                    {/* Botones y última información */}
                    <div className="mt-4 flex flex-col items-center gap-4 mx-2 space-y-5">
                        <div className="flex gap-5">
                            <button
                                onClick={generateRandomNumber}
                                className={classNames(
                                    'md:px-14 md:py-2 rounded-full focus:outline-none focus:ring-0',
                                    'bg-yellow-600 text-white font-semibold text-xl',
                                    isGenerateButtonDisabled
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'hover:bg-yellow-500 focus:ring-slate-600'
                                )}
                                disabled={isGenerateButtonDisabled}
                            >
                                Generar<br />Número
                            </button>

                            <button
                                onClick={handleResetGame}
                                className={classNames(
                                    'md:px-14 md:py-2 rounded-full focus:outline-none focus:ring-0',
                                    'bg-sky-800 text-white font-semibold text-xl',
                                    isGenerateButtonDisabled
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'hover:bg-sky-700 focus:ring-teal-600'
                                )}
                                disabled={isGenerateButtonDisabled}
                            >
                                Cantar<br />Bingo
                            </button>
                        </div>
                        <div id="lastNumber" className={classNames("mt-1 px-48 py-20",
                            { 'animate-scale2': isAnimating }
                        )}>
                            <h1 className={classNames(
                                "text-xl sm:text-2xl md:text-5xl lg:text-7xl font-bold text-center text-black"
                            )}>
                                {currentNumber !== null ? formatNumber(currentNumber) : '00'}
                            </h1>
                        </div>
                        <div className="mt-1 w-full max-w-7xl py-1">
                            <h2 className="text-xl md:text-1xl lg:text-2xl xl:text-2xl font-bold text-center">ÚLTIMOS NÚMEROS</h2>
                            <div className="flex justify-center gap-5 mt-4">
                                {lastThreeNumbers.map((num, index) => (
                                    <div
                                        key={num}
                                        className={classNames(
                                            'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-15 xl:h-15 flex items-center justify-center text-yellow-600 text-2xl font-semibold bg-black',
                                            {
                                                'animate-scale': num === currentNumber, // Aplica animación solo al último número seleccionado
                                            }
                                        )}
                                    >
                                        {formatNumber(num)}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div id="pozo" className='md:py-14 md:px-24 lg:py-11 lg:px-20 rounded-3xl my-12'>
                    <h1 className='text-normal font-bold md:text-7xl lg:text-7xl xl:text-6xl text-white'>S/. {total + '.0'}</h1>
                </div>
            </div>
        </>
    );
};

export default Bingo;
