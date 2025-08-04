import Square from "./Square.jsx";
import {useState , useRef ,useEffect} from 'react'
import SocialIcons from './SocialIcons.jsx'
import './styles.css'

export default function game(){
  const [count,setCount] = useState(0);
  const [hist,setHist] = useState([Array(9).fill(null)]);
  const [isSinglePlayer , setSingle] = useState(true);
  const current = hist[count];
  const selectMenu = useRef(null);

  useEffect(() => {
  if (isSinglePlayer && count % 2 === 1 && !calculateWinner(current)) {
    const timeout = setTimeout(() => {
      const bestMove = findBestMove(current);
      if (bestMove !== -1) {
        const updated = current.slice();
        updated[bestMove] = 'O';
        play(updated);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }
}, [count, current, isSinglePlayer]);


  function play(nextSquares){
   const newHist = [...hist.slice(0,count+1),nextSquares];
   setHist(newHist);
   setCount(newHist.length-1);
  }

  function handleTraverse(){
    const ind = parseInt(selectMenu.current.value) + 1;

    if(ind < hist.length){setCount(ind);}
  }
  function Select(){
    return(
      <>
      <label className="traverse-history">Traverse History: </label>
    <select ref={selectMenu} name="Move" className="options" onChange={handleTraverse} disabled={count == 0}>
        {hist.map((_, index) => (
          <option key={index} value={index}>{index}</option>
        ))}

      </select>
      </>);
  }
  

  return(
    <>
    <div className="game">
      <Board
        squares={current}
        count={count}
        Play={play}
        history={hist}
        isSinglePlayer={isSinglePlayer}
        setSingle={setSingle}
      />

        <Select/>
        <hr/>
        <p className="footer">&copy; {new Date().getFullYear()} Anjney Lawaniya</p>
        <SocialIcons/>
    </div>
    </>
  );
}

function findBestMove(board){
  let bestVal = -Infinity;
  let bestMove = -1;

  for(let i=0; i<board.length; i++){
    if(!board[i]){
      board[i] = 'O';
      const moveVal = minimax(board , 0 , false);
      board[i] = null;

      if(moveVal > bestVal){
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board , depth , isMaximizing){
  const winner = calculateWinner(board);
  if(winner === 'O'){return 10 - depth;}
  if(winner === 'X'){return depth - 10;}
  if(!board.includes(null)){return 0;}

  if(isMaximizing){
    let maxEval = -Infinity;
    for(let i=0; i<board.length; i++){
      if(!board[i]){
        board[i] = 'O';
        const evl = minimax(board , depth+1 , false);
        board[i] = null;
        maxEval = Math.max(maxEval,  evl);
      }
    }
    return maxEval;
  }
  else{
    let minEval = Infinity;
    for(let i=0; i<board.length; i++){
      if(!board[i]){
        board[i] = 'X';
        const evl = minimax(board , depth+1 , true);
        board[i] = null;
        minEval = Math.min(minEval , evl);
      }
    }

    return minEval;
  }
}

function Board({squares, count, Play, history, isSinglePlayer, setSingle}) {

  function handleClick(i) {
  if (!isSinglePlayer || (isSinglePlayer && count % 2 === 0)) {
    if (!squares[i] && !calculateWinner(squares)) {
      const nextSquares = squares.slice();
      nextSquares[i] = (count%2) ? "O" : "X";
      Play(nextSquares);
    }
  }
}


  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }
  else{
    if(count === 9){status = "Tie";}
    else{status = "Next turn: " + ((count%2) ? "O" : "X");}
  }

  return (
    <>
    <div className="container">
      <div className="playerType">
        <label className="switch">
      <input
        type="checkbox"
        checked={!isSinglePlayer}
        onChange={() => setSingle(!isSinglePlayer)}
        className="playerCheckbox"
          />
          </label>
          <span className="mode-label">
            {isSinglePlayer ? "Single Player" : "Multiplayer"}
      </span>

      </div>
      

      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>

    </div>

    </>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}