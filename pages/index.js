import { useState } from 'react';
import Chessboard from '../components/Chessboard';

export default function Home() {
  const [pieces, setPieces] = useState([
    {
      team: "b",
      type: "k",
      location: 2,
      alive: true
    },
    {
      team: "w",
      type: "k",
      location: 17,
      alive: true
    },
    {
      team: "b",
      type: "q",
      location: 3,
      alive: true
    },
    {
      team: "w",
      type: "q",
      location: 16,
      alive: true
    }
  ])

  return (
    <>
      <Chessboard pieces={pieces} updatePieces={setPieces}/>
    </>
  );
}
