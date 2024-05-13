import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';


function ConsultasEstudiantesCoordinador() {
    const [data, setData] = useState([]);
    const [ordenNombre, setOrdenNombre] = useState('asc'); 
    const [ordenCarnet, setOrdenCarnet] = useState('asc');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        //Aqui se hace la logica para obtener los datos de los estudiantes de la base de datos
        const fetchData = async () => {
            try{
                const response = await axios.get('http://3.14.65.142:3000/students/obtenerDatosEstudiante', {
                    params: {
                        idUsuario: userId
                    }
                })
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleOrdenNombre = () => {
        const nuevoOrden = ordenNombre === 'asc' ? 'desc' : 'asc';
        setOrdenNombre(nuevoOrden);
        const newData = [...data]

        newData.sort((a, b) => {
            const nombreA = a.Nombre || '';
            const nombreB = b.Nombre || '';

            if (ordenNombre === 'asc') {
                return nombreA.localeCompare(nombreB);
            } else {
                return nombreB.localeCompare(nombreA);
            }
        })
        setData(newData);
    };

    const handleOrdenCarnet = () => {
        const nuevoOrden = ordenCarnet === 'asc' ? 'desc' : 'asc';
        setOrdenCarnet(nuevoOrden);
        const newData = [...data];

        newData.sort((a, b) => {
            if (ordenCarnet === 'asc') {
                return a.carnet - b.carnet;
            } else {
                return b.carnet - a.carnet;
            }
        });
        setData(newData);
    };

    const handleGenerarExcel = async () => {
        try {
            const response = await axios.get('http://3.14.65.142:3000/students/archivoAll', {
                responseType: 'blob' // Indica que esperamos un objeto blob como respuesta
            });
    
            // Crear un objeto URL para el archivo blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            // Crear un enlace <a> en el documento
            const link = document.createElement('a');
            link.href = url;
    
            // Establecer el nombre de archivo para el enlace
            link.setAttribute('download', 'Estudiantes.xlsx');
    
            // Hacer clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();
    
            // Limpiar el objeto URL y eliminar el enlace
            window.URL.revokeObjectURL(url);
            link.parentNode.removeChild(link);
    
            alert("Archivo generado con éxito");
        } catch (error) {
            console.log(error);
            alert("Error al generar el archivo");
        }
    }

    const handleExcelSede = async () => {
        try {
            const response = await axios.get('http://3.14.65.142:3000/archivoSede', {
                params: {
                    profe: userId
                }, 
                responseType: 'blob' // Indica que esperamos un objeto blob como respuesta
            });
    
            // Crear un objeto URL para el archivo blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            // Crear un enlace <a> en el documento
            const link = document.createElement('a');
            link.href = url;
    
            // Establecer el nombre de archivo para el enlace
            link.setAttribute('download', 'Estudiantes_Sede.xlsx');
    
            // Hacer clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();
    
            // Limpiar el objeto URL y eliminar el enlace
            window.URL.revokeObjectURL(url);
            link.parentNode.removeChild(link);
    
            alert("Archivo generado con éxito");
        } catch (error) {
            console.log(error);
            alert("Error al generar el archivo");
        }
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
                <div style={{ width: "0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Consultas</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Profesor</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Coordinador</a>
                </div>
                <Link href="/consultasProfesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#38340C', marginTop: '20vh', marginLeft: "2vw", borderRadius: '1vw' }}>Consultar Equipo</Link>
                <Link href="/consultasEstudianteCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: '#E2CE1A', marginTop: '2vh', marginLeft: "0.5vw", whiteSpace: "nowrap", borderRadius: '1vw' }}>Consultar Estudiantes</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop: "35vh", marginLeft: "6vw" }}>Salir</Link>
            </div>
            <div style={{ width: "70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw', overflow:"auto" }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw", marginBottom:"2vh" }}>
                    <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Datos de Estudiantes</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-0.5vh' }}>
                        <h3 style={{ marginRight: '10px' }}>Filtros: </h3>
                        <Button onClick={handleOrdenNombre} style={{ marginLeft: "10px", color:"#38340C"}}>
                            Ordenar por Nombre {ordenNombre === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </Button>
                        <Button onClick={handleOrdenCarnet} style={{ marginLeft: "10px", color:"#38340C"}}>
                            Ordenar por Carnet {ordenCarnet === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                        </Button>
                        <Button onClick={handleGenerarExcel} variant='contained' style={{ backgroundColor:"#93bf85", color:"#38340C", marginLeft:"7vw", width:"13vw" }}>
                            Excel Estudiantes
                        </Button>
                        <Button onClick={handleExcelSede} variant='contained' style={{ backgroundColor:"#93bf85", color:"#38340C", marginLeft:"1vw", width:"15vw", marginBottom:"1vh" }}>
                            Excel Estudiantes Por Sede
                        </Button>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Nombre</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Apellido 1</TableCell>    
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Apellido 2</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Carnet</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Correo</TableCell>
                                <TableCell style={{ backgroundColor: '#38340C', color: "white" }}>Celular</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(estudiante => (
                                <TableRow key={estudiante.id} style={{ backgroundColor: "white" }}>
                                    <TableCell>{estudiante.Nombre}</TableCell>
                                    <TableCell>{estudiante.Apellido1}</TableCell>
                                    <TableCell>{estudiante.Apellido2}</TableCell> 
                                    <TableCell>{estudiante.carnet}</TableCell>
                                    <TableCell>{estudiante.correo}</TableCell>
                                    <TableCell>{estudiante.celular}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default ConsultasEstudiantesCoordinador;