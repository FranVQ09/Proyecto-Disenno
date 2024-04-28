import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CommentIcon from '@mui/icons-material/Comment';

function VisualizarPlan() {
    const [data, setData] = useState([]);
    const [formularioDetalleAbierto, setFormularioDetalleAbierto] = useState(false);
    const [formularioComentariosAbierto, setFormularioComentariosAbierto] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
    const [comentariosActividad, setComentariosActividad] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // Simulando la obtención de datos de comentarios de alguna fuente
            // Para propósitos de demostración, utilizaremos comentarios predefinidos para cada actividad
            const mockComentarios = {
                1: ['Comentario 1', 'Comentario 2'],
                2: ['Comentario 3', 'Comentario 4'],
                3: ['Comentario 5', 'Comentario 6'],
                4: ['Comentario 7', 'Comentario 8'],
            };

            const mockData = [
                { id: 1, nombre: 'Actividad 1', estado: 'Pendiente', tipo:'Orientadora', Fecha:'2021-10-10', Semana:'2', Responsables:'Juan, Ana', Modalidad: 'Presencial', enlace:'www.ejemplo.com', comentarios: mockComentarios[1]},
                { id: 2, nombre: 'Actividad 2', estado: 'Realizada', tipo:'Orientadora', Fecha:'2021-10-10', Semana:'2', Responsables:'Cruz, Vane', Modalidad: 'Presencial', enlace:'www.ejemplo.com', comentarios: mockComentarios[2]},
                { id: 3, nombre: 'Actividad 3', estado: 'Pendiente', tipo:'Orientadora', Fecha:'2021-10-10', Semana:'2', Responsables:'Julian, Pri', Modalidad: 'Presencial', enlace:'www.ejemplo.com', comentarios: mockComentarios[3]},
                { id: 4, nombre: 'Actividad 4', estado: 'Realizada', tipo:'Orientadora', Fecha:'2021-10-10', Semana:'2', Responsables:'Fran, Jose', Modalidad: 'Presencial', enlace:'www.ejemplo.com', comentarios: mockComentarios[4]},
            ];
            setData(mockData);
        }
        fetchData();
    }, []);

    const abrirFormularioDetalle = (actividad) => {
        setActividadSeleccionada(actividad);
        setFormularioDetalleAbierto(true);
        // Cargar los comentarios de la actividad seleccionada
        setComentariosActividad(actividad.comentarios);
    };

    const abrirFormularioComentarios = (actividad) => {
        setActividadSeleccionada(actividad);
        setFormularioComentariosAbierto(true);
        // Cargar los comentarios de la actividad seleccionada
        setComentariosActividad(actividad.comentarios);
    };

    const cerrarFormularioDetalle = () => {
        setFormularioDetalleAbierto(false);
        // Limpiar los comentarios al cerrar el formulario
        setComentariosActividad([]);
    };

    const cerrarFormularioComentarios = () => {
        setFormularioComentariosAbierto(false);
        // Limpiar los comentarios al cerrar el formulario
        setComentariosActividad([]);
    };

    const agregarComentario = () => {
        // Agregar el nuevo comentario a la lista de comentarios de la actividad
        setComentariosActividad([...comentariosActividad, nuevoComentario]);
        // Limpiar el campo de texto después de agregar el comentario
        setNuevoComentario('');
    };

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
                <Link href="/crearPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '20vh', marginLeft: "4vw", borderRadius:'1vw'}}>Crear Plan</Link>
                <Link href="/actualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Actualizar Plan</Link>
                <Link href="/visualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Visualizar Plan</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                    <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
                    <form>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Nombre de Actividad</TableCell>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Estado</TableCell>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Comentarios</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((actividad) => (
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
                    </form>
                </Paper>
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
                        <Typography variant="h6">Nombre: {actividadSeleccionada.nombre}</Typography>
                        <Typography variant="h6">Estado: {actividadSeleccionada.estado}</Typography>
                        <Typography variant="h6">Tipo: {actividadSeleccionada.tipo}</Typography>
                        <Typography variant="h6">Fecha: {actividadSeleccionada.Fecha}</Typography>
                        <Typography variant="h6">Semana: {actividadSeleccionada.Semana}</Typography>
                        <Typography variant="h6">Responsables: {actividadSeleccionada.Responsables}</Typography>
                        <Typography variant="h6">Modalidad: {actividadSeleccionada.Modalidad}</Typography>
                        <Typography variant="h6">Enlace: {actividadSeleccionada.enlace}</Typography>
                        {/* Agrega más campos según tus necesidades */}
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
                        }}
                    >
                        <Typography variant="h4" style={{ marginBottom: '1rem' }}>Comentarios de la Actividad: {actividadSeleccionada.nombre}</Typography>
                        {/* Mostrar comentarios existentes */}
                        {comentariosActividad.map((comentario, index) => (
                            <Typography key={index} variant="body1">{comentario}</Typography>
                        ))}
                        {/* Formulario para agregar comentario */}
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

export default VisualizarPlan;
