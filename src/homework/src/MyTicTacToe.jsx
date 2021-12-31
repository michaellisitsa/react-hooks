// This file represents my own implementation of tic tac toe.
// This is to practice using derived state rather than syncing state.
// See link here https://kentcdodds.com/blog/dont-sync-state-derive-it

import {useState} from 'react'

function Board(props) {
  // store the X and O's for the board
  const [squares, setSquares] = useState(Array(9).fill(null))
  const winner = calculateWinner(squares)
  const nextValue = calculateNextValue(squares)
  const status = calculateStatus(squares, nextValue, winner)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    } else {
      const squaresCopy = [...squares]
      // Usually I would run the calculateNextValue function right here.
      // This approach allows us to access it externally,
      // which would usually be done by a separate state variable
      // The nextValue is derived on every render,
      // and not only when selectSquare event is triggered.
      squaresCopy[square] = nextValue
      console.log(squaresCopy)
      setSquares(squaresCopy)
    }
  }

  function renderSquare(square) {
    return (
      <button className="square" onClick={() => selectSquare(square)}>
        {squares[square]}
      </button>
    )
  }

  return (
    <div>
      <h1>{status}</h1>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(squares, nextValue, winner) {
  let status
  if (winner) {
    status = `${winner} Won!!`
  } else if (squares.filter(square => square === null).length === 0) {
    status = 'No one won this time!'
  } else {
    status = `Next Turn: ${nextValue}`
  }
  return status
}

function calculateNextValue(squares) {
  const lengthCompleted = squares.filter(square => square === null).length
  return lengthCompleted % 2 === 0 ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
}

function MyTicTacToe() {
  return <Game />
}

export default MyTicTacToe
