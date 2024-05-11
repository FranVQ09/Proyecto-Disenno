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
import axios from 'axios';


function ConsultasDetalleEquipo() {
  const [año, setAño] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [buscarEquipo, setBuscarEquipo] = useState(true);
  const [mostrarPlan, setMostrarPlan] = useState(false);
  const [plan, setPlan] = useState([]);
  const [idEquipo, setIdEquipo] = useState('');
  const [idPlanTrabajo, setIdPlanTrabajo] = useState(0);
  const [actividades, setActividades] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const añoInt = parseInt(año);
      const result = await axios.get('http://3.14.65.142:3000/obtenerEquipoAnno', {
          params: {
              anno: añoInt
          }
      })
      setIdEquipo(result.data[0].id);
      setBuscarEquipo(false);
      setMostrarPlan(true);

    } catch (error) {
        console.error('Error fetching data: ', error);
        alert('Error fetching data');
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Verificar si idEquipo es un número válido
            if (!isNaN(parseInt(idEquipo))) {
                const idEquipoInt = parseInt(idEquipo);
                const periodoInt = parseInt(periodo);
                const response = await axios.get('http://3.14.65.142:3000/obtenerPlanTrabajo', {
                    params: {
                        idEquipo: idEquipoInt
                    }
                });

                if (response.data.length > 0) {
                  if (periodoInt === response.data[0].periodo) {
                      setIdPlanTrabajo(response.data[0].id);
                  } else {
                      setIdPlanTrabajo(response.data[1].id);
                  }
                } else {
                    console.error('No se encontró un plan de trabajo para el equipo:', idEquipo);
                    alert('No se encontró un plan de trabajo para el equipo para ese periodo');
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            alert('Error fetching data');
        }
    };
    if (!isNaN(parseInt(idEquipo))) {
        fetchData();
    }
  }, [idEquipo, periodo]);

  useEffect(() => {
    if (idPlanTrabajo !== 0) { 
      const fetchData = async () => {
        try {
          const datos = await axios.get('http://3.14.65.142:3000/activities/spObtenerActivi', {
            params: {
              idPlanTrab: idPlanTrabajo
            }
          })
          setActividades(datos.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
        }
      }
      fetchData();
    }
  }, [idPlanTrabajo]);

  useEffect(() => {
    if (actividades.length > 0) {
      const fetchData = async () => {
        try {
          const detallesPromises = actividades.map(async (actividad) => {
            const detalles = await axios.get('http://3.14.65.142:3000/activities/obtenerDatosActividad', {
              params: {
                idActividad: actividad.id
              }
            });
            return detalles.data;
          });
  
          const detallesActividades = await Promise.all(detallesPromises);
          setPlan(detallesActividades);
          
  
        } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
        }
      }
      fetchData();
    }
  }, [actividades]);

  console.log(plan)


  const handleCancelar = () => {
    setBuscarEquipo(true);
    setMostrarPlan(false);
    setAño('');
    setPeriodo('');
    setIdEquipo('');
    setIdPlanTrabajo(0);
    setActividades([]);
    setPlan([]);
    
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
        <h3 style={{ color: '#38340C', fontSize: '1vw', textAlign: 'center', marginBottom: '1vh' }}>Buscar Equipo por Año y Período:</h3>
        <div style={{ display:"flex", justifyContent:"center"}}>
          <form onSubmit={handleSubmit}>
            <TextField
                type="text"
                label="Año"
                value={año}
                onChange={(event) => setAño(event.target.value)}
                variant="outlined"
                required
                style={{ width: "15vw", marginBottom: "1vh", backgroundColor:"white", borderRadius:"0.5vh" }}
            />
            <TextField
                type="text"
                label="Período"
                value={periodo}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    if (inputValue === '1' || inputValue === '2') {
                        setPeriodo(inputValue);
                    } else{
                        alert('El período debe ser 1 o 2');
                        setPeriodo('');
                    }
                }}
                variant="outlined"
                required
                style={{ width: "15vw", marginBottom: "1vh", backgroundColor:"white", borderRadius:"0.5vh" }}
            />
            <Button type="submit" variant='contained' style={{ backgroundColor:"#38340C", marginTop:"1vh", marginLeft:"12vw"}}>Buscar</Button>
          </form>
        </div>
      </Paper>
      )}
      {mostrarPlan && (
          <Paper elevation={3} style={{ width:"70vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw", marginTop:"1vh", maxWidth:"80vw", overflow:"auto" }}>
            <h1 style={{ color: '#38340C', fontSize: '2vw', textAlign: 'center', marginBottom: '3vh' }}>Detalles del Equipo</h1>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor:"#38340C" }}>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Semana</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Modalidad</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Enlace</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor:"#FFFF"}}>
              {plan.map((arrayExterno, indexExterno) => (
                <React.Fragment key={indexExterno}>
                  {arrayExterno.map((actividad, indexInterno) => (
                    <TableRow key={`${indexExterno}-${indexInterno}`}>
                      <TableCell>{actividad.nombre[0]}</TableCell>
                      <TableCell>{actividad.nombre[1]}</TableCell>
                      <TableCell>{actividad.nombre[2]}</TableCell>
                      <TableCell>{actividad.fechaRealizacion}</TableCell>
                      <TableCell>{actividad.semana}</TableCell>
                      <TableCell>{actividad[""]}</TableCell>
                      <TableCell>{actividad.enlance}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
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
