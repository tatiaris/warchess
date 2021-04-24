import PropTypes from "prop-types";
import { useState } from "react";
import useMousePosition from "./useMousePosition";

/**
 * Chessboard component
 */
export const Chessboard = (props) => {
  const [selectedPiece, setSelectedPiece] = useState(-1)
  const { x:mouseX, y:mouseY } = useMousePosition();
  const board = {
    dimensions: {
      width: 5,
      height: 4
    },
    customSquares: {
      0: "transparent",
      1: "puddle",
      4: "transparent",
      15: "transparent",
      19: "transparent",
      13: "hole"
    }
  }

  const selectPiece = (pieceIndex) => {
    let elem = document.getElementById(`piece-${pieceIndex}`)
    elem.classList.add('dragging')
    setSelectedPiece(pieceIndex)
  }

  const dragPiece = () => {
    if (selectedPiece > -1) {
      let elem = document.getElementById(`piece-${selectedPiece}`)
      if (elem.classList.contains('dragging')) {
        const boardElemPosition = document.getElementById('chessboard').getBoundingClientRect()
        let topOffset = mouseY - boardElemPosition.y;
        let leftOffset = mouseX - boardElemPosition.x;
        elem.style.top = `${topOffset - 50}px`;
        elem.style.left = `${leftOffset - 50}px`;
      }
    }
  }

  const dropPiece = () => {
    if (selectedPiece > -1) {
      let elem = document.getElementById(`piece-${selectedPiece}`)
      elem.classList.remove('dragging')
      const boardElemPosition = document.getElementById('chessboard').getBoundingClientRect()
      let topOffset = mouseY - boardElemPosition.y;
      let leftOffset = mouseX - boardElemPosition.x;
      elem.style.top = `${topOffset - 50}px`;
      elem.style.left = `${leftOffset - 50}px`;
      setSelectedPiece(-1)
    }
  }

  let squares = []
  for (let i = 0; i < board.dimensions.height; i++) {
    let row = []
    for (let j = 0; j < board.dimensions.width; j++) {
      const squareId = i*board.dimensions.width + j
      const squareType = (squareId in board.customSquares) ? board.customSquares[squareId] : ((squareId%board.dimensions.width + i)%2 == 0) ? "light" : "dark"
      row.push(<div key={`square-${squareId}`} id={`square-${squareId}`} className={`square ${squareType}`}></div>)
    }
    squares.push(<div key={`br-${i}`} className="board-row">{row}</div>)
  }

  let allPieces = props.pieces.map((piece, i) => {
    if (!piece.alive) return;
    const pieceR = Math.floor(piece.location/board.dimensions.width)
    const pieceC = piece.location%board.dimensions.width
    const topOffset = pieceR*100/board.dimensions.height
    const leftOffset = pieceC*100/board.dimensions.width
    return <div onMouseDown={() => selectPiece(i)} key={`piece-${i}`} id={`piece-${i}`} className={`piece ${piece.type}`} style={{ top: `${topOffset}%`, left: `${leftOffset}%` }}></div>
  })

  return (
    <div id="chessboard" className="chessboard" onMouseMove={dragPiece} onMouseUp={dropPiece}>
      {squares}
      {allPieces}
    </div>
  );
};

Chessboard.propTypes = {
  pieces: PropTypes.array,
};

export default Chessboard;
