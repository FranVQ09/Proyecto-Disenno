import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', //Alinear la caja mas arriba
        height: '70vh', // Hace que el contenedor ocupe toda la altura de la ventana
        backgroundColor: '#f5f5f5',
        paddingTop: '250px', // Espaciado superior
        overflow: 'hidden' // Ocultar el desbordamiento
      }}
    >
      <div
        style={{
          width: '400px', // Ancho del contenedor
          padding: '20px', // Espaciado interno
          border: '1px solid #ccc', // Borde
          borderRadius: '5px', // Bordes redondeados
          backgroundColor: '#fff', 
        }}
      >
        <h2 style={{ 
            marginBottom: '30px',
            color: '#333', // Color del texto
            fontSize: '32px', // Tamaño de la fuente
            fontFamily: 'Arial', // Tipo de fuente
            textAlign: 'center' // Alineación del texto
            }}
            >Iniciar Sesión
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
                height: '50px' // Alto del campo de texto
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
                height: '50px'
            }}
          />
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary">Iniciar Sesión</Button>
            {/*
            <Link to="/register" style={{ textDecoration: 'none'}}>
            <Button variant="contained" color="primary" style={{ marginRight: '50px'}}>Registrarse</Button>
            </Link>
            */}
        </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
