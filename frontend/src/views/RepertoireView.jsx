import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChessRepertoireBoard from "../components/ChessRepertoireBoard";

function RepertoireView() {
    const {id} = useParams();
    const [repertoire, setRepertoire] = useState(null);

    useEffect(() => {
        const fetchRepertoire = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/data/${id}`);
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
        <ChessRepertoireBoard repertoire={repertoire}/>
    </div>
}

export default RepertoireView;