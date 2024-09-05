import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import GamesDatabase from "./GamesDatabase";
import ChessEngine from "./ChessEngine";
import { Container, Button } from "react-bootstrap";
import supabase from "../supabaseClient";
import { useAuth } from "./AuthContext";

function ChessRepertoireBoard({ repertoire }) {
  const chessRef = useRef(new Chess());
  const chess = chessRef.current;
  const { user } = useAuth();

  const userIsOwner = user && repertoire.user_id === user.id;

  const [rotateBoard, setRotateBoard] = useState("white");
  const [boardPosition, setBoardPosition] = useState("start");
  const [gamePGN, setGamePGN] = useState(chess.pgn());
  const [moveNumber, setMoveNumber] = useState(0);
  const [practiceGamePGN, setPracticeGamePGN] = useState(chess.pgn());
  const [moveHistory, setMoveHistory] = useState([]);
  const [practiceMoveHistory, setPracticeMoveHistory] = useState([]);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [repertoireName, setRepertoireName] = useState(repertoire.title);
  const [playerColor, setPlayerColor] = useState("white");

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
      if (userMove.san === practiceMoveHistory[moveNumber]) {
        updateBoard();
        const newMoveNumber = moveNumber + 1;
        setMoveNumber(moveNumber);

        setTimeout(() => {
          chess.move(practiceMoveHistory[newMoveNumber]);
          updateBoard();
          setMoveNumber(newMoveNumber + 1);
        }, 500);
        return true;
      } else {
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

  function deleteLastMove() {
    chess.undo();
    setBoardPosition(chess.fen());
    setGamePGN(chess.pgn());
    setMoveHistory(chess.history());
  }

  async function saveRepertoire(id) {
    const updatedRepertoire = {
      title: repertoireName,
      moves: gamePGN,
      email: repertoire.email,
      userID: user.id,
    };

    const { data, error } = await supabase
      .from("repertoires")
      .update({
        title: updatedRepertoire.title,
        moves: updatedRepertoire.moves,
        email: updatedRepertoire.email,
        user_id: updatedRepertoire.userID,
      })
      .eq("id", id)
      .select();
  }

  function startPractice() {
    setPracticeGamePGN(gamePGN);
    setPracticeMoveHistory(moveHistory);
    setMoveNumber(0);
    chess.reset();
    setBoardPosition("start");
    setIsPracticeMode(true);
    if (playerColor === "black") {
      machineFirstMove();
    }
  }

  function machineFirstMove() {
    chess.move(practiceMoveHistory[0]);
    updateBoard();
    setMoveNumber(1);
  }

  function stopPractice() {
    setIsPracticeMode(false);
    chess.reset();
    chess.loadPgn(practiceGamePGN);
    updateBoard();
  }

  function togglePlayerColor() {
    setPlayerColor(playerColor === "black" ? "white" : "black");
  }

  return (
    <Container className="repertoire mt-3">
      <Container>
        <h1>{repertoireName}</h1>
        <label className="mb-2 repertoire-title-label">
          New Repertoire Name:
          <input
            className="mx-2"
            type="text"
            value={repertoireName}
            onChange={(e) => setRepertoireName(e.target.value)}
            disabled={!userIsOwner}
          />
        </label>
        <Button
          variant="dark"
          className="mx-3 mb-2"
          onClick={togglePlayerColor}
        >
          {playerColor === "white" ? "Playing as white" : "Playing as black"}
        </Button>

        <Chessboard
          boardWidth={520}
          animationDuration={0}
          boardOrientation={rotateBoard}
          position={boardPosition}
          onPieceDrop={onDrop}
        />
        {!isPracticeMode ? (
          <div className="board-btn d-flex justify-content-between my-2">
            <Button variant="dark" onClick={handleRotateBoard}>
              Rotate Board
            </Button>
            <Button variant="danger" onClick={deleteLastMove}>
              Delete last move
            </Button>
            {userIsOwner && (
              <Button
                variant="success"
                onClick={() => saveRepertoire(repertoire.id)}
              >
                Save
              </Button>
            )}
            <Button variant="dark" onClick={startPractice}>
              Practice
            </Button>
          </div>
        ) : (
          <div className="board-btn d-flex justify-content-between my-2">
            <Button variant="dark" onClick={handleRotateBoard}>
              Rotate Board
            </Button>
            <Button variant="dark" onClick={stopPractice}>
              Stop Practice
            </Button>
          </div>
        )}
      </Container>
      <Container>
        <p className="game-pgn">{gamePGN}</p>
        <ChessEngine boardPosition={chess.fen()} />
        <GamesDatabase boardPosition={chess.fen()} />
      </Container>
    </Container>
  );
}

export default ChessRepertoireBoard;
