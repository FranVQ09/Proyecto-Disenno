import React, {useState, useEffect} from 'react';
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
  const [mostrarPlan, setMostrarPlan] = useState(false);
  const [planSimulado, setPlanSimulado] = useState([]);




  const handleSubmit = (event) => {
    event.preventDefault();
    if (año === '2024') {
      const datosSimulados = [
        { nombre:"Actividad 1", tipo:"Orientadora", responsables:"Francisco Villanueva", fecha:"2024-10-10", hora:"10:00", lugar:"Aula 1", descripcion:"Actividad 1" },
        { nombre:"Actividad 2", tipo:"Orientadora", responsables:"Francisco Villanueva", fecha:"2024-10-10", hora:"10:00", lugar:"Aula 1", descripcion:"Actividad 2" },
        { nombre:"Actividad 3", tipo:"Orientadora", responsables:"Francisco Villanueva", fecha:"2024-10-10", hora:"10:00", lugar:"Aula 1", descripcion:"Actividad 3" },
        { nombre:"Actividad 4", tipo:"Orientadora", responsables:"Francisco Villanueva", fecha:"2024-10-10", hora:"10:00", lugar:"Aula 1", descripcion:"Actividad 4" },
        { nombre:"Actividad 5", tipo:"Orientadora", responsables:"Francisco Villanueva", fecha:"2024-10-10", hora:"10:00", lugar:"Aula 1", descripcion:"Actividad 5" },
      ];
      setPlanSimulado(datosSimulados);
      setMostrarPlan(true);
      setBuscarEquipo(false);
    } else {
      alert('No se encontraron equipos con ese año');
      setAño('');
    }
  }

  const handleCancelar = () => {
    setBuscarEquipo(true);
    setMostrarPlan(false);
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
        <Link href="/consultasDetalleEquipo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '30vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Detalles del Equipo</Link>
        <Link href="/consultasEstudiantes" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "3.5vw", borderRadius:'1vw'}}>Estudiantes</Link>
        <Link href="/consultasPlanActividades" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#E2CE1A', marginTop: '2vh', marginLeft: "1.2vw", borderRadius:'1vw'}}>Plan de Actividades</Link>
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
      {mostrarPlan && (
          <Paper elevation={3} style={{ width:"50vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw", marginTop:"1vh" }}>
            <h1 style={{ color: '#38340C', fontSize: '2vw', textAlign: 'center', marginBottom: '3vh' }}>Detalles del Equipo</h1>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor:"#38340C" }}>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Responsables</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Hora</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Lugar</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor:"#FFFF"}}>
                {planSimulado.map((plan) => (
                  <TableRow key={plan.codigo}>
                    <TableCell>{plan.nombre}</TableCell>
                    <TableCell>{plan.tipo}</TableCell>
                    <TableCell>{plan.responsables}</TableCell>
                    <TableCell>{plan.fecha}</TableCell>
                    <TableCell>{plan.hora}</TableCell>
                    <TableCell>{plan.lugar}</TableCell>
                    <TableCell>{plan.descripcion}</TableCell>
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
