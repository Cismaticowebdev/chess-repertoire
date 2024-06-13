import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";

function ChessRepertoireBoard() {
    const chess = new Chess();

    const [rotateBoard, setRotateBoard] = useState("white");
    const [boardPosition, setBoardPosition] = useState("start");
    const [gamePGN, setGamePGN] = useState(chess.pgn());

    function onDrop(sourceSquare, targetSquare) {
        chess.loadPgn(gamePGN);
        const move = {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        };

        chess.move(move);
        setBoardPosition(chess.fen());
        setGamePGN(chess.pgn());
    }

    function handleRotateBoard() {
        setRotateBoard(rotateBoard === "white" ? "black" : "white");
    }

    return <div>
        <h1>Chess Board</h1>
        <Chessboard boardWidth={520} animationDuration={0} boardOrientation={rotateBoard} position={boardPosition} onPieceDrop={onDrop} />
        <button onClick={handleRotateBoard}>Rotate Board</button>
    </div>
}

export default ChessRepertoireBoard;