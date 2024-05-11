import React, {useState, useEffect} from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckCircle, ConstructionOutlined, RadioButtonUnchecked } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { resolveBreakpointValues } from '@mui/system/breakpoints';


function AgregarProfesor() {
    const [año, setAño] = useState('');
    const [buscarEquipo, setBuscarEquipo] = useState(true);
    const [agregarForm, setAgregarForm] = useState(false);
    const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
    const [esCoordinador, setEsCoordinador] = useState(false);
    const [profesoresSede, setProfesoresSede] = useState([]);
    const [idEquipo, setIdEquipo] = useState(0);
    const userSede = sessionStorage.getItem('userSede');
    const userId = sessionStorage.getItem('userId');
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const result = await axios.get('http://3.14.65.142:3000/obtenerEquipoAnno', {
                params: {
                    anno: año
                }
            })
            setIdEquipo(result.data[0].id);

            if ( idEquipo > 0) {
                setBuscarEquipo(false);
                setAgregarForm(true);
            }

            const response = await axios.get('http://3.14.65.142:3000/obtenerProfesCedes', {
                params: {
                    sede: userSede
                }
            })
            setProfesoresSede(response.data);
        } catch (error) {
            console.error(error);
            alert('No se encontro el equipo para el año dado.');
            setAño('');
        } 

    };

    const handleChange = (event) => {
        setProfesorSeleccionado(event.target.value);
    };

    const handleAgregar = async (event) => {
        event.preventDefault();
        const idUsuarioEntero = parseInt(userId); 
        console.log("UserId: ", idUsuarioEntero);
        console.log("IdEquipo: ", idEquipo);
        console.log("IdProfesor: ", profesorSeleccionado.id);
        try {
            const result = await axios.post('http://3.14.65.142:3000/professors/agregarProfeEquipo', {
                idEquipo: idEquipo,
                idProfesor: profesorSeleccionado.id,
                idUsuario: idUsuarioEntero
            })
            alert("Profesor agregado correctamente al equipo.")
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.Message);
            setProfesorSeleccionado('');
        }
        setAgregarForm(false);
        setProfesorSeleccionado('');
        setEsCoordinador(false);
        setBuscarEquipo(true);
    };

    const handleToggleCoordinador = () => {
        setEsCoordinador(!esCoordinador);
    }


    const handleCancelar = () => {
        setAgregarForm(false);
        setProfesorSeleccionado('');
        setEsCoordinador(false);
        setBuscarEquipo(true);
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
            <div style={{ width:"0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Gestionar</a>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Equipo</a>
            </div>
            <Link href="/gestionarEquipo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '25vh', marginLeft: "2vw", borderRadius:'1vw'}}>Detalles de Equipo</Link>
            <Link href="/agregarProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#E2CE1A", marginTop:"1vh", marginLeft:"2.5vw", borderRadius:'1vw'}}>Agregar Profesor</Link>
            <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
        </div>
        <div style={{display:"flex", justifyContent:"center", width:"70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
            {buscarEquipo && (
            <Paper elevation={3} style={{ width:"50vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Buscar Equipo</h1>
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
        {agregarForm && (
            <Paper elevation={3} style={{ width:"50vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Agregar Profesor</h1>
                <div style={{ display:"flex", justifyContent:"center" }}>
                    <form onSubmit={handleAgregar} style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                        <label style={{ marginBottom:"1vh", fontSize:"1vw" }}>Seleccionar Profesor:</label>
                        <Select
                            labelId="profesores-label"
                            label="Profesores"
                            id="profesores"
                            value={profesorSeleccionado}
                            onChange={handleChange}
                            style={{ width:"30vw", backgroundColor:"#FFFF", borderRadius:"0.5vh"}}
                        >
                            <MenuItem value="" disabled>Seleccionar Profesor</MenuItem>
                            {profesoresSede.map((profesor, index) => (
                                <MenuItem key={index} value={profesor}>{profesor.Nombre}</MenuItem>
                            ))}
                        </Select>
                        <IconButton onClick={handleToggleCoordinador} style={{ marginTop: '1vh' }}>
                            {esCoordinador ? <CheckCircle color="primary" /> : <RadioButtonUnchecked color="disabled" />}
                        </IconButton>
                        <Typography variant="body2" style={{ marginTop: '0.5vh' }}>
                            {esCoordinador ? 'Coordinador' : 'No es Coordinador'}
                        </Typography>
                        <Button type="submit" style={{ marginTop: '3vh', backgroundColor:"#38340C", color:"#FFFF" }}>Submit</Button>
                        <Button onClick={handleCancelar} style={{ marginTop: '3vh', backgroundColor:"#38340C", color:"#FFFF" }}>Cancelar</Button>
                    </form>
                </div>
            </Paper>
        )}
        </div>
    </div>
  )
}

export default AgregarProfesor;
