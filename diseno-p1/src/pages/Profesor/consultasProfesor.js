import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ConsultasProfesor() {
    const [data, setData] = useState([]);

    useEffect(() => {
        //Aqui se hace la logica para obtener los datos del equipo de la base de datos
        const fetchData = async () => {
            const mockData = [
                {id: 1, nombre: 'Juan Pérez', correo: 'juan@gmail.com', sede: 'Cartago', codigo: 'CA-001', anno: '2024', estado: 'Activo'},
                {id: 2, nombre: 'Ana Sánchez', correo: 'ana@gmail.com', sede: 'San José', codigo: 'SJ-002', anno: '2024', estado: 'Activo'},
            ];
            setData(mockData);
        }
        fetchData();
    }, []);

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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Nombre</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Correo</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Sede</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Código</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Año</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:"white"}}>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => (
                                <TableRow key={row.id} style={{ backgroundColor:"white" }}>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.correo}</TableCell>
                                    <TableCell>{row.sede}</TableCell>
                                    <TableCell>{row.codigo}</TableCell>
                                    <TableCell>{row.anno}</TableCell>
                                    <TableCell>{row.estado}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default ConsultasProfesor
