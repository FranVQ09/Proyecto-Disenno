import React, { useState }  from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';


function InformesExcel() {
    const userId = sessionStorage.getItem('userId');

    const handleGenerar = async () => {
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
            <div style={{ width:"0vw", marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: "#E2CE1A", paddingLeft: '0.5vw' }}>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: '3vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Informes</a>
            </div>
            <Link href="/informesExcel" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '30vh', marginLeft: "2vw", borderRadius:'1vw'}}>Generar Informe</Link>
            <Link href="/cargarInforme" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.5vw", whiteSpace:"nowrap"}}>Cargar Informe</Link>
            <Link href="/asistente" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
        </div>
        <div style={{ width:"50vw", marginTop: '25vh', marginLeft: '40vw', marginRight: '20vw' }}>
            <Paper elevation={3} style={{ padding: '2vh', backgroundColor:"#EEE1B0", borderRadius:"1vw" }}>
                <h1 style={{ color: '#38340C', fontSize: '2.5vw', textAlign: 'center', marginBottom: '3vh' }}>Generar Informe Excel</h1>
                <div style={{ width:"40vw", backgroundColor:"white", margin:"auto", borderRadius:"1vw"}}>
                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <label style={{ color: '#38340C', fontSize: '1.5vw', marginBottom: '1vh', marginTop:"1vh" }}>Generar Excel de los Estudiantes:</label>
                        <Button onClick={handleGenerar} style={{ width:"10vw", padding:"1vh", backgroundColor:"#38340C", color:"white", fontSize:"1vw", borderRadius:"1vw", marginBottom:"1vh" }}>Generar</Button>
                        <label style={{ color: '#38340C', fontSize: '1.5vw', marginBottom: '1vh', marginTop:"1vh" }}>Generar Excel de los Estudiantes por Sede:</label>
                        <Button onClick={handleExcelSede} style={{ width:"10vw", padding:"1vh", backgroundColor:"#38340C", color:"white", fontSize:"1vw", borderRadius:"1vw", marginBottom:"1vh" }}>Generar</Button>
                    </form>
                </div>
            </Paper>
        </div>
    </div>
  )
}

export default InformesExcel
