import { TextField } from '@mui/material'
import React from 'react'
import { Form } from 'react-router-dom'

function registerPage() {
  return (
    <div
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', //Alinear la caja mas arriba
        height: '100vh', // Hace que el contenedor ocupe toda la altura de la ventana
        backgroundColor: '#f5f5f5',
        paddingTop: '250px' // Espaciado superior
    }}
    >
        <div
            style={{
                width: '400px', // Ancho del contenedor
                padding: '20px', // Espaciado interno
                border: '1px solid #ccc', // Borde
                borderRadius: '5px', // Bordes redondeados
                backgroundColor: '#fff', 
            }}
        > 
        <h2 style={{ 
            marginBottom: '20px',
            color: '#333', // Color del texto
            fontSize: '32px', // Tamaño de la fuente
            fontFamily: 'Arial', // Tipo de fuente
            textAlign: 'center' // Alineación del texto
            }}
            >Registrarse
        </h2>  
        <form>
            <TextField
                id='correo'
                label='Correo Electrónico'
                variant='outlined'
                fullWidth
                sx={{
                    marginBottom: '20px', // Espaciado izquierdo y derecho
                    width: '100%', // Ancho del campo de texto
                    height: '50px' // Alto del campo de texto
                }}
            />
            <TextField
                id='contraseña'
                label='Contraseña'
                type='password'
                variant='outlined'
                fullWidth
                sx={{ 
                    marginBottom: '20px',
                    width: '100%',
                    height: '50px'
                }}
            />
        </form> 
        </div>
    </div>
  )
}

export default registerPage
