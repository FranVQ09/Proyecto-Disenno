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
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function ConsultasDetalleEquipo() {
  const [año, setAño] = useState('');
  const [buscarEquipo, setBuscarEquipo] = useState(true);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [datosEquipo, setDatosEquipo] = useState([]);
  const [idEquipo, setIdEquipo] = useState(0);
  const [coordinador, setCoordinador] = useState('');
  const userId = sessionStorage.getItem('userId');

  console.log("UserId: ", userId  )
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.get('http://18.223.33.212:3000/obtenerEquipoAnno', {
        params: {
          anno: año
        }
      })
      setIdEquipo(result.data[0].id);
      console.log("IdEquipo: ", idEquipo);
      if (idEquipo > 0) {
        setMostrarDetalles(true);
        setBuscarEquipo(false);
      }

      const response = await axios.get('http://18.223.33.212:3000/obtenerDatosEquipo', {
        params: {
          idEquipo: idEquipo
        }
      })

      setDatosEquipo(response.data);
      console.log(datosEquipo)
    } catch (error) {
      console.error(error);
      alert('No se encontro el equipo para el año dado.');
      setAño('');
    }
  }

  const handleCancelar = () => {
    setBuscarEquipo(true);
    setMostrarDetalles(false);
    setAño('');
  }

  const handleEliminar = async (idBorrarProfesor) => {
    const intUserId = parseInt(userId);
    try {
      const result = await axios.delete('http://18.223.33.212:3000/professors/darDeBajaProfeEq', {
        data: {
          idProfesor: idBorrarProfesor,
          idEquipo: idEquipo,
          idAsisAdminis: intUserId
        }
      })
      const response = await axios.get('http://18.223.33.212:3000/obtenerDatosEquipo', {
        params: {
          idEquipo: idEquipo
        }
      })

      setDatosEquipo(response.data);
      alert('Profesor eliminado exitosamente');
    } catch(error) {
      console.error(error);
      alert("No tiene los permisos para borrar este profesor");
    }
  }

  const handleCoordinador = async (profesor) => {
    console.log("Profesor: ", profesor);

    try {
      const userIdInt = parseInt(userId);

      console.log("IdEquipo: ", typeof idEquipo);
      console.log("Profesor: ",  profesor.id);
      console.log("UserId: ",  userIdInt);

      const result = await axios.put('http://18.223.33.212:3000/professors/definirCoordinador', {
        idEquipo: idEquipo,
        idProfe: profesor.id,
        idAsisAdmin: userIdInt
      })
    } catch (error) {
      console.error(error);
      alert('Error asignando coordinador');
    }
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
                required
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
                  <TableCell style={{ color:"#FFFF"}}>Coordinador</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Marcar Coordinador</TableCell>
                  <TableCell style={{ color:"#FFFF"}}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor:"#FFFF"}}>
                {datosEquipo.map((profesor) => (
                  <TableRow key={profesor.Codigo}>
                    <TableCell>{profesor.Codigo}</TableCell>
                    <TableCell>{profesor.Nombre}</TableCell>
                    <TableCell>{profesor.isCordinador ? <CheckCircleIcon style={{ color:"green"}}></CheckCircleIcon> : <ClearIcon style={{ color: "red"}}></ClearIcon>}</TableCell>
                    <TableCell>
                      <PersonAddIcon
                        onClick={() => handleCoordinador(profesor)}
                        style={{ cursor: 'pointer' }}
                      >

                      </PersonAddIcon>
                    </TableCell>
                    <TableCell>
                    <DeleteIcon 
                      onClick={() => handleEliminar(profesor.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    </TableCell>
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
