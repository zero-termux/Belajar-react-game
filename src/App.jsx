import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || winner(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winn = winner(squares);
  let status = "";
  if (winn) {
    status = "👑WINNER IS " + winn;
  } else if (squares.every(square => square !== null)) {
    status = "RESULT IS DRAW";
} else {
    status = "PLAYER : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [curentMove, setCurentMove] = useState(0);
  const xIsNext = curentMove % 2 === 0;
  const curentSquare = history[curentMove];

  function jumpTo(nextMove) {
    setCurentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, curentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let deskripsi = "";
    if (move > 0) {
      deskripsi = "Move To Section " + move;
    } else {
      deskripsi = "Game Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{deskripsi}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <App xIsNext={xIsNext} squares={curentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p>info game :</p>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

function winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];

    if (squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }
  return false;
}
