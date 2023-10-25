import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button className={isWinner} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.winner;
  } else {
    if (squares.length === 9)
      status = "Draw"
    else
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function renderBoard() {
    let board = [];

    function renderRow(row) {
      let result = []
      for (let i = 0; i < 3; i++) {
        if (winner && winner.winnerLine.includes(row * 3 + i)) {
          result.push(
            <Square
              value={squares[row * 3 + i]}
              onSquareClick={() => handleClick(row * 3 + i)}
              isWinner='winner-square'
            />)
        }
        else {
          result.push(
            <Square
              value={squares[row * 3 + i]}
              onSquareClick={() => handleClick(row * 3 + i)}
              isWinner='square'
            />)
        }
      }
      return (
        <div className="board-row">
          {result}
        </div>
      )
    }

    for (let i = 0; i < 3; i++) {
      board.push(renderRow(i));
    }

    return board;
  }
  let board = []
  board = renderBoard()
  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [sort, setSort] = useState(true)
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    const findLocation = (curMove) => {
      if (curMove === 0)
        return {
          col: 0,
          row: 0
        }
      const prevSquares = history[curMove - 1];
      let col = 0;
      let row = 0;
      for (let i = 0; i < 9; i++) {
        if (prevSquares[i] !== currentSquares[i]) {
          col = i % 3;
          row = Math.floor(i / 3);
          return {
            col: col,
            row: row
          }
        }
      }
      return {
        col: col,
        row: row
      }
    }
    const location = findLocation(move)
    const row = location.row
    const col = location.col
    if (move > 0) {
      description = 'Go to move #' + move + ` (${row},${col})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          `You are at move #${move}, (${row},${col})`
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}

      </li>
    );
  });

  const sortedAsc = sort === true ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setSort(!sort)}>Sort Moves</button>
        <ol>{sortedAsc}</ol>
      </div>
    </div>


  );
}

function calculateWinner(squares) {
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerLine: [a, b, c]
      };
    }
  }
  return null;
}
