import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

function ConsultasDetalleEquipo() {
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
        <div style={{ width: '2%', height: '5vh', backgroundColor: '#E2CE1A', marginLeft: '2vh', marginTop: '1.5vh' }}></div>
        <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', padding: '0.7vh', display: 'inline-block', borderRadius: '1vh', backgroundColor: '#38340C', marginTop: '-6.5vh', marginLeft:"2vw" }}>Consultas</a>
        <Link href="/consultasEstudiantes" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '30vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Detalles del Equipo</Link>
        <Link href="/consultasEstudiantes" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "3.5vw" }}>Estudiantes</Link>
        <Link href="/consultasPlanActividades" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#38340C', marginTop: '2vh', marginLeft: "1.2vw"}}>Plan de Actividades</Link>
        <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"30vh", marginLeft:"6vw" }}>Salir</Link>
      </div>
      <Paper style={{ marginTop: '4vh', width: '60vw', marginLeft: "15vw" }}>
        <Table>
        <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Nombre</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Correo</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Sede</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Código</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Año</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Dato 1</TableCell>
              <TableCell>Dato 2</TableCell>
              <TableCell>Dato 3</TableCell>
              <TableCell>Dato 4</TableCell>
              <TableCell>Dato 5</TableCell>
            </TableRow>
            {/* Agrega más filas según sea necesario */}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default ConsultasDetalleEquipo;
