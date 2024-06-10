import { Paper, Table, TableBody, TableRow, TableCell, createTheme, ThemeProvider, TableHead } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Link from '@mui/material/Link';

function VerProximaActividad() {
  const [actividad, setActividad] = useState([]);
  const [idEquipo, setIdEquipo] = useState(0);
  const [idPlanTrabajo, setIdPlanTrabajo] = useState(0);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const formattedDate = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;

  // Obtener idEquipo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.223.33.212:3000/obtenerEquipoAnno', {
          params: {
            anno: year
          }
        })

        setIdEquipo(response.data[0].id);
        
        // Obtener idPlaTrabajo
        if(idEquipo != 0) {
          const result = await axios.get('http://18.223.33.212:3000/obtenerPlanTrabajo', {
            params: {
              idEquipo: idEquipo
            }
          })

          setIdPlanTrabajo(result.data[0].id);
          
          // Obtener datos proxima actividad
          if(idPlanTrabajo != 0) {
            const finalResult = await axios.get('http://18.223.33.212:3000/activities/obtenerProxActividad', {
              params: {
                fechaAct: formattedDate,
                idPlanTraba: idPlanTrabajo
              }
            })

            setActividad(finalResult.data[0]);
          }
        }

      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  })

  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#E2CE1A',
            overflow: 'hidden',
            minHeight: '100vh',
        }}
        >
          <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '17%',
                padding: '1vh',
                backgroundColor: '#38340C',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
          >
            <div style={{ width:"0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Próxima</a>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Actividad</a>
            </div>
            <div>
            <Link href="/estudiante" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"75vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
          </div>
          <div style={{ maxWidth:"90vw", width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw'}}>
            <Paper elevation={3} style={{ width:"73vw", marginLeft:"-4vw", padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
              <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Nombre de la Actividad</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Semana</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Modalidad</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Tipo</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Estado</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Fecha de Realización</TableCell>
                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Enlace</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={actividad.id} style={{ backgroundColor: "white" }}>
                      <TableCell>{ actividad.nombreActivida }</TableCell>
                      <TableCell>{ actividad.semana }</TableCell>
                      <TableCell>{ actividad.modalidad }</TableCell>
                      <TableCell>{ actividad.tipo }</TableCell>
                      <TableCell>{ actividad.estado }</TableCell>
                      <TableCell>{ actividad.fechaRealizacion }</TableCell>
                      <TableCell>{ actividad.enlace }</TableCell>
                  </TableRow>
              </TableBody>
              </Table>
            </Paper>
          </div>
    </div>
  )
}

export default VerProximaActividad
