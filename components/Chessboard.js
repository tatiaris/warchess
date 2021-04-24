import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getLocationFromOffset, getPieceOffsetFromCoords, getPieceOffsetFromLocation, hoverEffectOverSquare, possibleMovesForKing, possibleMovesForQueen, removeAllHoverEffects, updateElemOffsets } from "./Helper";
import useMousePosition from "./useMousePosition";

/**
 * Chessboard component
 */
export const Chessboard = (props) => {
  const [selectedPiece, setSelectedPiece] = useState(-1)
  const [draggingSelectedPiece, setDraggingSelectedPiece] = useState(false)
  const [possibleMoves, setPossibleMoves] = useState(new Set())
  const [allTiles, setAllTiles] = useState([])
  const [allPieces, setAllPieces] = useState([])
  const { x:mouseX, y:mouseY } = useMousePosition();
  const board = {
    dimensions: {
      width: 8,
      height: 8
    },
    customSquares: {
      // 0: "dne",
      6: "puddle",
      // 4: "dne",
      // 15: "dne",
      // 19: "dne",
      13: "hole"
    },
    settings: {

    }
  }

  const displayPossibleMoves = () => {
    const pieceType = props.pieces[selectedPiece].type;

    switch (pieceType) {
      case "k":
        setPossibleMoves(possibleMovesForKing(selectedPiece, board, props.pieces))
        break;
      case "q":
        setPossibleMoves(possibleMovesForQueen(selectedPiece, board, props.pieces))
        break;
      default:
        break;
    }
  }

  const selectPiece = (pieceIndex, drag=false) => {
    if (selectedPiece == pieceIndex) setSelectedPiece(-1)
    else {
      if (drag) document.getElementById(`piece-${pieceIndex}`).classList.add('dragging')
      setSelectedPiece(pieceIndex)
      setDraggingSelectedPiece(drag)
    }
  }

  const dragPiece = () => {
    if (selectedPiece > -1 && draggingSelectedPiece) {
      let elem = document.getElementById(`piece-${selectedPiece}`)
      if (elem.classList.contains('dragging')) {
        const newOffsets = getPieceOffsetFromCoords(mouseX, mouseY, board)
        updateElemOffsets(elem, newOffsets)
        const roundedOffsets = getPieceOffsetFromCoords(mouseX, mouseY, board, true)
        const updatedLocation = getLocationFromOffset(roundedOffsets, board)
        hoverEffectOverSquare(updatedLocation, board)
      }
    }
  }

  const updatePieceLocation = (updatedLocation) => {
    const updatedPieces = props.pieces.map((piece, i) => {
      if (i == selectedPiece) {
        piece.location = updatedLocation
      }
      return piece
    })
    props.updatePieces(updatedPieces)
  }
  
  const dropPiece = () => {
    if (selectedPiece > -1 && draggingSelectedPiece) {
      const newOffsets = getPieceOffsetFromCoords(mouseX, mouseY, board, true)
      const updatedLocation = getLocationFromOffset(newOffsets, board)
      let elem = document.getElementById(`piece-${selectedPiece}`)
      if (possibleMoves.has(updatedLocation)) {
        updatePieceLocation(updatedLocation)
        updateElemOffsets(elem, newOffsets)
      } else {
        const oldOffsets = getPieceOffsetFromLocation(props.pieces[selectedPiece], board)
        updateElemOffsets(elem, oldOffsets)
      }
      elem.classList.remove('dragging')
      setSelectedPiece(-1)
      removeAllHoverEffects(board)
    }
  }

  useEffect(() => {
    let allUpdatedPieces = props.pieces.map((piece, i) => {
      if (!piece.alive) return;
      const offsets = getPieceOffsetFromLocation(piece, board)
      return (
        <div onMouseDown={() => selectPiece(i, true)} 
          key={`piece-${i}`} id={`piece-${i}`} 
          className={`piece ${piece.team}${piece.type}`} 
          style={{ top: `${offsets.top}%`, left: `${offsets.left}%` }}>
        </div>
      )
    })
    setAllPieces(allUpdatedPieces)
  }, [props.pieces])

  useEffect(() => {
    let squares = []
    for (let i = 0; i < board.dimensions.height; i++) {
      let row = []
      for (let j = 0; j < board.dimensions.width; j++) {
        const squareId = i*board.dimensions.width + j
        const squareType = (squareId in board.customSquares) ? board.customSquares[squareId] : ((squareId%board.dimensions.width + i)%2 == 0) ? "light" : "dark"
        row.push(<div key={`square-${squareId}`} id={`square-${squareId}`} className={`square ${squareType}`}>{possibleMoves.has(squareId) && <div className="valid-move"></div>}</div>)
      }
      squares.push(<div key={`br-${i}`} className="board-row">{row}</div>)
    }
    setAllTiles(squares)
  }, [possibleMoves])

  useEffect(() => {
    if (selectedPiece < 0) setPossibleMoves(new Set())
    else {
      displayPossibleMoves()
    }
  }, [selectedPiece])

  return (
    <div className="board-container">
      <div id="chessboard" className="chessboard" onMouseMove={dragPiece} onMouseUp={dropPiece}>
        {allTiles}
        {allPieces}
      </div>
    </div>
  );
};

Chessboard.propTypes = {
  pieces: PropTypes.array,
  updatePieces: PropTypes.func
};

export default Chessboard;
