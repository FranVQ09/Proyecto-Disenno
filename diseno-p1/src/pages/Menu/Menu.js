import React from 'react'
import Button from '@mui/material/Button';

function Menu() {
  return (
    <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', //Alinear la caja mas arriba
        height: '70vh', // Hace que el contenedor ocupe toda la altura de la ventana
        backgroundColor: '#E2CE1A',
        paddingTop: '250px', // Espaciado superior
        overflow: 'hidden' // Ocultar el desbordamiento
        
        }}
    >
        <div
            style={{
                width: '800px', // Ancho del contenedor
                padding: '20px', // Espaciado interno
                border: '1px solid #ccc', // Borde
                borderRadius: '5px', // Bordes redondeados
                backgroundColor: '#fff',
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
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'300px'}}>Asistente Administrativo</Button>
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px'}}>Profesor</Button>
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px'}}>Profesor Guía</Button>
                <Button variant='contained' color='primary' style={{ marginRight:'10px', width:'200px'}}>Estudiante</Button>
            </div>
        </div>
    </div>
  )
}

export default Menu;
