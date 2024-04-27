import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Menu() {
  return (
    <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centrar verticalmente
        height: '100vh', // Hace que el contenedor ocupe toda la altura de la ventana
        backgroundColor: '#E2CE1A', // Color de fondo
        overflow: 'hidden' // Ocultar el desbordamiento
        }}
    >
        <div
            style={{
            width: '70%', // Ancho del contenedor
            padding: '20px', // Espaciado interno
            borderRadius: '5px', // Bordes redondeados
            backgroundColor: '#FFFCA4', //Color de la caja 
            margin: 'auto' // Centrar horizontalmente
            }}
        >
            <h2
            style={{
                marginBottom: '30px',
                color: '#333', // Color del texto
                fontSize: '32px', // Tamaño de la fuente
                fontFamily: 'Arial', // Tipo de fuente
                textAlign: 'center' // Alineación del texto
            
            }}
            >
                Menú temporal de la pagina
            </h2>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
            }}>
                <Link to='/asistente'>
                    <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'300px', backgroundColor: "#38340C"}}>Asistente Administrativo</Button>
                </Link>
                <Link to='/profesorCoordinador'>
                    <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px', backgroundColor: "#38340C"}}>Profesor Coordinador</Button>    
                </Link>
                <Link to='/profesor'>
                    <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px', backgroundColor: "#38340C"}}>Profesor</Button>
                </Link>
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px', backgroundColor: "#38340C"}}>Estudiante</Button>
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px', backgroundColor: "#38340C"}}>Salir</Button>
            </div>
        </div>
    </div>
  )
}

export default Menu;
