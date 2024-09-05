import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Container, Button } from "react-bootstrap";

function ChessEngine({ boardPosition }) {
  const [engineActivated, setEngineActivated] = useState(false);
  const [bestMove, setBestMove] = useState("");
  const [game, setGame] = useState(new Chess());

  async function getBestMove() {
    if (!boardPosition) return;

    try {
      const response = await fetch("http://localhost:3000/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen: boardPosition }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      game.load(boardPosition);
      setBestMove(game.move(data.bestMove).san);
    } catch (error) {
      console.error("Error evaluating position:", error);
    }
  }

  useEffect(() => {
    if (engineActivated) {
      getBestMove();
    }
  }, [boardPosition, engineActivated]);

  function toggleEngine() {
    setEngineActivated(!engineActivated);
  }

  return (
    <Container>
      <Button variant="dark" className="mb-2" onClick={toggleEngine}>
        {engineActivated ? "Deactivate Chess Engine" : "Activate Chess Engine"}
      </Button>
      {engineActivated && (
        <Container>
          <p className="best-move">Best Move: {bestMove}</p>
        </Container>
      )}
    </Container>
  );
}

export default ChessEngine;
