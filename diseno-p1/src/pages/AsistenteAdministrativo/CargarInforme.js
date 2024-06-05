import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios';

function CargarInforme() {
    const [selectedFile, setSelectedFile] = useState(null);
    const userSede = sessionStorage.getItem('userSede');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('sede', userSede);
            formData.append('archivo', selectedFile);

            const data = await axios.post('http://18.223.33.212:3000/students/insertEstudiantes', formData)
            alert("Archivo cargado con éxito");

        } catch (error) {
            console.log(error);
            alert("Error al cargar el archivo");
        }
    };

    const handleCancelar = () => {
        setSelectedFile(null);
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
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Informes</a>
                </div>
                <Link href="/informesExcel" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '30vh', marginLeft: "2vw", borderRadius:'1vw'}}>Generar Informe</Link>
                <Link href="/cargarInforme" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "2.5vw", whiteSpace:"nowrap", borderRadius:"1vw"}}>Cargar Informe</Link>
                <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width:"50vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                    <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Cargar Informe de Estudiantes</h1>
                    <div style={{ width:"40vw", backgroundColor:"white", margin:"auto", borderRadius:"1vw"}}>
                        <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <label style={{ color: '#38340C', fontSize: '1.5vw', marginBottom: '1vh', marginTop:"1vh" }}>Seleccione el archivo:</label>
                            <Input type="file" id="file" name="file" inputProps={{ accept: '.xlsx' }} style={{ display: 'none' }} onChange={handleFileChange} />
                            {
                                selectedFile &&
                                <label style={{ color: '#38340C', fontSize: '1.2vw', marginBottom: '1vh', marginTop:"1vh" }}>{selectedFile.name}</label>
                            }
                            <label htmlFor="file">
                                <Button component="span" style={{ backgroundColor: '#bcbcbc', color: 'black', fontSize: '0.6vw', height:"3vh", marginBottom: '1vh', width:"9vw" }}>Seleccionar archivo</Button>
                            </label>
                            <div>
                                <Button onClick={handleUpload} style={{ backgroundColor: '#38340C', color: 'white', fontSize: '0.8vw', padding: '1vh', borderRadius: '1vw', width:"8vw", marginBottom:"1vh", marginTop:"1vh" }}>Cargar</Button>
                                <Button onClick={handleCancelar} style={{ backgroundColor: '#38340C', color: 'white', fontSize: '0.8vw', padding: '1vh', borderRadius: '1vw', width:"8vw", marginBottom:"1vh", marginTop:"1vh", marginLeft:"1vw" }}>Cancelar</Button>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default CargarInforme;
