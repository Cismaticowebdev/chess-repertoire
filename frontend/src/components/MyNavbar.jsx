import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
    return ( 
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Chess Repertoire</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" className="nav-link">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/myrepertoires" className="nav-link">My Repertoires</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default MyNavbar;