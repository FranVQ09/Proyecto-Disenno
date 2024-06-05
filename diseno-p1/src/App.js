import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Imports de las paginas
// Import de Login Page y Register Page
import Login from "./pages/Menu/loginPage";
import Register from "./pages/Menu/registerPage";

// Imports de las ventas de trabajo
import Menu from "./pages/Menu/Menu";

// Import de Asistnete Administrativo
import AsistenteAdministrativo from "./pages/AsistenteAdministrativo/menuAsistente";
import ConsultasDetalleEquipo from './pages/AsistenteAdministrativo/consultasDetalleEquipo';
import ConsultasEstudiantes from './pages/AsistenteAdministrativo/consultasEstudiantes';
import ConsultasPlanActividades from './pages/AsistenteAdministrativo/consultasPlanActividades';
import GestionarEquipo from './pages/AsistenteAdministrativo/gestionarEquipo';
import AgregarProfesor from './pages/AsistenteAdministrativo/agregarProfesor';
import RegistrarProfesor from './pages/AsistenteAdministrativo/registrarProfesor';
import InformesExcel from './pages/AsistenteAdministrativo/InformesExcel';
import CargarInforme from './pages/AsistenteAdministrativo/CargarInforme';
import ModificarInformacionProfesor from './pages/AsistenteAdministrativo/ModificarInformacionProfesor';
import ModificarEstudianteAsistente from './pages/AsistenteAdministrativo/ModificarEstudianteAsistente';

// Import Profesor Coordinador
import MenuProfesorCoordinador from './pages/ProfesorCoordinador/MenuProfesor';
import ConsultasProfesorCoordinador from './pages/ProfesorCoordinador/ConsultasProfesorCoordinador';
import ConsultasEstudiantesCoordinador from './pages/ProfesorCoordinador/ConsultasEstudianteCoordinador';
import ModificarCoordinador from './pages/ProfesorCoordinador/ModificarCoordinador';
import ModificarEstudianteCoordinador from './pages/ProfesorCoordinador/ModificarEstudianteCoordinador';
import CrearPlan from './pages/ProfesorCoordinador/CrearPlan';
import ActualizarPlan from './pages/ProfesorCoordinador/ActualizarPlan';
import VisualizarPlan from './pages/ProfesorCoordinador/VisualizarPlan';

// Import Profesor
import MenuProfesor from './pages/Profesor/menuProfesor';
import ConsultasProfesor from './pages/Profesor/consultasProfesor';
import ConsultarEstudiantesProfesor from './pages/Profesor/consultarEstudiantesProfesor';
import ModificarProfesor from './pages/Profesor/modificarProfesor';
import ModificarEstudiante from './pages/Profesor/modificarEstudiante';
import PlanActividadesProfesor from './pages/Profesor/planActividaesProfesor';

// Import estudiante
import MenuEstudiante from './pages/Estudiante/MenuEstudiante';

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
          <Route path="/consultasDetalleEquipo" element={<ConsultasDetalleEquipo />} />
          <Route path="/consultasEstudiantes" element={<ConsultasEstudiantes />} />
          <Route path="/consultasPlanActividades" element={<ConsultasPlanActividades />} />
          <Route path="/gestionarEquipo" element={<GestionarEquipo />} />
          <Route path="/agregarProfesor" element={<AgregarProfesor />} />
          <Route path="/registrarProfesor" element={<RegistrarProfesor />} />
          <Route path="/informesExcel" element={<InformesExcel />} />
          <Route path="/cargarInforme" element={<CargarInforme />} />
          <Route path="/profesor" element={<MenuProfesor />} />
          <Route path="/consultasProfesor" element={<ConsultasProfesor />} />
          <Route path="/consultarEstudiantesProfesor" element={<ConsultarEstudiantesProfesor />} />
          <Route path="/modificarProfesor" element={<ModificarProfesor />} />
          <Route path="/modificarEstudiante" element={<ModificarEstudiante />} />
          <Route path="/planActividadesProfesor" element={<PlanActividadesProfesor />} />
          <Route path="/consultasProfesorCoordinador" element={<ConsultasProfesorCoordinador />} />
          <Route path="/consultasEstudianteCoordinador" element={<ConsultasEstudiantesCoordinador />} />
          <Route path="/modificarCoordinador" element={<ModificarCoordinador />} />
          <Route path="/modificarEstudianteCoordinador" element={<ModificarEstudianteCoordinador />} />
          <Route path="/crearPlan" element={<CrearPlan />} />
          <Route path="/actualizarPlan" element={<ActualizarPlan />} />
          <Route path="/visualizarPlan" element={<VisualizarPlan />} />
          <Route path="/modificarInformacionProfesor" element={<ModificarInformacionProfesor />} />
          <Route path="/modificarEstudianteAsistente" element={<ModificarEstudianteAsistente />} />
          <Route path="/estudiante" element={<MenuEstudiante />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
