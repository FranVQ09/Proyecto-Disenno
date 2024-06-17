import React, { useState, useEffect } from 'react';
import estuiante from '../../fotos/estudiante.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function MenuEstudiante() {
  const userId = sessionStorage.getItem('userId');
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesForm, setNotificacionesForm] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.223.33.212:3000/obtenerNotificaciones', {
          params: {
            idUsuario: userId
          }
        })
        setNotificaciones(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [userId]);

  const handleOpen = () => setNotificacionesForm(true);
  const handleClose = () => setNotificacionesForm(false);

  const handleNotificationClick = (notificacion) => {
    console.log("Notificacion: ", notificacion);
    setSelectedNotification(notificacion);
    actualizarParams(notificacion);
  };
  
  const actualizarParams = async (notificacion) => {
    try {
      console.log("Notificación seleccionada: ", notificacion);
      const response = await axios.put('http://18.223.33.212:3000/notificacionLeida', {
        idNoti: notificacion.idNotificaciones
      });
      console.log("Response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          <NotificationsIcon onClick={handleOpen} style={{ fontSize: '2vw' }} />
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
      {/* Formulario de notificaciones */}
      {notificacionesForm && (
        <form
          style={{
            position: 'absolute',
            top: '30vh',
            left: '84vw',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2vw',
            borderRadius: '0.3vw',
            boxShadow: '0px 0px 2vw rgba(0, 0, 0, 0.3)',
            zIndex: '1000',
            maxWidth: '90vw',
          }}
        >
          <div>
            <Typography variant='h4'>Notificaciones</Typography>
          </div>
          <div style={{ maxHeight: '20vh', overflowY: 'auto', width: '20vw' }}>
            {notificaciones.map((notificacion, index) => (
              <div
                key={index}
                onClick={() => handleNotificationClick(notificacion)}
                style={{
                  margin: '0',  // Eliminar márgenes entre notificaciones
                  padding: '0.5vw 1vw',  // Ajustar el tamaño del botón
                  backgroundColor: selectedNotification === notificacion ? '#f0f0f0' : 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  fontSize: '1vw',
                  borderBottom: '1px solid #ddd',  // Separador entre notificaciones
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedNotification === notificacion ? '#f0f0f0' : 'white'}
              >
                Actividad: {notificacion.Actividad}
                <br></br>
                Fecha de Realización: {notificacion.FechaRealizacion}
                <br></br>
                Visto: {notificacion.Visto === "NOLEIDO" ? "No leido" : (notificacion.Visto === "LEIDO" ? "Leido" : notificacion.Visto)}
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={handleClose} style={{ marginTop: '1vw', padding: '0.5vw 1vw' }}>
              Cerrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default MenuEstudiante
