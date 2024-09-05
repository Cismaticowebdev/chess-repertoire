import { useEffect, useState } from "react";
import { Card, CardBody, ListGroup, CardTitle } from "react-bootstrap";

function GamesDatabase({ boardPosition }) {
  const [gamesData, setGamesData] = useState(null);

  async function getGames() {
    try {
      const response = await fetch(
        `https://explorer.lichess.ovh/masters?fen=${boardPosition}`
      );
      const games = await response.json();
      setGamesData(games);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGames();
  }, [boardPosition]);

  function calculatePercentages(move) {
    const totalGames = move.white + move.draws + move.black;
    const whitePercentage = ((move.white / totalGames) * 100).toFixed(2);
    const drawsPercentage = ((move.draws / totalGames) * 100).toFixed(2);
    const blackPercentage = ((move.black / totalGames) * 100).toFixed(2);

    return {
      totalGames,
      whitePercentage,
      drawsPercentage,
      blackPercentage,
    };
  }

  if (!gamesData) {
    return <p>Loading database...</p>;
  } else {
    return (
      <Card className="card">
        <CardTitle>Master games database</CardTitle>
        <CardBody>
          <ListGroup className="list-group-moves">
            {gamesData.moves.map((move, index) => {
              const {
                totalGames,
                whitePercentage,
                drawsPercentage,
                blackPercentage,
              } = calculatePercentages(move);

              return (
                <ListGroup.Item className="list-item-moves" key={index}>
                  <p>{move.san}</p>
                  <p>Total games: {totalGames}</p>
                  <p>White win: {whitePercentage}%</p>
                  <p>Draw: {drawsPercentage}%</p>
                  <p>Black win: {blackPercentage}%</p>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default GamesDatabase;
