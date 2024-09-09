import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  ListGroup,
  Pagination,
  Form,
} from "react-bootstrap";
import supabase from "../supabaseClient";
import { useAuth } from "./AuthContext";

function RepertoiresList() {
  const [repertoires, setRepertoires] = useState([]);
  const [myRepertoires, setMyrepertoires] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();
  const { user } = useAuth();

  async function fetchRepertoires(searchQuery = "") {
    let query = supabase.from("repertoires").select("*");

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data: repertoires, error } = await query;
    if (error) {
      console.error("Error fetching repertoires:", error);
    } else {
      setRepertoires(repertoires);
    }
  }

  async function addNewRepertoire() {
    const newRepertoire = {
      title: "New Repertoire",
      moves: "",
      email: user.email,
      userID: user.id,
    };

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

  useEffect(() => {
    setTotalPages(Math.ceil(repertoires.length / itemsPerPage));
  }, [repertoires, itemsPerPage]);

  const paginatedRepertoires = repertoires.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function viewRepertoire(id) {
    navigate(`/repertoire/${id}`);
  }

  function toggleMyRepertoires() {
    setMyrepertoires(!myRepertoires);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRepertoires(searchInput);
  };

  return (
    <Container fluid>
      <h1 className="mb-3">Repertoires</h1>
      <div className="">
        <Button variant="secondary" onClick={addNewRepertoire}>
          Add new repertoire
        </Button>
        <Button
          variant="success"
          className="mx-4"
          onClick={toggleMyRepertoires}
        >
          {myRepertoires
            ? "Show all the repertoires"
            : "Show only my repertoires"}
        </Button>

        <Form onSubmit={handleSearch}>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g Sicilian Defense"
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="mt-4 mb-3">
        {myRepertoires ? <h2>My Repertoires</h2> : <h2>All Repertoires</h2>}
      </div>

      <ListGroup className="list-group mb-5 pb-3">
        {paginatedRepertoires.map(
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
      <Pagination className="position-fixed bottom-0 pt-5">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

export default RepertoiresList;
