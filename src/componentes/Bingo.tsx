import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ButtonRegresar from './shared/ButtonRegresar';

const Bingo: React.FC = () => {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [lastThreeNumbers, setLastThreeNumbers] = useState<number[]>([]);

    const generateRandomNumber = () => {
        if (numbers.length >= 75) return;
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * 75) + 1;
        } while (numbers.includes(randomNumber));
        setNumbers(prev => [...prev, randomNumber]);
        setCurrentNumber(randomNumber);
    };

    const resetGame = () => {
        setNumbers([]);
        setCurrentNumber(null);
        setLastThreeNumbers([]);
    };

    useEffect(() => {
        if (currentNumber !== null) {
            setLastThreeNumbers(prev => [currentNumber, ...prev].slice(0, 3));
        }
    }, [currentNumber]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-0 font-semibold text-center text-slate-900">
                BINGO PARLEY
            </h1>
            <div className="flex flex-col md:py-2 lg:py-2 sm:flex-row md:flex-row items-start justify-between max-w-max shadow-lg mt-8">
                <div className="grid grid-cols-15 gap-4 w-full sm:w-3/4">
                    {Array.from({ length: 75 }, (_, index) => {
                        const num = index + 1;
                        return (
                            <div
                                key={num}
                                className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 flex items-center justify-center rounded-full
                                     text-white font-semibold text-2xl ${numbers.includes(num) ? 'bg-yellow-600' : 'bg-gray-300'
                                    }`}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center gap-4 mx-2">
                    <button
                        onClick={generateRandomNumber}
                        className="px-1 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-8 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Generar<br />Número
                    </button>
                    <button
                        onClick={resetGame}
                        className="px-1 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-8 lg:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Reiniciar<br />Juego
                    </button>
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
    );
};

export default Bingo;
