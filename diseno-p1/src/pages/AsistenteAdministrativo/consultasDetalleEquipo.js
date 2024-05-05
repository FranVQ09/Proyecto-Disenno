import React, { useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ConsultasDetalleEquipo() {
  const [año, setAño] = useState('');
  const [buscarEquipo, setBuscarEquipo] = useState(true);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [datosEquipo, setDatosEquipo] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (año === '2024') {
      const datosSimulados = [
        { codigo: 'CA-001', nombre: 'Francisco Villanueva', apellido1: 'Apellido1', apellido2: 'Apellido2', coordinador: 'True' },
        { codigo: 'SJ-001', nombre: 'José Gutiérrez', apellido1: 'Apellido1', apellido2: 'Apellido2', coordinador: 'False' },
      ];
      setBuscarEquipo(false);
      setMostrarDetalles(true);
      setDatosEquipo(datosSimulados);
    } else {
      alert('No se encontraron equipos con ese año');
      setAño('');
    }
  }

  const handleCancelar = () => {
    setBuscarEquipo(true);
    setMostrarDetalles(false);
    setAño('');
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
        <Link href="/consultasDetalleEquipo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '30vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Detalles del Equipo</Link>
        <Link href="/consultasEstudiantes" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "3.5vw" }}>Estudiantes</Link>
        <Link href="/consultasPlanActividades" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#38340C', marginTop: '2vh', marginLeft: "1.2vw"}}>Plan de Actividades</Link>
        <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"30vh", marginLeft:"6vw" }}>Salir</Link>
      </div>
      <div style={{display:"flex", justifyContent:"center", width:"80vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
      {buscarEquipo && (
        <Paper elevation={3} style={{ width:"30vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
        <h1 style={{ color: '#38340C', fontSize: '2vw', textAlign: 'center', marginBottom: '3vh' }}>Detalles de Equipo</h1>
        <h3 style={{ color: '#38340C', fontSize: '1vw', textAlign: 'center', marginBottom: '1vh' }}>Buscar Equipo por Año:</h3>
        <div style={{ display:"flex", justifyContent:"center"}}>
          <form onSubmit={handleSubmit}>
            <TextField
                type="text"
                label="Año"
                value={año}
                onChange={(event) => setAño(event.target.value)}
                variant="outlined"
                style={{ width: "15vw", marginBottom: "1vh", backgroundColor:"white", borderRadius:"0.5vh" }}
            />
          </form>
        </div>
      </Paper>
      )}
      {mostrarDetalles && (
          <Paper elevation={3} style={{ width:"50vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw", marginTop:"1vh" }}>
            <h1 style={{ color: '#38340C', fontSize: '2vw', textAlign: 'center', marginBottom: '3vh' }}>Detalles del Equipo</h1>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor:"#38340C" }}>
                  <TableCell style={{ color:"#FFFF"}}>Código</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Nombre</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Apellido 1</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Apellido 2</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Coordinador</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor:"#FFFF"}}>
                {datosEquipo.map((profesor) => (
                  <TableRow key={profesor.codigo}>
                    <TableCell>{profesor.codigo}</TableCell>
                    <TableCell>{profesor.nombre}</TableCell>
                    <TableCell>{profesor.apellido1}</TableCell>
                    <TableCell>{profesor.apellido2}</TableCell>
                    <TableCell>{profesor.coordinador}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={handleCancelar} variant='contained' style={{ backgroundColor:"#38340C", marginTop:"1vh"}}>Regresar</Button>
          </Paper>
      )}
      </div>
    </div>
  );
}

export default ConsultasDetalleEquipo;
