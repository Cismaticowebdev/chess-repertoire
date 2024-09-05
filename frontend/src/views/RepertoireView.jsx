import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChessRepertoireBoard from "../components/ChessRepertoireBoard";
import Container from "react-bootstrap/Container";
import supabase from "../supabaseClient";

function RepertoireView() {
  const { id } = useParams();
  const [repertoire, setRepertoire] = useState(null);

  async function fetchRepertoire() {
    let { data: repertoires, error } = await supabase
      .from("repertoires")
      .select("*")
      .eq("id", id)
      .single();
    setRepertoire(repertoires);
  }

  useEffect(() => {
    fetchRepertoire();
  }, [id]);

  if (!repertoire) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <ChessRepertoireBoard repertoire={repertoire} />
    </Container>
  );
}

export default RepertoireView;
