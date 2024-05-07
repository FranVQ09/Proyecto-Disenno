import React, { useState, useEffect } from 'react';
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
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import axios from 'axios';

function ConsultasDetalleEquipo() {
  const [ordenNombre, setOrdenNombre] = useState('asc');
  const [ordenCarnet, setOrdenCarnet] = useState('asc');
  const [ordenSede, setOrdenSede] = useState('asc');
  const [datos, setDatos] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.14.65.142:3000/students/obtenerDatosEstudiante', {
          params: {
            idUsuario: userId
          }
        });
        console.log(response.data);
        setDatos(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleOrdenNombre = () => {
    const nuevoOrden = ordenNombre === 'asc' ? 'desc' : 'asc';
    setOrdenNombre(nuevoOrden);
    const datosOrdenados = [...datos];

    datosOrdenados.sort((a, b) => {
      const nombreA = a.Nombre || '';
      const nombreB = b.Nombre || '';

      if (ordenNombre === 'asc') {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    })
    setDatos(datosOrdenados);
  };

  const handleOrdenCarnet = () => {
    const nuevoOrden = ordenCarnet === 'asc' ? 'desc' : 'asc';
    setOrdenCarnet(nuevoOrden);
    const datosOrdenados = [...datos];


    datosOrdenados.sort((a, b) => {
      const carnetA = a.carnet || '';
      const carnetB = b.carnet || '';

      if (ordenCarnet === 'asc') {
        return carnetA.localeCompare(carnetB);
      } else {
        return carnetB.localeCompare(carnetA);
      }
    });
    setDatos(datosOrdenados);
  }

  const handleOrdenAP1 = () => {
    const nuevoOrden = ordenSede === 'asc' ? 'desc' : 'asc';
    setOrdenSede(nuevoOrden);
    const datosOrdenados = [...datos];


    datosOrdenados.sort((a, b) => {
      const apellido1A = a.Apellido1 || '';
      const apellido1B = b.Apellido1 || '';

      if (ordenSede === 'asc') {
        return apellido1A.localeCompare(apellido1B);
      } else {
        return apellido1B.localeCompare(apellido1A);
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
          <Button onClick={handleOrdenNombre} style={{ marginLeft:"2vw", marginTop:"2vh", color:"white",}}>
            Ordenar por Nombre: <span style={{ marginLeft:"1vh", marginTop:"0.5vh"}}> {ordenNombre === 'asc' ? <SortByAlphaIcon style={{ color:"#E2CE1A" }}/> : <SortByAlphaIcon style={{ color:"#E2CE1A" }}/>} </span>
          </Button>
          <Button onClick={handleOrdenCarnet} style={{ marginLeft:"1vw", marginTop:"2vh", color:"white"}}>
            Ordenar por Carnet <span style={{ marginLeft:"1vh", marginTop:"0.5vh"}}>{ordenCarnet === 'asc' ? <ArrowUpwardIcon style={{ color:"#E2CE1A" }}/> : <ArrowDownwardIcon style={{ color:"#E2CE1A" }}/>}</span>
          </Button>
          <Button onClick={handleOrdenAP1} style={{ marginLeft:"1vw", marginTop:"2vh", color:"white"}}>
            Ordenar por Apellido 1: <span style={{ marginLeft:"1vh", marginTop:"0.5vh"}}>{ordenSede === 'asc' ? <SortByAlphaIcon style={{ color:"#E2CE1A" }}/> : <SortByAlphaIcon style={{ color:"#E2CE1A" }}/>} </span>
          </Button>
        </div>
        <Paper style={{ marginTop: '0vh', width: '60vw', marginLeft: "15vw" }}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Nombre</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Apellido 1</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Apellido 2</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Correo</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Celular</TableCell>
                <TableCell style={{ backgroundColor:'#EEE1B0'}}>Carnet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((estudiante, index) => (
                <TableRow key={index}>
                  <TableCell>{estudiante.Nombre}</TableCell>
                  <TableCell>{estudiante.Apellido1}</TableCell>
                  <TableCell>{estudiante.Apellido2}</TableCell>
                  <TableCell>{estudiante.correo}</TableCell>
                  <TableCell>{estudiante.celular}</TableCell>
                  <TableCell>{estudiante.carnet}</TableCell>
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
