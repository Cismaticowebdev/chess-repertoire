import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "./AuthContext";

function MyNavbar() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Chess Repertoire
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/signup" className="nav-link">
                Sign Up
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/logout" className="nav-link">
                Logout
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/repertoires" className="nav-link">
              Repertoires
            </Nav.Link>
            {user && <p className="user-text">Logged as {user.email}</p>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
