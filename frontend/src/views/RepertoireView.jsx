import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RepertoireView() {
    const {id} = useParams();
    const [repertoire, setRepertoire] = useState(null);

    useEffect(() => {
        const fetchRepertoire = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/data/repertoires/${id}`);
                const data = await response.json();
                setRepertoire(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRepertoire();
    }, [id]);

    if (!repertoire) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>{repertoire.title}</h1>
        <p>Moves: {repertoire.moves}</p>
        <p>Creator: {repertoire.creator}</p>
    </div>
}

export default RepertoireView;