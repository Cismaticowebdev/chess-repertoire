import { Chessboard } from "react-chessboard";
import { useState } from "react";

function ChessRepertoireBoard() {
    const [rotateBoard, setRotateBoard] = useState("white");

    function handleRotateBoard() {
        setRotateBoard(rotateBoard === "white" ? "black" : "white");
    }

    return <div>
        <h1>Chess Board</h1>
        <Chessboard boardWidth={520} boardOrientation={rotateBoard}/>
        <button onClick={handleRotateBoard}>Rotate Board</button>
    </div>
}

export default ChessRepertoireBoard;