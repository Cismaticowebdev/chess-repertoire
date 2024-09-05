import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import repertoireListImg from "../images/repertoire-list.JPG";
import repertoireEngineImg from "../images/repertoire-engine.JPG";
import repertoireViewImg from "../images/repertoire-view.JPG";

function Home() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1>Chess Repertoire</h1>
      <p>
        Welcome to Chess Repertoire! This app purpose is to help chess players
        to create an opening repertoire and help them to practice their
        openings.
      </p>

      <Carousel className="carousel">
        <Carousel.Item>
          <img src={repertoireListImg} alt="" />
          <Carousel.Caption>
            <h3>Search Repertoires</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={repertoireViewImg} alt="" />
          <Carousel.Caption>
            <h3>Modify your repertoires</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={repertoireEngineImg} alt="" />
          <Carousel.Caption>
            <h3>Use Stockfish to find the best move!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
