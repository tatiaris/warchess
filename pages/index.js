import Chessboard from '../components/Chessboard';

export default function Home() {
  const pieces = [
    {
      type: "bk",
      location: 2,
      alive: true
    },
    {
      type: "wk",
      location: 17,
      alive: true
    },
    {
      type: "bk",
      location: 3,
      alive: false
    }
  ]
  return (
    <>
      <Chessboard pieces={pieces}/>
    </>
  );
}
