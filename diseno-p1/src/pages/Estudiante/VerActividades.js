import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function VerActividades() {
  const localizer = dayjsLocalizer(dayjs);
  const anno = new Date().getFullYear();
  const [actividades, setActividades] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.223.33.212:3000/activities/obtenerActPlaneadas', {
          params: {
            anno: anno
          }
        });
        
        
        const events = response.data.map(event => ({
          title: event.nombre, 
          start: new Date(event.fechaRealizacion),
          end: new Date(event.fechaRealizacion),
          allDay: true, 
          description: event.Modalidad,
        }));
        
        setActividades(response.data);
        setEvents(events);
      } catch {
        alert('Error al cargar las actividades');
      }
    };
    fetchData();
  }, [anno]);

  console.log(actividades);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#E2CE1A',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          fontSize: '3.5vw',
          color: '#38340C',
          marginLeft: '-65vw',
          marginTop: '5vh',
        }}
      >
        Ver Actividades
      </h1>
      <div style={{ width: "80vw", height: "70vh", backgroundColor:"white", borderRadius:"0.5vw" }}>
        <Calendar
          localizer={localizer}
          events={events} 
          views={['month', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "100%" }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <div style={{ marginTop:"3vh", marginBottom:"3vh"}}>
        <Link to="/estudiante">
          <Button style={{ backgroundColor:"#E2CE1A", border: "0.15vw solid #38340C", color:"#38340C", marginLeft:"1vw", padding:"1vh", width:"10vw"}}>Salir</Button>
        </Link>
      </div>
            {/* Dialog to show event details */}
            <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedEvent ? (
              <>
                <strong>Título:</strong> {selectedEvent.title}<br />
                <strong>Fecha:</strong> {selectedEvent.start.toLocaleDateString()}<br />
                <strong>Descripción:</strong> {selectedEvent.description}
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VerActividades;
