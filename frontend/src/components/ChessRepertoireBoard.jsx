import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";

function ChessRepertoireBoard( {repertoire}) {
    const chessRef = useRef(new Chess());
    const chess = chessRef.current;

    const [rotateBoard, setRotateBoard] = useState("white");
    const [boardPosition, setBoardPosition] = useState("start");
    const [gamePGN, setGamePGN] = useState(chess.pgn());
    const [moveNumber, setMoveNumber] = useState(0);
    const [practiceGamePGN, setPracticeGamePGN] = useState(chess.pgn());
    const [moveHistory, setMoveHistory] = useState([]);
    const [practiceMoveHistory, setPracticeMoveHistory] = useState([]);
    const [isPracticeMode, setIsPracticeMode] = useState(false);

    useEffect(() => {
        if (repertoire) {
            chess.loadPgn(repertoire.moves);
            updateBoard();
        }
    }, []);

    function onDrop(sourceSquare, targetSquare, piece) {
        const move = {
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        };

        let userMove = chess.move(move);

        if (!isPracticeMode) {
            updateBoard();
        }

        if (isPracticeMode) {
            console.log(practiceMoveHistory[moveNumber]);
            console.log(moveNumber);
            if (userMove.san === practiceMoveHistory[moveNumber]) {
                updateBoard();
                setMoveNumber(prevMoveNumber => prevMoveNumber + 1);
                setTimeout(() => {
                    const machineMove = chess.move(practiceMoveHistory[moveNumber + 1]);
                    if (machineMove) {
                        updateBoard();
                        setMoveNumber(prevMoveNumber => prevMoveNumber + 1)
                    }
                }, 500);
                return true;
            }   else {
                    chess.undo();
                    return false;
                }
        }
    }
    

    function updateBoard() {
        setGamePGN(chess.pgn());
        setBoardPosition(chess.fen());
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
        console.log("chess.history(verbose)");
        console.log(chess.history({verbose: true}));
    }

    function deleteLastMove() {
        chess.undo();
        setBoardPosition(chess.fen());
        setGamePGN(chess.pgn());
        setMoveHistory(chess.history());
    }

    async function saveRepertoire(id) {
        const updatedRepertoire = {
            title: repertoire.title,
            moves: gamePGN,
            creator: repertoire.creator,
        }

        try {
            const response = await fetch(`http://localhost:3000/api/data/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRepertoire),
            });
        } catch (error) {
            console.error("Error updating repertoire:", error);
        }
    }

    function startPractice() {
        setPracticeGamePGN(gamePGN);
        setPracticeMoveHistory(moveHistory);
        setMoveNumber(0);
        chess.reset();
        setBoardPosition("start");
        setIsPracticeMode(true);
    }

    function stopPractice() {
        setIsPracticeMode(false);
        chess.reset();
        chess.loadPgn(practiceGamePGN);
        updateBoard();
    }

    return <div>
        <h1>Chess Board</h1>
        <Chessboard boardWidth={520} animationDuration={0} boardOrientation={rotateBoard} position={boardPosition} onPieceDrop={onDrop} />
        {!isPracticeMode ? (
            <div>
                <button onClick={handleRotateBoard}>Rotate Board</button>
                <button onClick={handleLogs}>Console log</button>
                <button onClick={deleteLastMove}>Delete last move</button>
                <button onClick={() => saveRepertoire(repertoire.id)}>Save</button>
                <button onClick={startPractice}>Practice</button>
            </div>
        ) : (
            <button onClick={stopPractice}>Stop Practice</button>
        )
        }
        <p>{gamePGN}</p>
        <p>{moveHistory}</p>
    </div>
}

export default ChessRepertoireBoard;