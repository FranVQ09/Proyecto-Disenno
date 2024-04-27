import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


function ConsultarEstudiantesProfesor() {
    const [data, setData] = useState([]);
    const [ordenNombre, setOrdenNombre] = useState('asc'); 
    const [ordenCarnet, setOrdenCarnet] = useState('asc');
    const [ordenSede, setOrdenSede] = useState('asc');

    useEffect(() => {
        //Aqui se hace la logica para obtener los datos de los estudiantes de la base de datos
        const fetchData = async () => {
            const mockData = [
                { id: 1, nombre: 'Juan Pérez', carnet: '2020123456', sede: 'Cartago', correo: 'juan@gmail.com', telefono: '8888-8888' },
                { id: 2, nombre: 'Ana Sánchez', carnet: '2020123457', sede: 'San José', correo: 'ana@gmail.com', telefono: '8888-8889' },
            ];
            setData(mockData);
        }
        fetchData();
    }, []);

    const handleOrdenNombre = () => {
        const nuevoOrden = ordenNombre === 'asc' ? 'desc' : 'asc';
        setOrdenNombre(nuevoOrden);
        const newData = [...data].sort((a, b) => {
            return nuevoOrden ==='asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
        });
        setData(newData);
    };

    const handleOrdenCarnet = () => {
        const nuevoOrden = ordenCarnet === 'asc' ? 'desc' : 'asc';
        setOrdenCarnet(nuevoOrden);
        const newData = [...data].sort((a, b) => {
            const carnetA = parseInt(a.carnet);
            const carnetB = parseInt(b.carnet);
            return nuevoOrden === 'asc' ? carnetA - carnetB : carnetB - carnetA;
        });
        setData(newData);
    };

    const handleOrdenSede = () => {
        const nuevoOrden = ordenSede === 'asc' ? 'desc' : 'asc';
        setOrdenSede(nuevoOrden);
        const newData = [...data].sort((a, b) => {
            return nuevoOrden === 'asc' ? a.sede.localeCompare(b.sede) : b.sede.localeCompare(a.sede);
        });
        setData(newData);
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
                <div style={{ width: "0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Consultas</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Profesor</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Guía</a>
                </div>
                <Link href="/consultasProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#38340C', marginTop: '20vh', marginLeft: "2vw", borderRadius: '1vw' }}>Consultar Equipo</Link>
                <Link href="/consultarEstudiantesProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#E2CE1A', marginTop: '2vh', marginLeft: "0.5vw", whiteSpace: "nowrap", borderRadius: '1vw' }}>Consultar Estudiantes</Link>
                <Link href="/profesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop: "35vh", marginLeft: "6vw" }}>Salir</Link>
            </div>
            <div style={{ width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                    <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Datos de Estudiantes</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-1vh' }}>
                        <h3 style={{ marginRight: '10px' }}>Filtros: </h3>
                        <Button onClick={handleOrdenNombre} style={{ marginLeft: "10px", color:"#38340C"}}>
                            Ordenar por Nombre {ordenNombre === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </Button>
                        <Button onClick={handleOrdenCarnet} style={{ marginLeft: "10px", color:"#38340C"}}>
                            Ordenar por Carnet {ordenCarnet === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </Button>
                        <Button onClick={handleOrdenSede} style={{ marginLeft: "10px", color:"#38340C"}}>
                            Ordenar por Sede {ordenSede === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </Button>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Nombre</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Carnet</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Sede</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Correo</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Teléfono</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(estudiante => (
                                <TableRow key={estudiante.id} style={{ backgroundColor: "white" }}>
                                    <TableCell>{estudiante.nombre}</TableCell>
                                    <TableCell>{estudiante.carnet}</TableCell>
                                    <TableCell>{estudiante.sede}</TableCell> {/* Aquí estaba el error, cambié "sede" por "correo" porque "sede" no está en los datos de estudiante */}
                                    <TableCell>{estudiante.correo}</TableCell>
                                    <TableCell>{estudiante.telefono}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default ConsultarEstudiantesProfesor;
