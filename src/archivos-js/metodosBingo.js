// metodosBingo.js
import { useEffect } from 'react';

export const useRecentNumberEffect = (recentNumber, markedNumbers, setTransitionNumbers, setRecentNumber) => {
  useEffect(() => {
    if (recentNumber !== null) {
      setTransitionNumbers(markedNumbers.slice(-4, -1)); // últimos 3 números antes del más reciente
      const timer = setTimeout(() => {
        setRecentNumber(null);
        setTransitionNumbers([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [recentNumber, markedNumbers, setTransitionNumbers, setRecentNumber]);
};

export const createBingoBoard = (numbers, markedNumbers) => {
  return numbers.map(number => (
    <div key={number} className={`cell ${markedNumbers.includes(number) ? 'marked' : ''}`}>
      <span>{number}</span>
    </div>
  ));
};

export const markRandomNumber = (numbers, markedNumbers, setMarkedNumbers, setRecentNumber) => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * numbers.length);
  } while (markedNumbers.includes(numbers[randomIndex]));

  const number = numbers[randomIndex];
  setMarkedNumbers([...markedNumbers, number]);
  setRecentNumber(number);
};

export const resetBoard = (setMarkedNumbers) => {
  setMarkedNumbers([]);
};

export const getLastThreeMarkedNumbers = (markedNumbers) => {
  return markedNumbers.slice(-3).reverse(); // Obtener los últimos 3 números marcados
};
