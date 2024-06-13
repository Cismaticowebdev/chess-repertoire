import { Link } from "react-router-dom";
import MyRepertoiresList from "../components/MyRepertoiresList";

function MyRepertoires() {
    return <div>
        <h1>My Repertoires</h1>
        <Link to='newrepertoire'>Add new repertoire</Link>
        <MyRepertoiresList />
    </div>
}

export default MyRepertoires;