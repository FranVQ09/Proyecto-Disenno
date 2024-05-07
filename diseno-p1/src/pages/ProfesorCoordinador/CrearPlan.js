import React, { useState, useEffect} from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';

function CrearPlan() {
    const userId = localStorage.getItem('userId');
    const añoActual = new Date().getFullYear();
    const [periodoLectivo, setPeriodoLectivo] = useState('');
    const [idEquipo, setIdEquipo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://3.14.65.142:3000/obtenerEquipoAnno', {
                    params: {
                        anno: añoActual,
                    }
                })
                setIdEquipo(response.data[0].id);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleCrear = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://3.14.65.142:3000/registrarPlan', {
                idEquipo: idEquipo,
                periodo: parseInt(periodoLectivo),
            })
            alert('Plan creado exitosamente');
            setPeriodoLectivo('');
        } catch (error) {
            console.error('Error al crear plan: ', error);
            alert('Error al crear plan');
        }
    };

    const handleCancelar = (e) => {
        e.preventDefault();
        setPeriodoLectivo('');
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
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Plan</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '0.5vw' }}>Actividades</a>
                </div>
                <Link href="/crearPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '20vh', marginLeft: "4vw", borderRadius:'1vw'}}>Crear Plan</Link>
                <Link href="/actualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap"}}>Actualizar Plan</Link>
                <Link href="/visualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap"}}>Visualizar Plan</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width:"20vw", marginTop: '25vh', marginLeft: '40vw', marginRight: '20vw', justifyContent:'center' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw", justifyContent:"center"}}>
                    <h1 style={{ color: '#38340C', fontSize: '1.5vw', textAlign: 'center', marginBottom: '3vh' }}>Crear Plan</h1>
                    <form onSubmit={handleCrear}>
                        <TextField
                            label="Período lectivo"
                            type='text'
                            variant="outlined"
                            width="50%"
                            margin="normal"
                            value={periodoLectivo}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === "" || newValue === '1' || newValue === '2') {
                                setPeriodoLectivo(newValue);
                                } else {
                                    alert('El período lectivo debe ser 1 o 2');
                                    setPeriodoLectivo('');
                                }
                            }}
                            style={{ marginBottom: '3vh', marginLeft:"3vw" }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                            <Button type="submit" style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw' }}>Crear</Button>
                            <Button onClick={handleCancelar} style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw', marginLeft:"1vw" }}>Cancelar</Button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default CrearPlan;