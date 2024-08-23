import { create } from 'zustand';

type BingoState = {
    numbers: number[];
    lastThreeNumbers: number[];
    currentNumber: number | null;
    generateRandomNumber: () => void;
    resetGame: () => void;
};

export const useBingoLogic = create<BingoState>((set) => ({
    numbers: [],
    lastThreeNumbers: [],
    currentNumber: null,
    generateRandomNumber: () => {
        set((state) => {
            const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(num => !state.numbers.includes(num));
            if (availableNumbers.length === 0) return state; // No hay números disponibles, regresar el estado actual

            const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
            const updatedNumbers = [...state.numbers, randomNum];
            const lastThree = updatedNumbers.slice(-3);

            return {
                ...state,
                numbers: updatedNumbers,
                lastThreeNumbers: lastThree,
                currentNumber: randomNum,
            };
        });
    },
    resetGame: () => {
        set(() => ({
            numbers: [],
            lastThreeNumbers: [],
            currentNumber: null,
        }));
    },
}));
