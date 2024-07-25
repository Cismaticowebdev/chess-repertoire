import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function MyRepertoiresList() {
const [repertoires, setRepertoires] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const fetchRepertoires = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            setRepertoires(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchRepertoires();
}, []);

    function handleClick(id) {
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
                    <button onClick={handleClick}>View Repertoire</button>
                </li>
            ))}
        </ul>
    </div>
}

export default MyRepertoiresList;