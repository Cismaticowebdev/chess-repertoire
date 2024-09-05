import SignupForm from "../components/SignupForm";
import Container from "react-bootstrap/Container";

function Signup() {
  return (
    <Container className="col-10 col-md-7 col-xl-5 d-flex flex-column justify-content-center align-items-center mt-5">
      <h1>Sign Up</h1>
      <SignupForm />
    </Container>
  );
}

export default Signup;
