import React from 'react';
import AsistenteAdministrativo from '../../fotos/AsistenteAdministrativo.png';


const MenuAsistente = () => {
  return (
    // Contenedor principal
    <div
        style={{
            display: 'flex',
            flexDirection: 'column', // Mantenemos la dirección de columnas para apilar elementos verticalmente
            justifyContent: 'flex-start',
            alignItems: 'center', // Alinear al centro horizontalmente
            minHeight: '100vh', // Altura mínima de la ventana
            backgroundColor: '#E2CE1A', // Color de fondo
            overflow: 'hidden', // Ocultar el desbordamiento
        }}
    >
        {/*Caja del menu en la parte de arriba*/}
        <div
            style={{
                width: '100%', // Ancho del contenedor al 80% del viewport
                padding: '10px', // Espaciado interno
                backgroundColor: '#38340C', //Color de la caja 
                display: 'flex', // Utilizar flexbox para alinear elementos
                justifyContent: 'space-between', // Distribuir los elementos horizontalmente
                alignItems: 'center', // Centrar verticalmente
                height: '50px', // Altura de la barra del menú
                marginTop: '50px', // Margen superior para separarlo ligeramente
                
            }}
        >
            {/* Enlaces del menú */}
            <div style={{ display: 'flex' }}>
                <a
                    href="/gestionarEquipo"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px', // Tamaño de fuente
                        textDecoration: 'none', // Quitar subrayado del enlace
                        marginLeft: '10px', // Margen derecho entre enlaces
                        marginRight: '10px' // Margen derecho entre enlaces
                    }}
                >
                   Gestionar Equipo
                </a>
                <a
                    href="/consultasDetalleEquipo"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        textDecoration: 'none',
                        marginRight: '10px', // Margen derecho entre enlaces
                        marginLeft: '10px' // Margen derecho entre enlaces
                    }}
                >
                    Consultas
                </a>
                <a
                    href="/registrarProfesor"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        textDecoration: 'none',
                        marginRight: '10px', // Margen derecho entre enlaces
                        marginLeft: '10px' // Margen derecho entre enlaces
                    }}
                >
                    Registrar Profesor
                </a>
                <a
                    href="/informesExcel"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        textDecoration: 'none',
                        marginRight: '10px', // Margen derecho entre enlaces
                        marginLeft: '10px' // Margen derecho entre enlaces
                    }}
                >
                    Informes
                </a>
            </div>
            <a
                href="/"
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textDecoration: 'none',
                    marginLeft: '10px', // Margen izquierdo
                    marginRight: '10px' // Margen derecho
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
                <div>Asistente</div> {/* Espaciado entre palabras */}
                <div>Administrativo</div> {/* No se agrega margen inferior al último */}
        </h1>
        <img
            src={AsistenteAdministrativo}
            alt="Asistente Administrativo"
            style={{
                width: '50vw', // Ancho de la imagen con unidades de viewport
                margin: '-30vh 0 0 40vw' // Margen superior e izquierdo con unidades de viewport
            }}
        />
    </div>
);
};

export default MenuAsistente;
