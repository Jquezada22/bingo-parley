// Bingo.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import './Bingo.css';
import './Estilos.css';
import { createBingoBoard, markRandomNumber, resetBoard, getLastThreeMarkedNumbers, useRecentNumberEffect } from '../archivos-js/metodosBingo.js';

const Bingo = () => {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [recentNumber, setRecentNumber] = useState(null);
  const [transitionNumbers, setTransitionNumbers] = useState([]);

  useRecentNumberEffect(recentNumber, markedNumbers, setTransitionNumbers, setRecentNumber);

  return (
    <Container>
      <div>
        <h1 id="titulo">BINGO PARLEY SPORTS</h1>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-9'>
            <div className="bingo-board">{createBingoBoard(numbers, markedNumbers)}</div>
          </div>
          <div className="col-md-3 offset-md-11" id="moverDiv">
            <div id="current-number" className="mb-3">
              {markedNumbers.length > 0 ? markedNumbers[markedNumbers.length - 1] : '00'}
            </div>
            <div>
              <Button onClick={() => markRandomNumber(numbers, markedNumbers, setMarkedNumbers, setRecentNumber)} variant="primary" className="anchoBotones"><b>Generar<br /> Número</b></Button> &nbsp;
              <Button onClick={() => resetBoard(setMarkedNumbers)} variant="danger" className="anchoBotones"><b>Nueva <br /> Partida</b></Button>
            </div>
            <div id="titulo-numeros-marcados">
              <h6 id="last-number">Últimos 3 números marcados:</h6>
            </div>
            <div className="last-marked-numbers">
              {getLastThreeMarkedNumbers(markedNumbers).map((number, index) => (
                <div
                  key={index}
                  className={`last-number ${recentNumber === number ? 'recent' : ''} ${transitionNumbers.includes(number) ? 'transition-right' : ''}`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </Container>
  );
};

export default Bingo;
