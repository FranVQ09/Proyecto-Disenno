import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function ConsultasProfesor() {
    const añoActual = new Date().getFullYear();
    const [idEquipo, setIdEquipo] = useState(0);
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        const fetchData = async () => {
            if (!idEquipo) return;

            try {
                const response = await axios.get('http://3.14.65.142:3000/obtenerDatosEquipo', {
                    params: {
                        idEquipo: idEquipo
                    }
                });
                setProfesores(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                alert('Error fetching data');
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
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Consultas</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Profesor</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Guía</a>
                </div>
                <Link href="/consultasProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '20vh', marginLeft: "2vw", borderRadius:'1vw'}}>Consultar Equipo</Link>
                <Link href="/consultarEstudiantesProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "0.5vw", whiteSpace:"nowrap"}}>Consultar Estudiantes</Link>
                <Link href="/profesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width:"70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                    <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Detalles del Equipo</h1>
                    {loading ? (
                        <div style={{ textAlign: 'center', fontSize: '1.5vw', marginBottom: '2vh' }}>Cargando...</div>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Código</TableCell>
                                    <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Nombre</TableCell>
                                    <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Coordinador</TableCell>
                                    <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Año</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profesores.map(profesor => (
                                    <TableRow key={profesor.id} style={{ backgroundColor:"white" }}>
                                        <TableCell>{profesor.Codigo}</TableCell>
                                        <TableCell>{profesor.Nombre}</TableCell>
                                        <TableCell>{profesor.isCordinador ? <CheckCircleIcon style={{ color:"green"}}></CheckCircleIcon> : <ClearIcon style={{ color: "red"}}></ClearIcon>}</TableCell>
                                        <TableCell>{añoActual}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
            </div>
        </div>
    )
}

export default ConsultasProfesor
