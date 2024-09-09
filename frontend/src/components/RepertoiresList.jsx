import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, ListGroup } from "react-bootstrap";
import supabase from "../supabaseClient";
import { useAuth } from "./AuthContext";

function RepertoiresList() {
  const [repertoires, setRepertoires] = useState([]);
  const [myRepertoires, setMyrepertoires] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  async function fetchRepertoires() {
    let { data: repertoires, error } = await supabase
      .from("repertoires")
      .select("*");
    setRepertoires(repertoires);
  }

  async function addNewRepertoire() {
    const newRepertoire = {
      title: "New Repertoire",
      moves: "",
      email: user.email,
      userID: user.id,
    };

    console.log(user);

    const { data, error } = await supabase
      .from("repertoires")
      .insert([
        {
          title: newRepertoire.title,
          moves: newRepertoire.moves,
          email: newRepertoire.email,
          user_id: newRepertoire.userID,
        },
      ])
      .select();

    await fetchRepertoires();
  }

  async function deleteRepertoire(id) {
    const { error } = await supabase.from("repertoires").delete().eq("id", id);
    await fetchRepertoires();
    console.log(error);
  }

  useEffect(() => {
    fetchRepertoires();
  }, []);

  function viewRepertoire(id) {
    navigate(`/repertoire/${id}`);
  }

  function toggleMyRepertoires() {
    setMyrepertoires(!myRepertoires);
  }

  return (
    <Container fluid>
      <h1 className="mb-3">Repertoires</h1>
      <Button variant="secondary" onClick={addNewRepertoire}>
        Add new repertoire
      </Button>
      <Button variant="success" className="mx-4" onClick={toggleMyRepertoires}>
        {myRepertoires
          ? "Show all the repertoires"
          : "Show only my repertoires"}
      </Button>
      <div className="mt-4 mb-3">
        {myRepertoires ? <h2>My Repertoires</h2> : <h2>All Repertoires</h2>}
      </div>

      <ListGroup className="list-group">
        {repertoires.map(
          (repertoire) =>
            ((user && user.id === repertoire.user_id) || !myRepertoires) && (
              <ListGroup.Item className="list-item" key={repertoire.id}>
                <h3>{repertoire.title.substr(0, 40)}</h3>
                <p>Moves: {repertoire.moves.substr(0, 40)}</p>
                <p>Email: {repertoire.email.substr(0, 40)}</p>
                <Container className="d-flex justify-content-around">
                  <Button
                    variant="secondary"
                    onClick={() => viewRepertoire(repertoire.id)}
                    className="view-btn"
                  >
                    View
                  </Button>
                  {user && user.id === repertoire.user_id && (
                    <Button
                      variant="danger"
                      onClick={() => deleteRepertoire(repertoire.id)}
                      className="delete-btn"
                    >
                      Delete
                    </Button>
                  )}
                </Container>
              </ListGroup.Item>
            )
        )}
      </ListGroup>
    </Container>
  );
}

export default RepertoiresList;
