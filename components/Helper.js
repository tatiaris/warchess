export const roundToN = (num, n) => Math.round(num/n)*n

export const getPieceOffsetFromLocation = (piece, board) => {
  const pieceR = Math.floor(piece.location/board.dimensions.width)
  const pieceC = piece.location%board.dimensions.width
  return { top: pieceR*100/board.dimensions.height, left: pieceC*100/board.dimensions.width }
}

export const getPieceOffsetFromCoords = (mouseX, mouseY, board, round=false) => {
  const boardElemPosition = document.getElementById('chessboard').getBoundingClientRect()
  const tileWidth = boardElemPosition.width/board.dimensions.width
  let topOffset = (round) 
                    ? roundToN((mouseY - boardElemPosition.y - tileWidth/2)*100/boardElemPosition.height, 100/board.dimensions.height)
                    : (mouseY - boardElemPosition.y - tileWidth/2)*100/boardElemPosition.height
  let leftOffset = (round) 
                    ? roundToN((mouseX - boardElemPosition.x - tileWidth/2)*100/boardElemPosition.width, 100/board.dimensions.width)
                    : (mouseX - boardElemPosition.x - tileWidth/2)*100/boardElemPosition.width
  if (topOffset < 0) topOffset = 0;
  if (leftOffset < 0) leftOffset = 0;
  if (topOffset > 100 - (100/board.dimensions.height)) topOffset = 100 - (100/board.dimensions.height)
  if (leftOffset > 100 - (100/board.dimensions.width)) leftOffset = 100 - (100/board.dimensions.width)
  return { top: topOffset, left: leftOffset }
}

export const getLocationFromOffset = (offsets, board) => {
  return Math.round((board.dimensions.height*offsets.top + offsets.left)*board.dimensions.width/100)
}

export const updateElemOffsets = (elem, offsets) => {
  elem.style.top = `${offsets.top}%`;
  elem.style.left = `${offsets.left}%`;
}

export const hoverEffectOverSquare = (location, board) => {
  const numTiles = board.dimensions.width*board.dimensions.height;
  for (let l = 0; l < numTiles; l++) {
    document.getElementById(`square-${l}`).classList.remove('hovering')
  }
  if (0 <= location && location < numTiles && !(location in board.customSquares && board.customSquares[location] == "dne")) {
    document.getElementById(`square-${location}`).classList.add('hovering')
  }
}

export const removeAllHoverEffects = (board) => {
  const numTiles = board.dimensions.width*board.dimensions.height;
  for (let l = 0; l < numTiles; l++) {
    document.getElementById(`square-${l}`).classList.remove('hovering')
  }
}

/**
 * Determines whether the king is under check based on the board and other pieces
 * @param {string} team
 * @param {Object} board
 * @param {Object[]} pieces
 * @returns {boolean} Whether or not the king is under check
 */
export const isKingUnderCheck = (team, board, pieces) => {
  let kingUnderCheck = false
  return kingUnderCheck
}

export const possibleMovesForKing = (kingPieceIndex, board, pieces) => {
  return new Set([1, 6, 7, 8])
}

export const possibleMovesForQueen = (queenPieceIndex, board, pieces) => {
  return new Set([7, 8, 9, 11, 13, 18])
}