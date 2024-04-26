import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function ConsultasDetalleEquipo() {
  const [ordenNombre, setOrdenNombre] = useState('asc');
  const [ordenCarnet, setOrdenCarnet] = useState('asc');
  const [ordenSede, setOrdenSede] = useState('asc');

  const [datos, setDatos] = useState([
    { nombre: 'Juan', carnet: '2020080900', sede: 'Cartago', correo: 'juan@example.com', telefono: '123456789' },
    { nombre: 'María', carnet: '2021050800', sede: 'San José', correo: 'maria@example.com', telefono: '987654321' },
    { nombre: 'Andrés', carnet: '2021043887', sede: 'Heredia', correo: 'pedro@example.com', telefono: '456789123'}
  ]);

  const handleOrdenNombre = () => {
    const nuevoOrden = ordenNombre === 'asc' ? 'desc' : 'asc';
    setOrdenNombre(nuevoOrden);
    const datosOrdenados = [...datos];
    datosOrdenados.sort((a, b) => {
      if (ordenNombre === 'asc') {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
    setDatos(datosOrdenados);
  };

  const handleOrdenCarnet = () => {
    const nuevoOrden = ordenCarnet === 'asc' ? 'desc' : 'asc';
    setOrdenCarnet(nuevoOrden);
    const datosOrdenados = [...datos];
    datosOrdenados.sort((a, b) => {
      if (ordenCarnet === 'asc') {
        return parseInt(a.carnet) - parseInt(b.carnet);
      } else {
        return parseInt(b.carnet) - parseInt(a.carnet);
      }
    });
    setDatos(datosOrdenados);
  }

  const handleOrdenSede = () => {
    const nuevoOrden = ordenSede === 'asc' ? 'desc' : 'asc';
    setOrdenSede(nuevoOrden);
    const datosOrdenados = [...datos];
    datosOrdenados.sort((a, b) => {
      if (ordenSede === 'asc') {
        return a.sede.localeCompare(b.sede);
      } else {
        return b.sede.localeCompare(a.sede);
      }
    });
    setDatos(datosOrdenados);
  }

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
        <Link href="/consultasDetalleEquipo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '30vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Detalles del Equipo</Link>
        <Link href="/consultasEstudiantes" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "3.5vw", borderRadius:'1vw'}}>Estudiantes</Link>
        <Link href="/consultasPlanActividades" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#38340C', marginTop: '2vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Plan de Actividades</Link>
        <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"30vh", marginLeft:"6vw" }}>Salir</Link>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#38340C',
            overflow: 'hidden',
            width: '60vw',
            marginLeft: '15vw',
            marginTop: '4vh',
            borderTopLeftRadius: '1vw',
            borderTopRightRadius: '1vw',
          }}
        >
        {/* Filtros */}
          <label style={{ color: "white", marginLeft:"2vw", marginTop:"1.7vh", fontSize:'1.2vw' }}>Filtros: </label>
          <Button onClick={handleOrdenNombre} style={{ marginLeft:"2vw", marginTop:"2vh", color:"white"}}>
            Ordenar por Nombre {ordenNombre === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </Button>
          <Button onClick={handleOrdenCarnet} style={{ marginLeft:"1vw", marginTop:"2vh", color:"white"}}>
            Ordenar por Carnet {ordenCarnet === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </Button>
          <Button onClick={handleOrdenSede} style={{ marginLeft:"1vw", marginTop:"2vh", color:"white"}}>
            Ordenar por Sede {ordenSede === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </Button>
        </div>
        <Paper style={{ marginTop: '0vh', width: '60vw', marginLeft: "15vw" }}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Nombre</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Carnet</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Sede</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Correo</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((estudiante, index) => (
                <TableRow key={index}>
                  <TableCell>{estudiante.nombre}</TableCell>
                  <TableCell>{estudiante.carnet}</TableCell>
                  <TableCell>{estudiante.sede}</TableCell>
                  <TableCell>{estudiante.correo}</TableCell>
                  <TableCell>{estudiante.telefono}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default ConsultasDetalleEquipo;
