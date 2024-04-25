import React from 'react';
import ProfesorCoordinadorImage from '../../fotos/ProfesorCoordinador.webp';

function MenuProfesorCoordinador() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center', // Alinear al principio verticalmente
                minHeight: '100vh', // Altura mínima de la ventana
                backgroundColor: '#E2CE1A', // Color de fondo
                overflow: 'hidden' // Ocultar el desbordamiento
            }}
        >
            {/* Caja del menú en la parte de arriba */}
            <div
                style={{
                    width: '100%', // Ancho del contenedor al 100% del viewport
                    padding: '10px', // Espaciado interno
                    backgroundColor: '#38340C', // Color de la caja 
                    display: 'flex', // Utilizar flexbox para alinear elementos
                    justifyContent: 'space-between', // Distribuir los elementos horizontalmente
                    alignItems: 'center', // Centrar verticalmente
                    height: '50px', // Altura de la barra del menú
                    marginTop: '50px' // Margen superior para separarlo ligeramente
                }}
            >
                {/* Enlaces del menú */}
                <div style={{ display: 'flex' }}>
                    <a
                        href="#"
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '20px', // Tamaño de fuente
                            textDecoration: 'none', // Quitar subrayado del enlace
                            marginLeft: '10px',
                            marginRight: '10px' // Margen derecho entre enlaces
                        }}
                    >
                        Plan Actividades
                    </a>
                    <a
                        href="#"
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            textDecoration: 'none',
                            marginLeft: '10px',
                            marginRight: '10px' // Margen derecho entre enlaces
                        }}
                    >
                        Consultas
                    </a>
                    <a
                        href="#"
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            textDecoration: 'none',
                            marginLeft: '10px',
                            marginRight: '10px' // Margen derecho entre enlaces
                        }}
                    >
                        Modificar Informacion
                    </a>
                </div>
                <a
                    href="/menu"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        textDecoration: 'none',
                        marginLeft: '10px',
                        marginRight: '10px' // Margen izquierdo
                    }}
                >
                    Cerrar Sesión
                </a>
            </div>
            
            {/* Encabezado */}
            <h1
                style={{
                    color: '#333',
                    fontSize: '3.7vw', // Utilizar el 5% del ancho del viewport para el tamaño de fuente
                    textAlign: 'left', // Alinear a la izquierda
                    margin: '25vh 0 0 -65vw', // Margen superior, derecha, inferior e izquierda con unidades de viewport
                    whiteSpace: 'nowrap' // Evitar el salto de línea
                }}
            >
                <div>Página</div> {/* Espaciado entre palabras */}
                <div>Profesor</div> {/* Espaciado entre palabras */}
                <div>Coordinador</div> {/* No se agrega margen inferior al último */}
            </h1>
            <img
                src={ProfesorCoordinadorImage}
                alt="Profesor Coordinador"
                style={{
                    width: '33vw', // Ancho de la imagen en relación al viewport
                    objectFit: 'cover', // Ajustar la imagen para que se ajuste al contenedor sin cambiar sus proporciones
                    marginLeft: '40vw', // Margen izquierdo en relación al viewport
                    marginTop: '-44vh' // Margen superior en relación al viewport
                }}
            />
        </div>
    );
}

export default MenuProfesorCoordinador;



