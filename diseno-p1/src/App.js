import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Imports de las paginas
//Import de Login Page y Register Page
import Login from "./pages/Menu/loginPage";
import Register from "./pages/Menu/registerPage";

//Imports de las ventas de trabajo
import Menu from "./pages/Menu/Menu";

//Import de Asistnete Administrativo
import AsistenteAdministrativo from "./pages/AsistenteAdministrativo/menuAsistente";

// Import Profesor Coordinador
import MenuProfesorCoordinador from './pages/ProfesorCoordinador/MenuProfesor';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Esta creado el archivo pero no se sabe si hay que hacerlo */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/asistente" element={<AsistenteAdministrativo />} />
          <Route path="/profesorCoordinador" element={<MenuProfesorCoordinador />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
