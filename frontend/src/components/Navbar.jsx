import { Link } from "react-router-dom";

function Navbar() {
    return <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/myrepertoires">My Repertoires</Link>
    </div>
}

export default Navbar;