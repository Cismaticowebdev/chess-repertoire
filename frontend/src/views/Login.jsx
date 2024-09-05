import LoginForm from "../components/LoginForm";
import Container from "react-bootstrap/Container";

function Login() {
  return (
    <Container className="col-10 col-md-7 col-xl-5 d-flex flex-column justify-content-center align-items-center mt-5">
      <h1>Login</h1>
      <LoginForm />
    </Container>
  );
}

export default Login;
