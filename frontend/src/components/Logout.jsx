import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import supabase from "../supabaseClient";

function Logout() {
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    alert("Logged out successfully!");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h3>Click on the button below to logout</h3>
      <Button className="mt-5" variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default Logout;
