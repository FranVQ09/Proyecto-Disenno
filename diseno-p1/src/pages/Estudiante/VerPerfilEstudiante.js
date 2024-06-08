import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import axios from 'axios'


function VerPerfilEstudiante() {
  const userId = sessionStorage.getItem('userId');
  const [datosEstudiante, setDatosEstudiante] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const detalles = await axios.get('http://18.223.33.212:3000/students/obtDetailEstudiante', {
        params: {
          idUsuario: userId
        }
      });
      setDatosEstudiante(detalles.data[0]);
    }
    fetchData();
  }, [userId]);

  const sedeMap = {
    CA: 'Cartago',
    SJ: 'San José',
    LI: 'Limón',
    AL: 'Alajuela',
    SC: 'San Carlos',
  }

  const sedeDisplayName = sedeMap[datosEstudiante.Sede] || datosEstudiante.Sede || '';

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
              marginLeft: '-60vw',
              marginTop: '5vh',
          }}
      >
          Mi Perfil de Estudiante
      </h1>
        <Paper elevation={3} style={{ padding: '2vw', borderRadius: '1vw', width: '80vw', backgroundColor:"#EEE1B0" }}>
          <h2 style={{ color: '#38340C', marginTop: '1vh' }}>Información Personal</h2>
          <TextField
          label="Nombre"
          value={datosEstudiante.Nombre || ''}
          InputProps={{
            readOnly: true,
            style: { color: '#38340C' },
          }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          label="Carnet"
          value={datosEstudiante.Carnet || ''}
          InputProps={{
            readOnly: true,
            style: { color: '#38340C' },
          }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          label="Sede"
          value={sedeDisplayName}
          InputProps={{
            readOnly: true,
            style: { color: '#38340C' },
          }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          label="Correo"
          value={datosEstudiante.Correo || ''}
          InputProps={{
            readOnly: true,
            style: { color: '#38340C' },
          }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          label="Teléfono"
          value={datosEstudiante.Celular || ''}
          InputProps={{
            readOnly: true,
            style: { color: '#38340C' },
          }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        </Paper>
        <div style={{ marginTop:"3vh", marginBottom:"3vh"}}>
            <Link to="/estudiante">
              <Button style={{ backgroundColor:"#E2CE1A", border: "0.15vw solid #38340C", color:"#38340C", marginLeft:"1vw", padding:"1vh", width:"10vw"}}>Salir</Button>
            </Link>
        </div>
      </div>
  )
}

export default VerPerfilEstudiante
