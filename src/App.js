import React, { useState } from 'react';

const style = {
  square: {
    width: '6rem', height: '6rem', fontSize: '2rem', fontWeight: 'bold', border: '1px solid #ccc',
  },
  board: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem',
  },
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  status: {
    fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem',
  },
  button: {
    marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
  },
};

const Square = ({ value, onClick }) => (
  <button style={style.square} onClick={onClick}>{value}</button>
);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div style={style.container}>
      <h2 style={style.status}>{status}</h2>
      <div style={style.board}>
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button style={style.button} onClick={() => { setSquares(Array(9).fill(null)); setIsXNext(true); }}>
        Restart
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <Board />
    </div>
  );
}
