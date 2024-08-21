import { useState, useEffect } from 'react';

export const useBingoLogic = () => {
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
        localStorage.setItem('totalAJugar', '0.00');
    };

    useEffect(() => {
        if (currentNumber !== null) {
            setLastThreeNumbers(prev => [currentNumber, ...prev].slice(0, 3));
        }
    }, [currentNumber]);

    return { numbers, currentNumber, lastThreeNumbers, generateRandomNumber, resetGame };
};
