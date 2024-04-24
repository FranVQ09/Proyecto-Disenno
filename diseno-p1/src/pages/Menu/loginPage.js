import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    // Lógica para manejar el inicio de sesión...
  };

  return (
    //Contenedor principa, ventana de fondo
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
          width: '400px', // Ancho del contenedor
          padding: '20px', // Espaciado interno
          borderRadius: '5px', // Bordes redondeados
          backgroundColor: '#FFFCA4', //Color de la caja 
          margin: 'auto' // Centrar horizontalmente
        }}
      >
        <h2
          style={{
            marginBottom: '30px',
            color: '#333', // Color del texto
            fontSize: '32px', // Tamaño de la fuente
            fontFamily: 'Arial', // Tipo de fuente
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
            sx={{
              marginBottom: '20px', // Espaciado
              width: '100%', // Ancho del campo de texto
              height: '50px', // Alto del campo de texto
            }}
          />
          <TextField
            id="contraseña"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
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
            <Link to="/menu" style={{ textDecoration: 'none' }}>
              <Button variant="contained" onClick={handleLogin} style={{
                backgroundColor: "#38340C",
              }}>
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
