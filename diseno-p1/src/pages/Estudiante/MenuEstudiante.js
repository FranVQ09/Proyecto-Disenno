import React from 'react';
import estuiante from '../../fotos/estudiante.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';

function MenuEstudiante() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center', // Alinear al principio verticalmente
        minHeight: '100vh', // Altura mínima de la ventana
        backgroundColor: '#E2CE1A', // Color de fondo
        overflow: 'hidden' // Ocultar el desbordamiento
      }}
    >
      {/* Caja del menú en la parte de arriba */}
      <div
        style={{
          width: '100vw', // Ancho del contenedor al 100% del viewport
          padding: '1vh', // Espaciado interno
          backgroundColor: '#38340C', // Color de la caja 
          display: 'flex', // Utilizar flexbox para alinear elementos
          justifyContent: 'space-between', // Distribuir los elementos horizontalmente
          alignItems: 'center', // Centrar verticalmente
          height: '8vh', // Altura de la barra del menú
          marginTop: '5vh' // Margen superior para separarlo ligeramente
        }}
      >
        {/* Enlaces del menú */}
        <div style={{ display: 'flex' }}>
          <a
            href="/verPerfilEstudiante"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5vw', // Tamaño de fuente
              textDecoration: 'none', // Quitar subrayado del enlace
              marginLeft: '1vw',
              marginRight: '1vw' // Margen derecho entre enlaces
            }}
          >
            Ver Perfil
          </a>
          <a
            href="/modificarPerfilEstudiante"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5vw',
              textDecoration: 'none',
              marginLeft: '1vw',
              marginRight: '1vw' // Margen derecho entre enlaces
            }}
          >
            Modificar Perfil
          </a>
          <a
            href="/verActividades"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5vw',
              textDecoration: 'none',
              marginLeft: '1vw',
              marginRight: '1vw' // Margen derecho entre enlaces
            }}
          >
            Ver Actividades
          </a>
          <a
            href="/verProximaActividad"
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5vw',
              textDecoration: 'none',
              marginLeft: '1.5vw',
              marginRight: '1vw' // Margen derecho entre enlaces
            }}
          >
            Ver Próxima Actividad
          </a>
        </div>
        <IconButton style={{ color: 'white', marginLeft: "33vw" }}>
          <NotificationsIcon style={{ fontSize: '2vw' }} />
        </IconButton>
        <a
          href="/"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5vw',
            textDecoration: 'none',
            marginLeft: '1vw',
            marginRight: '1vw' // Margen izquierdo
          }}
        >
          Cerrar Sesión
        </a>
      </div>

      {/* Encabezado */}
      <h1
        style={{
          color: '#333',
          fontSize: '3.7vw', // Utilizar el 5% del ancho del viewport para el tamaño de fuente
          textAlign: 'left', // Alinear a la izquierda
          margin: '25vh 0 0 -70vw', // Margen superior, derecha, inferior e izquierda con unidades de viewport
          whiteSpace: 'nowrap' // Evitar el salto de línea
        }}
      >
        <div>Página</div> {/* Espaciado entre palabras */}
        <div>Estudiante</div> {/* Espaciado entre palabras */}
      </h1>
      <img
        src={estuiante}
        alt="Profesor Guía"
        style={{
          width: '45vw', // Ancho de la imagen en relación al viewport
          objectFit: 'cover', // Ajustar la imagen para que se ajuste al contenedor sin cambiar sus proporciones
          marginLeft: '40vw', // Margen izquierdo en relación al viewport
          marginTop: '-30vh',// Margen superior en relación al viewport

        }}
      />
    </div>
  );
}

export default MenuEstudiante
