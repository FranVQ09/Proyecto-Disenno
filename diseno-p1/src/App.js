import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Imports de las paginas
//Import de Login Page y Register Page
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Esta creado el archivo pero no se sabe si hay que hacerlo */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
