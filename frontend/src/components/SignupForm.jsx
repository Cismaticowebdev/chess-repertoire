import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import supabase from "../supabaseClient";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    alert("Registration successfull");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
  }

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </Form.Group>

        <Button variant="secondary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignupForm;
