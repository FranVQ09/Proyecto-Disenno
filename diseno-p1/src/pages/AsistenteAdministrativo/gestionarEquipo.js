import React, {useEffect, useState} from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Table, TableCell, TextField } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../../UserContext';


function GestionarEquipo() {
    const [ equipos, setEquipos ] = useState([])
    const [ crearEquipoForm, setCrearEquipoForm ] = useState(false)
    const [ año, setAño ] = useState('')
    const [ profesores, setProfesores ] = useState([])
    const [ selectedProfesor, setSelectedProfesor ] = useState('')
    const { userId } = useUser();

    console.log("UserId: ", userId);
    useEffect(() => {
        const equiposData = [
            {
            año: 2023,
            integrantes: ['Jose', 'Fran', 'Julián', 'Cruz']},
            {
            año: 2024,
            integrantes: ['Ana', 'Juan', 'Luis', 'María']},
        ];
        setEquipos(equiposData);
    }, [])

    useEffect(() => {
        const profesoresData = ['Jose', 'Fran', 'Julián', 'Cruz', 'Ana', 'Juan', 'Luis', 'María'];
        setProfesores(profesoresData);
    }, [])

    const handleCrearEquipoForm = () => {
        setCrearEquipoForm(true);
    };

    const handleCancelar = () => {
        setCrearEquipoForm(false);
        setSelectedProfesor('');
        setAño('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Año:', año);
        console.log('Profesor:', selectedProfesor);

        alert('Equipo creado y se agrego al profesor seleccionado exitosamente!');

        setAño('');
        setSelectedProfesor('');
        setCrearEquipoForm(false);
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
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Gestionar</a>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Equipo</a>
            </div>
            <Link href="/consultasProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '25vh', marginLeft: "2vw", borderRadius:'1vw'}}>Detalles de Equipo</Link>
            <Link href="/agregarProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"1vh", marginLeft:"2.5vw", borderRadius:'1vw'}}>Agregar Profesor</Link>
            <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
        </div>
        <div style={{display:"flex", justifyContent:"center", width:"30vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
            <Paper elevation={3} style={{ width:"30vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Historial de Equipos</h1>
                <div style={{ display:"flex", justifyContent:"center" }}>
                    <Table style={{ backgroundColor: "white", width:"20vw",}}>
                        <TableHead style={{ backgroundColor:"#38340C"}}>
                            <TableRow>
                                <TableCell style={{ color: "#FFFF" }}>Equipo Guía</TableCell>
                                <TableCell style={{ color: "#FFFF" }}>Integrantes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {equipos.map((equipo, index) =>(
                                <TableRow key={index}>
                                    <TableCell>{equipo.año}</TableCell>
                                    <TableCell>{equipo.integrantes.join(', ')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div style={{ display:"flex", justifyContent:"center", marginTop:"1vh" }}>
                    <Button variant="contained" onClick={handleCrearEquipoForm} style={{ backgroundColor:"#38340C" }}>Crear Equipo</Button>
                </div>
            </Paper>
        </div>
        {crearEquipoForm && (
                <div style={{display:"flex", justifyContent:"center", width:"30vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                    <Paper elevation={3} style={{ width:"30vw", padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw", marginTop:"1vh" }}>
                        <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Crear Equipo</h1>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                <TextField
                                    type="text"
                                    label="Año"
                                    value={año}
                                    onChange={(event) => setAño(event.target.value)}
                                    variant="outlined"
                                    style={{ width: "15vw", marginBottom: "1vh", backgroundColor:"white", borderRadius:"0.5vh" }}
                                />
                                <Select
                                    label="Profesores"
                                    value={selectedProfesor}
                                    onChange={(event) => setSelectedProfesor(event.target.value)}
                                    variant="outlined"
                                    style={{ width: "15vw", marginBottom: "1vh", backgroundColor:"white", borderRadius:"0.5vh"}}
                                    >
                                    {profesores.map((profesor, index) => (
                                        <MenuItem key={index} value={profesor}>{profesor}</MenuItem>
                                    ))}
                                </Select>
                                <div style={{ display:"flex", justifyContent:"center"}}>
                                    <Button type="submit" variant="contained" style={{ backgroundColor:"#38340C" }}>Crear</Button>
                                    <Button variant="contained" onClick={handleCancelar} style={{ backgroundColor:"#38340C", marginLeft:"1vw" }}>Cancelar</Button>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            )}
    </div>
  )
}

export default GestionarEquipo
