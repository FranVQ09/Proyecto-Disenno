import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';


function PlanActividadesProfesor() {
  const [actividades, setActividades] = useState([])
  const [verPlan, setVerPlan] = useState(false);
  const [formularioDetalleAbierto, setFormularioDetalleAbierto] = useState(false);
  const [formularioComentariosAbierto, setFormularioComentariosAbierto] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [comentariosActividad, setComentariosActividad] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const añoActual = new Date().getFullYear();
  const [idEquipo, setIdEquipo] = useState(0);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [idPlanTrabajo, setIdPlanTrabajo] = useState(0);
  const userId = sessionStorage.getItem('userId');
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
  const [respuestaComentario, setRespuestaComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const [responsablesActividad, setResponsablesActividad] = useState([]);



  const abrirFormularioDetalle = async (actividad) => {

      try {
          const detalles = await axios.get('http://3.14.65.142:3000/activities/obtenerDatosActividad', {
              params: {
                  idActividad: actividad.id
              }
          })
          setActividadSeleccionada(detalles.data);

          const responsables = await axios.get('http://3.14.65.142:3000/activities/obtenerProfesEncargado', {
              params: {
                  idActividad: actividad.id
              }
          })
          if (responsables.data.Result === -1) {
              console.log(responsables.data)
              setResponsablesActividad([]);
          } else {
              setResponsablesActividad(responsables.data);
              setFormularioDetalleAbierto(true);
          }
      } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
      }

      setFormularioDetalleAbierto(true);
  };

  const abrirFormularioComentarios = async (actividad) => {
      try {
          const comentarios = await axios.get('http://3.14.65.142:3000/comments/obtenerComentarios', {
              params: {
                  idActividad: actividad.id
              }
          })
          setComentariosActividad(comentarios.data);
          setActividadSeleccionada(actividad);
          setFormularioComentariosAbierto(true);
      } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
      }
  };

  const cerrarFormularioDetalle = () => {
      setFormularioDetalleAbierto(false);
      setResponsablesActividad([]);
  };

  const cerrarFormularioComentarios = () => {
      setFormularioComentariosAbierto(false);

      setComentariosActividad([]);
  };

  const obtenerFechaActual = () => {
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const año = fecha.getFullYear();
    
      return `${dia}/${mes}/${año}`;
  };

  const fechaActual = obtenerFechaActual()
  const agregarComentario = async () => {
      console.log("Actividad ID: ", actividadSeleccionada.id)
      try {
          const insertarComent = await axios.post('http://3.14.65.142:3000/comments/insertarComentario', {
              idActividad: actividadSeleccionada.id,
              comentario: nuevoComentario,
              fecha: fechaActual,
              idProfesor: userId
          })

          const comentariosActualizados = await axios.get('http://3.14.65.142:3000/comments/obtenerComentarios', {
              params: {
                  idActividad: actividadSeleccionada.id
              }
          });
          setComentariosActividad(comentariosActualizados.data);
      } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
      }  
      setNuevoComentario('');
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await axios.get('http://3.14.65.142:3000/obtenerEquipoAnno', {
                  params: {
                      anno: añoActual
                  }
              })
              setIdEquipo(result.data[0].id);
          } catch (error) {
              console.error('Error fetching data: ', error);
              alert('Error fetching data');
          }
      }
      fetchData();
  }, [añoActual]);

  const handlePeriodoChange = (event) => {
      setSelectedPeriodo(event.target.value);
  }

  const handlePeriodo = async (event) => {
      event.preventDefault();
      try {
          const idEquipoInt = parseInt(idEquipo);
          const periodoInt = parseInt(selectedPeriodo);
          const response = await axios.get('http://3.14.65.142:3000/obtenerPlanTrabajo', {
              params: {
                  idEquipo: idEquipoInt
              }
          });

          if (response.data.length > 0) {
              if (periodoInt === response.data[0].periodo) {
                  setIdPlanTrabajo(response.data[0].id);
                  setVerPlan(true);
              } else {
                  setIdPlanTrabajo(response.data[1].id);
                  setVerPlan(true);
              }
              event.preventDefault();
          } else {
              console.error('No se encontró un plan de trabajo para el equipo:', idEquipo);
              alert('No se encontró un plan de trabajo para el equipo para ese periodo');
          }

      }catch (error) {
          console.error('Error al obtener el plan de trabajo:', error);
          alert('No se encontró un plan de trabajo para el equipo en ese periodo');
          setSelectedPeriodo('');
      }
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              if (idPlanTrabajo !== 0) {
                  setLoading(true);
              const datos = await axios.get('http://3.14.65.142:3000/activities/spObtenerActivi', {
                  params: {
                      idPlanTrab: idPlanTrabajo
                  }
              })
              setActividades(datos.data);
              setLoading(false);
              }
          } catch (error) {
              console.error('Error fetching data: ', error);
              alert('Error fetching data');   
          }
      }
      fetchData();
  }, [idPlanTrabajo]);

  const handleResponder = async (comentario) => {
      setComentarioSeleccionado(comentario);
  }

  const handleEnviarRespuesta = async () => {

      try {
          const respuesta = await axios.post('http://3.14.65.142:3000/comments/insertarReplica', {
              idActividad: actividadSeleccionada.id, 
              comentario: respuestaComentario, 
              fecha: fechaActual,
              idProfesor: userId,
              idComentario: comentarioSeleccionado.id,
          })

      } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Error fetching data');
      }

      setRespuestaComentario('');
      setComentarioSeleccionado(null);
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
            <div style={{ width:"0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Plan</a>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Actividades</a>
            </div>
            <Link href="/planActividadesProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '30vh', marginLeft: "2.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Plan Actividades</Link>
            <Link href="/profesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"40vh", marginLeft:"6vw" }}>Salir</Link>
        </div>
        <div style={{ width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ width:"30vw", marginLeft:"16.5vw", padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                    <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
                    <form onSubmit={handlePeriodo}>
                        <TextField 
                            name="periodo" 
                            variant="outlined" 
                            fullWidth 
                            placeholder="Selecione periodo 1 o 2" 
                            value={selectedPeriodo}
                            onChange={handlePeriodoChange} 
                        />
                        <Button 
                            type="submit" 
                            style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginTop:"2vh" }}
                        >
                            Seleccionar
                        </Button>
                    </form>
                </Paper>
            {verPlan && (
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw", marginTop:"3vh"}}>
                <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
                <form>
                    {loading ? (
                        <Typography variant="h3" style={{ marginLeft:"25vw"}}>Cargando...</Typography>
                    ): (
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Nombre de Actividad</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Estado</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Comentarios</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {actividades.map((actividad) => (
                                <TableRow key={actividad.id} style={{ backgroundColor: "white" }}>
                                    <TableCell>
                                        {actividad.nombre}
                                        <TouchAppIcon 
                                            style={{ marginLeft: '0.5rem', verticalAlign: 'middle', cursor: 'pointer' }}
                                            onClick={() => abrirFormularioDetalle(actividad)}
                                        />
                                    </TableCell>
                                    <TableCell>{actividad.estado}</TableCell>
                                    <TableCell>
                                        <CommentIcon 
                                            style={{ marginRight: '0.5rem', verticalAlign: 'middle', cursor: 'pointer' }}
                                            onClick={() => abrirFormularioComentarios(actividad)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )} 
                </form>
            </Paper>
            )}
            {formularioDetalleAbierto && actividadSeleccionada && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50vh',
                        left: '40vw',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '2vw',
                        borderRadius: '2vw',
                        boxShadow: '0px 0px 2vw rgba(0, 0, 0, 0.3)',
                        zIndex: '1000',
                        maxWidth: '90vw', // Limita el ancho del formulario para que no sea demasiado ancho
                    }}
                >
                    <Typography variant="h4" style={{ marginBottom: '1rem' }}>Detalles de la Actividad</Typography>
                    <Typography variant="h6">Nombre: {actividadSeleccionada[0].nombre[0]}</Typography>
                    <Typography variant="h6">Tipo: {actividadSeleccionada[0].nombre[1]}</Typography>
                    <Typography variant="h6">Estado: {actividadSeleccionada[0].nombre[2]}</Typography>
                    <Typography variant="h6">Fecha: {actividadSeleccionada[0].fechaRealizacion}</Typography>
                    <Typography variant="h6">Semana: {actividadSeleccionada[0].semana}</Typography>
                    <Typography variant="h6">Modalidad: {actividadSeleccionada[0]['']}</Typography>
                    <Typography variant="h6">Enlace: {actividadSeleccionada[0].enlance}</Typography>
                    <Typography variant="h6">
                        Responsables: {responsablesActividad.body && responsablesActividad.body.length > 0 ? responsablesActividad.body : "No hay responsables"}
                    </Typography>
                
                    <Button variant="contained" onClick={cerrarFormularioDetalle} style={{ marginTop: '1rem', backgroundColor:"#E2CE1A", color:"#38340C", border: "0.15vw solid #38340C" }}>Cerrar</Button>
                </div>
            )}
            {formularioComentariosAbierto && actividadSeleccionada && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50vh',
                        left: '70vw',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '2vw',
                        borderRadius: '2vw',
                        boxShadow: '0px 0px 2vw rgba(0, 0, 0, 0.3)',
                        zIndex: '1000',
                        maxWidth: '90vw', // Limita el ancho del formulario para que no sea demasiado ancho
                        maxHeight: '90vh',
                        overflow: 'auto',
                    }}
                >
                    <Typography variant="h4" style={{ marginBottom: '1rem' }}>Comentarios de la Actividad: {actividadSeleccionada.nombre}</Typography>
                   
                    {comentariosActividad.map((comentario, index) => (
                        <div key={index} style={{marginBottom: '1vh', backgroundColor:"#cff0fc", borderRadius:"1vw" }}>
                            {comentario && (
                                <Typography variant='subtitle1' style={{ marginLeft:"1vw", fontWeight:"bold" }}>Autor: {comentario.Nombre}</Typography>
                            )}
                            <div>
                                {comentario && (
                                    <Typography variant='subtitle1' style={{ marginLeft:"1vw", fontWeight:"bold" }}>Comentario: </Typography>
                                )}
                                {comentario && (
                                    <Typography variant="body1" style={{ marginLeft:"1vw" }}>{comentario.Comentario}</Typography>
                                )}
                            </div>
                            <div>
                                <Typography variant='subtitle1' style={{ marginLeft:"1vw", fontWeight:"bold" }}>Respuestas: </Typography>
                            </div>
                            <Button onClick={() => handleResponder(comentario)} variant='contained' style={{ marginTop:"1vh", marginBottom:"1vh",marginLeft:"1vw", padding:"1vh", height:"3vh", weight:"2vw", backgroundColor:"#38340C"}}>Responder</Button>
                            {comentarioSeleccionado && comentarioSeleccionado.id === comentario.id && (
                                <div>
                                    <textarea
                                        value={respuestaComentario}
                                        onChange={(e) => setRespuestaComentario(e.target.value)}
                                        placeholder="Escribe tu respuesta aquí..."
                                        style={{ marginLeft: '1vw'}}
                                    />
                                    <button onClick={handleEnviarRespuesta} style={{ marginLeft:"1vw", marginBottom:"1vh"}}>Enviar</button>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <TextField
                        variant="outlined"
                        label="Agregar Comentario"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                    />
                    <Button variant="contained"  onClick={agregarComentario} style={{ marginTop: '1rem', backgroundColor:"#38340C", color:"white", border: "0.15vw solid #38340C"}}>Agregar Comentario</Button>
                    <Button variant="contained"  onClick={cerrarFormularioComentarios} style={{ marginTop: '1rem', marginLeft: '1rem', backgroundColor:"#E2CE1A", color:"#38340C", border: "0.15vw solid #38340C" }}>Cerrar</Button>
                </div>
            )}
        </div>
    </div>
);
}

export default PlanActividadesProfesor;
