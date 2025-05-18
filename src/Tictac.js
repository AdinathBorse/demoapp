import React, { useState } from 'react';

const Square = ({ value, onClick }) => (
  <button className="w-24 h-24 text-3xl font-bold border border-gray-300" onClick={onClick}>
    {value}
  </button>
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
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => { setSquares(Array(9).fill(null)); setIsXNext(true); }}
      >
        Restart
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Board />
    </div>
  );
}
