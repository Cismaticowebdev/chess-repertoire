import { useState, useEffect } from "react";

function MyRepertoiresList() {
const [repertoires, setRepertoires] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            setRepertoires(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

    return <div>
        <h1>List</h1>
        <ul>
            {repertoires.map(repertoire => (
                <li key={repertoire.id}>
                    <h3>{repertoire.title}</h3>
                    <p>{repertoire.moves}</p>
                    <p>{repertoire.creator}</p>
                </li>
            ))}
        </ul>
    </div>
}

export default MyRepertoiresList;