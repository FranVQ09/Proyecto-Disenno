import React from 'react'

function consultasEstudiantes() {
    return (
        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E2CE1A', // Color de fondo
        overflow: 'hidden', // Ocultar el desbordamiento
        minHeight: '100vh', // Altura mínima de la ventana
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
        <div
          style={{
            width: '2%',
            height: '5vh',
            backgroundColor: '#E2CE1A',
            marginLeft: '2vh',
            marginTop: '1.5vh',
          }}
        ></div>
        <a
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '3vw', // Utilizando unidades de medida relativas
            textDecoration: 'none',
            marginLeft: '4vh',
            marginTop: '-6vh',
          }}
        >
          Consultas
        </a>
        <a
            href='/consultasDetalleEquipo'
            style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5vw', // Utilizando unidades de medida relativas
                textDecoration: 'none',
                marginTop: '25vh', // Ajustado según tus indicaciones
                marginLeft: '3vh', // Ajustado según tus indicaciones
                backgroundColor: '#38340C',
                padding: '0.7vh', // Añadido para un mejor aspecto
                display: 'inline-block', // Para que los elementos se comporten como bloques en línea
                borderRadius: '1vh', // Bordes redondeados
            }}
        >
          Detalles del Equipo
        </a>
        <a
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5vw', // Utilizando unidades de medida relativas
            textDecoration: 'none',
            marginTop: '4vh', // Ajustado según tus indicaciones
            marginLeft: '6vh', // Ajustado según tus indicaciones
            backgroundColor: '#E2CE1A',
            padding: '1vh', // Añadido para un mejor aspecto
            display: 'inline-block', // Para que los elementos se comporten como bloques en línea
            borderRadius: '1vh', // Bordes redondeados
          }}
        >
          Estudiantes
        </a>
        <a
          href="/consultasPlanActividades"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5vw', // Utilizando unidades de medida relativas
            textDecoration: 'none',
            marginTop: '4vh', // Ajustado según tus indicaciones
            marginLeft: '3vh', // Ajustado según tus indicaciones
            padding: '0.2vh', // Añadido para un mejor aspecto
            backgroundColor: '#38340C',
            display: 'inline-block', // Para que los elementos se comporten como bloques en línea
            borderRadius: '1vh', // Bordes redondeados
          }}
        >
          Plan de Actividades
        </a>
        <a
          href="/asistente"
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5vw', // Utilizando unidades de medida relativas
            textDecoration: 'none',
            marginTop: '35vh', // Ajustado según tus indicaciones
            marginLeft: '12vh', // Ajustado según tus indicaciones
            padding: '1vh', // Añadido para un mejor aspecto
            backgroundColor: '#38340C',
            display: 'inline-block', // Para que los elementos se comporten como bloques en línea
          }}
        >
          Salir
        </a>
      </div>
    </div>
    );
}

export default consultasEstudiantes;
