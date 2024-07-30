import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function MyRepertoiresList() {
const [repertoires, setRepertoires] = useState([]);
const navigate = useNavigate();


    const fetchRepertoires = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            setRepertoires(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteRepertoire = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/data/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchRepertoires();
            } else {
                console.error('Error deleting repertoire:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting repertoire:', error);
        }
    };

    useEffect(() => {
        fetchRepertoires();
    }, []);

    function viewRepertoire(id) {
        navigate(`/repertoire/${id}`);
    }

    return <div>
        <h1>Repertoire List</h1>
        <ul>
            {repertoires.map(repertoire => (
                <li key={repertoire.id}>
                    <h3>{repertoire.title}</h3>
                    <p>{repertoire.moves}</p>
                    <p>{repertoire.creator}</p>
                    <button onClick={() => viewRepertoire(repertoire.id)}>View</button>
                    <button onClick={() => deleteRepertoire(repertoire.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
}

export default MyRepertoiresList;