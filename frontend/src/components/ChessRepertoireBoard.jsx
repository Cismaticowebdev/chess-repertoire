import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useRef, useState } from "react";
import MovesList from "./MovesList";

function ChessRepertoireBoard() {
    const chessRef = useRef(new Chess());
    const chess = chessRef.current;

    const [rotateBoard, setRotateBoard] = useState("white");
    const [boardPosition, setBoardPosition] = useState("start");
    const [gamePGN, setGamePGN] = useState(chess.pgn());
    const [moveHistory, setMoveHistory] = useState([]);

    function onDrop(sourceSquare, targetSquare) {
        const move = {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        };

        chess.move(move);
        setBoardPosition(chess.fen());
        setGamePGN(chess.pgn());
        setMoveHistory(chess.history());
    }

    function handleRotateBoard() {
        setRotateBoard(rotateBoard === "white" ? "black" : "white");
    }

    function handleLogs() {
        console.log("gamePGN");
        console.log(gamePGN);
        console.log("chess.moves()");
        console.log(chess.moves());
        console.log("chess.history()");
        console.log(chess.history());
    }

    function handleMoveBack() {
        chess.undo();
        setBoardPosition(chess.fen());
        setGamePGN(chess.pgn());
        setMoveHistory(chess.history());
    }

    return <div>
        <h1>Chess Board</h1>
        <Chessboard boardWidth={520} animationDuration={0} boardOrientation={rotateBoard} position={boardPosition} onPieceDrop={onDrop} />
        <button onClick={handleRotateBoard}>Rotate Board</button>
        <button onClick={handleLogs}>Console log</button>
        <button onClick={handleMoveBack}>Move back</button>
        <p>{gamePGN}</p>
        <p>{moveHistory}</p>
        
    </div>
}

export default ChessRepertoireBoard;