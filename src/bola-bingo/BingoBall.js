// BingoBall.js
import React, { useEffect, useState } from 'react';
import './BingoBall.css';

const BingoBall = ({ number }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000); // Duración de la animación en ms
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <div className={`bingo-ball ${animate ? 'bounce' : ''}`}>
      {number}
    </div>
  );
};

export default BingoBall;
