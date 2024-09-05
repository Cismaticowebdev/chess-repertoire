import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import MyNavbar from "./components/MyNavbar";
import Repertoires from "./views/Repertoires";
import Login from "./views/Login";
import Signup from "./views/Signup";
import RepertoireView from "./views/RepertoireView";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<ProtectedRoute component={Login} isPrivate={false} />}
            />
            <Route
              path="/signup"
              element={<ProtectedRoute component={Signup} isPrivate={false} />}
            />
            <Route
              path="/logout"
              element={<ProtectedRoute component={Logout} isPrivate={true} />}
            />
            <Route path="/repertoires" element={<Repertoires />} />
            <Route path="/repertoire/:id" element={<RepertoireView />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
