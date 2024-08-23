import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useBingoLogic } from '../hooks/useBingoLogic';

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

    return (
        <>
            <div className="flex flex-col items-center justify-start min-h-screen p-10">
                <div className="flex flex-col md:py-2 lg:py-2 xl:py-2 md:flex-row lg:flex-row xl:flex-row items-start justify-between max-w-max shadow-2xl mt-24">
                    <div className="grid md:grid-cols-8 md:gap-2 lg:grid-cols-15 lg:gap-4 xl:grid-cols-15 xl:gap-5
                    md:gap-y-8 lg:gap-y-10 xl:gap-y-12
                     w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
                        {Array.from({ length: 75 }, (_, index) => {
                            const num = index + 1;
                            return (
                                <div
                                    key={num}
                                    className={`md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 flex items-center justify-center rounded-full text-white font-semibold text-3xl ${numbers.includes(num) ? 'bg-yellow-600' : 'bg-gray-400'}`}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-4 mx-2">
                        <div className="flex gap-2">
                            <button
                                onClick={generateRandomNumber}
                                className={classNames(
                                    'px-1 py-1 md:px-8 md:py-4 lg:px-8 lg:py-2 rounded-lg focus:outline-none focus:ring-2',
                                    'bg-slate-700 text-white font-semibold',
                                    isGenerateButtonDisabled
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'hover:bg-slate-600 focus:ring-slate-600'
                                )}
                                disabled={isGenerateButtonDisabled}
                            >
                                Generar<br />Número
                            </button>

                            <button
                                onClick={handleResetGame}
                                className={classNames(
                                    'px-1 py-1 md:px-8 md:py-4 lg:px-8 lg:py-2 rounded-lg focus:outline-none focus:ring-2',
                                    'bg-teal-700 text-white font-semibold',
                                    isGenerateButtonDisabled
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'hover:bg-teal-600 focus:ring-teal-600'
                                )}
                                disabled={isGenerateButtonDisabled}
                            >
                                Cantar<br />Bingo
                            </button>
                        </div>
                        <div className={classNames(
                            "mt-10 text-xl sm:text-2xl md:text-5xl lg:text-9xl font-semibold text-center text-yellow-600",
                            { 'animate-scale': isAnimating }
                        )}>
                            {currentNumber !== null ? currentNumber : '0'}
                        </div>
                        <div className="mt-0 w-full max-w-7xl py-5">
                            <h2 className="text-xl md:text-1xl lg:text-2xl xl:text-2xl font-bold text-center">ÚLTIMOS NÚMEROS</h2>
                            <div className="flex justify-center gap-5 mt-4">
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
                        <div className='bg-white py-2 px-2 rounded-lg my-20'>
                            <h1 className='text-normal font-semibold md:text-1xl lg:text-2xl xl:text-2xl'>POZO: {total} SOLES</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bingo;
