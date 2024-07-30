import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function MyRepertoiresList() {
const [repertoires, setRepertoires] = useState([]);
const navigate = useNavigate();


    async function fetchRepertoires() {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            setRepertoires(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async function addNewRepertoire() {
        const newRepertoire = {
            title: "New Repertoire",
            moves: "",
            creator: "Alberto",
        };

        try {
            const response = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRepertoire),
            });
            if (response.ok) {
                fetchRepertoires();
            } else {
                console.error('Error adding new repertoire:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new repertoire:', error);
        }
    };

    async function deleteRepertoire(id) {
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
        <button onClick={addNewRepertoire}>Add new repertoire</button>
        <h2>Repertoire List</h2>
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