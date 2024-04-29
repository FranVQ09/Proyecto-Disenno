import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

function ActualizarPlan() {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false); 
    const [formValues, setFormValues] = useState({
        nombre: '',
        tipo: '',
        fecha: '',
        semana: '',
        responsables: '',
        modalidad: '',
        enlace: ''
    });

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
                { id: 4, nombre: 'Actividad 4', estado: 'En progreso', tipo:'Orientadora', Fecha:'2021-10-10', Semana:'2', Responsables:'Fran, Jose', Modalidad: 'Presencial', enlace:'www.ejemplo.com', comentarios: mockComentarios[4]},
            ];
            setData(mockData);
        }
        fetchData();
    }, []);

    const handleChange = (event, id) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        const newData = data.map((actividad) => {
            if (actividad.id === id) {
                return { ...actividad, estado: event.target.value };
            }
            return actividad;
        });
        setData(newData);
    };

    const handleConfirmarCambios = () => {
        // Lógica para confirmar cambios
        console.log("Cambios confirmados");
    };

    const handleCancelar = () => {
        // Lógica para cancelar cambios
        setShowForm(false);
        console.log("Cambios cancelados");
    };

    const handleAgregarActividad = () => {
        setShowForm(true); // Mostrar el formulario al hacer clic en "Agregar Actividad"
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
                <Link href="/actualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Actualizar Plan</Link>
                <Link href="/visualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Visualizar Plan</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                    <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
                    <form>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold"}}>Nombre de Actividad</TableCell>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold"}}>Estado</TableCell>
                                    <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold"}}>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((actividad) => (
                                    <TableRow key={actividad.id} style={{ backgroundColor: "white" }}>
                                        <TableCell>
                                            {actividad.nombre}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={actividad.estado}
                                                onChange={(e) => handleChange(e, actividad.id)}
                                            >
                                                <MenuItem value="Pendiente">Sin realizar</MenuItem>
                                                <MenuItem value="Realizada">Realizada</MenuItem>
                                                <MenuItem value="En progreso">En progreso</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon 
                                                style={{ marginRight: '0.5rem', verticalAlign: 'middle', cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </form>
                    {showForm && (
                        <form style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Nombre:</Typography>
                                    <TextField name="nombre" variant="outlined" fullWidth placeholder="Taller Inteligencia Artificial" value={formValues.nombre} onChange={handleChange} />
                                </div>
                                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                    <div style={{ marginRight: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Tipo:</Typography>
                                        <TextField name="tipo" variant="outlined" style={{ width: '10rem' }} placeholder="Orientadora" value={formValues.tipo} onChange={handleChange} />
                                    </div>
                                    <div style={{ marginRight: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Fecha:</Typography>
                                        <TextField name="fecha" variant="outlined" style={{ width: '10rem' }} placeholder="hh/dd/mm/aaaa" value={formValues.fecha} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Semana:</Typography>
                                        <TextField name="semana" variant="outlined" style={{ width: '5rem' }} placeholder="4" value={formValues.semana} onChange={handleChange} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Responsables:</Typography>
                                    <TextField name="responsables" variant="outlined" fullWidth placeholder="Responsable 1, Responsable 2, Responsable 3" value={formValues.responsables} onChange={handleChange} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Modalidad:</Typography>
                                    <TextField name="modalidad" variant="outlined" fullWidth placeholder="Presencial" value={formValues.modalidad} onChange={handleChange} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Enlace:</Typography>
                                    <TextField name="enlace" variant="outlined" fullWidth placeholder="Escriba el URL de la actividad" value={formValues.enlace} onChange={handleChange} />
                                </div>
                            </div>
                        </form>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '2vh' }}>
                        <button type="submit" onClick={handleConfirmarCambios} style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginRight: '0.3vw' }}>
                            Confirmar Cambios
                        </button>
                        <button type="button" onClick={handleAgregarActividad} style={{ padding: '1vh 2vw', backgroundColor: '#EEE1B0', color: '#38340C', border: '3px solid #38340C', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginLeft: '0.3vw' }}>
                            Agregar Actividad
                        </button>
                        <button type="button" onClick={handleCancelar} style={{ padding: '1vh 2vw', backgroundColor: '#EEE1B0', color: '#38340C', border: '3px solid #38340C', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginLeft: '0.3vw' }}>
                            Cancelar
                        </button>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ActualizarPlan;
