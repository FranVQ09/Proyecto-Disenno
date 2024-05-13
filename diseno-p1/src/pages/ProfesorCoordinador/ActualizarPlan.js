import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function ActualizarPlan() {
    const [showForm, setShowForm] = useState(false); 
    const [formValues, setFormValues] = useState({
        nombre: '',
        tipo: '',
        fecha: '',
        semana: '',
        modalidad: '',
        enlace: '', 
        cantRecor: 0,
    });
    const [afiche, setAfiche] = useState(null);
    const [idPlanTrabajo, setIdPlanTrabajo] = useState('');
    const añoActual = new Date().getFullYear();
    const [idEquipo, setIdEquipo] = useState('');
    const [actualizarForm, setActualizarForm] = useState(false);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');

    const [actividades, setActividades] = useState([]);
    const [profesEquipo, setProfesEquipo] = useState([]);
    const [showFormAgregarResponsable, setShowFormAgregarResponsable] = useState(false);
    const [selectedProfesores, setSelectedProfesores] = useState([]);

    const handleMostarFormAgregarResponsable = (actividadId) => {
        setShowFormAgregarResponsable(actividadId);
    }

    const handleCancelarFormAgregarResponsable = () => {
        setShowFormAgregarResponsable(false);
    };

    const handleAgregarResponsable = async (e, actividadId) => {
        e.preventDefault();
        try {
            const responsables = selectedProfesores.map(profesor => profesor.id);
            const insertarResponsable = await axios.post('http://3.14.65.142:3000/activities/registrarEncargados', {
                IdActiv: actividadId,
                lista: responsables
            })
            alert('Responsable agregado exitosamente');
            setSelectedProfesores([]);
            setShowFormAgregarResponsable(false);
        } catch (error) {
            console.error('Error al agregar responsable:', error);
            alert('Error al agregar responsable');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://3.14.65.142:3000/obtenerEquipoAnno', {
                    params: {
                        anno: añoActual
                    }
                });
                setIdEquipo(result.data[0].id);
            } catch (error) {
                console.error('Error al obtener el equipo:', error);
            }
        }
        fetchData();
    }, []);
    
    const handleChange = (event, id) => {
        const { name, value } = event.target;
    
        if (id) {
            setActividades(prevActividades => {
                return prevActividades.map(actividad => {
                    if (actividad.id === id) {
                        return { ...actividad, estado: value };
                    }
                    return actividad;
                });
            });
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };    

    const handleSelectChange = (event) => {
        const selectedValues = event.target.value;
        setSelectedProfesores(selectedValues);
    };

    const handleConfirmarCambios = async (event) => {
        event.preventDefault();
        try {
            const actividadesModificadas = actividades.filter(actividad => actividad.estado !== actividad.estadoOriginal);

            for (const actividad of actividadesModificadas) {
                await axios.put('http://3.14.65.142:3000/activities/cambiarEstado', {
                    IdActiv: actividad.id,
                    estado: actividad.estado
                });
            }

            setActividades(prevActividades =>
                prevActividades.map(actividad => ({
                    ...actividad,
                    estadoOriginal: actividad.estado
                }))
            );

            console.log("Cambios confirmados exitosamente.");
            alert("Cambios confirmados exitosamente.");
        } catch (error) {
            console.error('Error al confirmar los cambios:', error);
            alert('Error al confirmar los cambios');
        }
    };


    const handleCancelar = () => {
        setShowForm(false);
    };

    const handleAgregarActividad = () => {
        setShowForm(true); 
    };

    const handleAficheChange = (event) => {
        const file = event.target.files[0];
        setAfiche(file);
    };

    const handleSubmitActividad = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            const fechaDate = new Date(formValues.fecha); // Convertir la cadena de fecha a un objeto Date
            formData.append('nombre', formValues.nombre);
            formData.append('tipo', formValues.tipo);
            formData.append('fechaReal', fechaDate); // Usar el objeto Date aquí
            formData.append('semana', formValues.semana);
            formData.append('afiche', afiche);
            formData.append('modalidad', formValues.modalidad);
            formData.append('enlace', formValues.enlace);
            formData.append('idPlTr', idPlanTrabajo);
            formData.append('cantRecord', formValues.cantRecor);
    
            const response = await axios.post('http://3.14.65.142:3000/activities/registrarAct', formData);
    
            // Obtener la nueva actividad del objeto de respuesta
            const nuevaActividad = response.data;
    
            // Actualizar el estado de actividades agregando la nueva actividad
            setActividades(prevActividades => [...prevActividades, nuevaActividad]);
    
            alert('Actividad insertada exitosamente');
            setFormValues({
                nombre: '',
                tipo: '',
                fecha: '',
                semana: '',
                modalidad: '',
                enlace: '',
                cantRecor: 0,
            });
            setAfiche(null);
            setShowForm(false);
    
        } catch (error) {
            console.log(error);
            alert("Error al insertar actividad");
        }
    }

    const handleCerrar = () => {
        setActualizarForm(false);
        setSelectedPeriodo('');
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
                } else {
                    setIdPlanTrabajo(response.data[1].id);
                }
                event.preventDefault();
                setActualizarForm(true);
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
    const handlePeriodoChange = (event) => {
        setSelectedPeriodo(event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (idPlanTrabajo !== "") {
                try {
                    const respuesta = await axios.get('http://3.14.65.142:3000/activities/spObtenerActivi', {
                        params: {
                            idPlanTrab: idPlanTrabajo
                        }
                    });

                    setActividades(respuesta.data.map(actividad => ({
                        ...actividad,
                        estadoOriginal: actividad.estado,
                        responsables: []
                    })));
                } catch (error) {
                    console.error('Error al obtener las actividades:', error);
                }
            }
        };
    
        fetchData();
    }, [idPlanTrabajo]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const encargados = await axios.get('http://3.14.65.142:3000/obtenerDatosEquipo', {
                    params: {
                        idEquipo: idEquipo
                    }
                });
                setProfesEquipo(encargados.data);
            } catch (error) {
                console.error('Error al obtener los profes del Equipo:', error);
                alert('Error al obtener los profes del Equipo');
            }
        }
        fetchData();
    }, [idEquipo]);

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
                            required
                        />
                        <Button 
                            type="submit" 
                            style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginTop:"2vh" }}
                        >
                            Seleccionar
                        </Button>
                    </form>
                </Paper>
                {actualizarForm && (
                    <><Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw", marginTop:"3vh" }}>
                        <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Plan de Actividades</Typography>
                        <form>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold" }}>Nombre de Actividad</TableCell>
                                        <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold" }}>Estado</TableCell>
                                        <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold" }}>Responsables</TableCell>
                                        <TableCell style={{ backgroundColor: '#38340C', color: "white", fontSize: '0.8vw', fontWeight: "bold" }}>Eliminar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {actividades.map((actividad) => (
                                    <TableRow key={actividad.id} style={{ backgroundColor: "white" }}>
                                        <TableCell>
                                            {actividad.nombre}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={actividad.estado}
                                                onChange={(e) => handleChange(e, actividad.id)}
                                            >
                                                <MenuItem value="PLANEADA">Planeada</MenuItem>
                                                <MenuItem value="NOTIFICADA">Notificada</MenuItem>
                                                <MenuItem value="REALIZADA">Realizada</MenuItem>
                                                <MenuItem value="CANCELADA">Cancelada</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <PersonAddAltIcon
                                                onClick={() => handleMostarFormAgregarResponsable(actividad.id)}
                                                style={{ marginRight: '0.5vw', verticalAlign: 'middle', cursor: 'pointer' }}
                                            />
                                            {actividad.id === showFormAgregarResponsable && (
                                                <div>
                                                    <Select
                                                        multiple
                                                        value={selectedProfesores} // Asegúrate de que selectedProfesores sea un array
                                                        onChange={handleSelectChange}
                                                        style={{ width: "20vw" }}
                                                        required
                                                    >
                                                        {profesEquipo.map((profesor) => (
                                                            <MenuItem key={profesor.id} value={profesor}>
                                                                {profesor.Nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <div style={{ marginTop:"1vh" }}>
                                                        <Button onClick={(e) => handleAgregarResponsable(e, actividad.id)} style={{ backgroundColor: '#EEE1B0', color:"#38340C" }}>Agregar</Button>
                                                        <Button style={{ backgroundColor: '#38340C', color:"#EEE1B0", marginLeft:"1vw" }} onClick={handleCancelarFormAgregarResponsable}>Cancelar</Button>
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon
                                                style={{ marginRight: '0.5vw', verticalAlign: 'middle', cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </form>
                        {showForm && (
                            <form onSubmit={handleSubmitActividad} style={{ marginTop: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Nombre:</Typography>
                                        <TextField name="nombre" variant="outlined" fullWidth placeholder="Taller Inteligencia Artificial" value={formValues.nombre} onChange={handleChange} />
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                    <div style={{ marginRight: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Tipo:</Typography>
                                        <Select
                                            name="tipo"
                                            variant="outlined"
                                            style={{ width: '10rem' }}
                                            value={formValues.tipo}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <MenuItem value="Orientadoras">Orientadoras</MenuItem>
                                            <MenuItem value="Motivacionales">Motivacionales</MenuItem>
                                            <MenuItem value="De apoyo a la vida estudiantil">De apoyo a la vida estudiantil</MenuItem>
                                            <MenuItem value="De orden técnico">De orden técnico</MenuItem>
                                            <MenuItem value="De recreación">De recreación</MenuItem>
                                        </Select>
                                    </div>
                                        <div style={{ marginRight: '1rem' }}>
                                            <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Fecha:</Typography>
                                            <TextField name="fecha" variant="outlined" style={{ width: '10rem' }} placeholder="mm/dd/aaaa" value={formValues.fecha} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Semana:</Typography>
                                            <TextField name="semana" variant="outlined" style={{ width: '5rem' }} placeholder="4" value={formValues.semana} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Afiche:</Typography>
                                        <input
                                            type="file"
                                            name="afiche"
                                            accept=".pdf, .jpg, .jpeg, .png"
                                            onChange={handleAficheChange} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Modalidad:</Typography>
                                        <Select
                                            name="modalidad"
                                            variant="outlined"
                                            fullWidth
                                            value={formValues.modalidad}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <MenuItem value="presencial">Presencial</MenuItem>
                                            <MenuItem value="virtual">Virtual</MenuItem>
                                        </Select>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Enlace:</Typography>
                                        <TextField name="enlace" variant="outlined" fullWidth placeholder="Escriba el URL de la actividad" value={formValues.enlace} onChange={handleChange} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <Typography variant="h5" style={{ color: '#38340C', fontWeight: "bold", textAlign: 'left' }}>Cantidad de Recordatorios:</Typography>
                                        <TextField name="cantRecor" type="number" variant="outlined" fullWidth placeholder="Cantidad de Recordatorios:" value={formValues.cantRecor} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Button type='submit' style={{ width: "15vw", backgroundColor: "#38340C", color: "#FFFF", marginLeft: "20vw" }}>Insertar Actividad</Button>
                                        <button type="button" onClick={handleCancelar} style={{ padding: '1vh 2vw', backgroundColor: '#EEE1B0', color: '#38340C', border: '3px solid #38340C', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginLeft: '0.3vw' }}>Cancelar</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Paper>
                    <div style={{ textAlign: 'center', marginTop: '2vh' }}>
                        <button onClick={handleConfirmarCambios} style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginLeft: '-5vw', marginBottom: "3vh" }}>
                            Confirmar Cambios
                        </button>
                        <button type="button" onClick={handleAgregarActividad} style={{ padding: '1vh 2vw', backgroundColor: '#EEE1B0', color: '#38340C', border: '3px solid #38340C', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', fontWeight: 'bold', marginLeft: '0.3vw' }}>
                            Agregar Actividad
                        </button>
                        <Button onClick={handleCerrar} style={{ padding: '1vh 2vw', backgroundColor: '#EEE1B0', color: '#38340C', border: '3px solid #38340C', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.7vw', fontWeight: 'bold', marginLeft: '0.3vw', height:"4.5vh" }}>Cerrar</Button>
                    </div></>
                )} 
            </div>

        </div>
    );
}

export default ActualizarPlan;

