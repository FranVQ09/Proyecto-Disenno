import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import axios from 'axios';

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
  const añoActual = new Date().getFullYear();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://3.14.65.142:3000/iniciarSesion', {
        correo: correo, 
        password: password
      });
      
      sessionStorage.setItem('userId', response.data.body[0].id);
      sessionStorage.setItem('userSede', response.data.body[0].Sede);

      const userId = sessionStorage.getItem('userId');

      console.log(userId);  

      if (response.data.body[0].Tipo === 1) {
        const result = await axios.get('http://3.14.65.142:3000/professors/esCoordinador', {
          params: {
            idAnno: añoActual,
            idProfesor: response.data.body[0].Id
          }
        });

        console.log(result.data);
        if (result.data.Result === -1 || result.data.body[0].isCoordinador === -2 || result.data.body[0].isCoordinador === 0) { 
          navigate('/profesor');
        } else {
          navigate('/profesorCoordinador');
        }

        } else if (response.data.body[0].Tipo === 3) {
          navigate('/asistente');
        } else {
          alert('Profesor no registrado');
        }
      setCorreo('');
      setPassword('');
      
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      alert('Error al iniciar sesión');
    }
  };

  const handleCambiarPassword = () => {
    setShowChangePasswordForm(true); // Muestra el formulario de cambio de contraseña
  };

  const handleCancelarCambiarContraseña = () => {
    setShowChangePasswordForm(false);
  }

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    try {
      // Actualiza el estado 'password' con el valor del campo de contraseña
      setPassword(newPassword);
      const response = await axios.put('http://3.14.65.142:3000/cambiarPassword', {
        correo: correo,
        newPassword: newPassword
      });
      alert('Contraseña cambiada correctamente');
      setCorreo('');
      setNewPassword('');
      setPassword('');
      setShowChangePasswordForm(false);
      
    } catch (error) {
      console.error('Error al cambiar la contraseña: ', error);
      alert('Error al cambiar la contraseña');
    }
  };

  return (
    // Contenedor principal, ventana de fondo
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centrar verticalmente
        height: '100vh', // Hace que el contenedor ocupe toda la altura de la ventana
        backgroundColor: '#E2CE1A', // Color de fondo
        overflow: 'hidden' // Ocultar el desbordamiento
      }}
    >
      {/* Contenedor de la caja */}
      <div
        style={{
          width: '30%', // Ancho del contenedor
          padding: '20px', // Espaciado interno
          borderRadius: '5px', // Bordes redondeados
          backgroundColor: '#FFFCA4', // Color de la caja 
          margin: 'auto' // Centrar horizontalmente
        }}
      >
        <h2
          style={{
            marginBottom: '30px',
            color: '#333', // Color del texto
            fontSize: '32px', // Tamaño de la fuente
            textAlign: 'center' // Alineación del texto
          }}
        >
          Iniciar Sesión
        </h2>
        <form>
          <TextField
            id="correo"
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            sx={{
              marginBottom: '20px', // Espaciado
              width: '100%', // Ancho del campo de texto
              height: '50px', // Alto del campo de texto
            }}
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: '20px',
              width: '100%',
              height: '50px',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            <Button variant="contained" onClick={handleLogin} style={{
              backgroundColor: "#38340C",
              border:" 0.2vw solid #38340C",
              marginRight: "1rem"
            }}>
              Iniciar Sesión
            </Button>
            {/* Botón para cambiar contraseña */}
            <Button onClick={handleCambiarPassword}  style={{ color:"#38340C", border:" 0.2vw solid #38340C" }}>
              Cambiar Contraseña
            </Button>
          </div>
        </form>
      </div>
      {/* Formulario de cambio de contraseña */}
      {showChangePasswordForm && (
        <div
          style={{
            position: 'absolute',
            width:"30vw",
            height:"27vh",
            top: '50vh', // Centra verticalmente
            left: '50vw', // Centra horizontalmente
            transform: 'translate(-50%, -50%)', // Centra el formulario
            padding: '2vh',
            borderRadius: '0.5vw',
            backgroundColor: '#FFFCA4',
            zIndex: 9999
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Cambiar Contraseña</h1>
          <form onSubmit={handleSubmitChangePassword}>
            <TextField
              id="correo"
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              sx={{ marginBottom: '2vh' }}
            />
            <TextField
              id="newPassword"
              label="Cambiar Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword} // Establece el valor del campo de contraseña como el estado 'newPassword'
              onChange={(e) => setNewPassword(e.target.value)} // Actualiza el estado 'newPassword' al cambiar el valor del campo
              sx={{ marginBottom: '2vh' }}
            />
            <Button type="submit" variant="contained" style={{ backgroundColor: "#38340C", color: "#FFF", border:" 0.2vw solid #38340C" }}>
              Cambiar
            </Button>
            <Button onClick={handleCancelarCambiarContraseña} style={{ marginLeft: "1vw", color:"#38340C",  border:" 0.2vw solid #38340C" }}>
              Cancelar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
