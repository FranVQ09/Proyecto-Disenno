import React, { useState }  from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';


function InformesExcel() {
    const [option, setOption] = useState("");

    const handleChange = (event) => {
        setOption(event.target.value);
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
                        <label style={{ color: '#38340C', fontSize: '1.5vw', marginBottom: '1vh', marginTop:"1vh" }}>Seleccione la sede:</label>
                        <FormControl>
                            <Select
                                labelId="opciones-label"
                                id="opciones"
                                value={option}
                                onChange={handleChange}
                                style={{ width:"15vw", marginBottom:"2vh" }}
                                >
                                <MenuItem disabled value="">
                                    <em>Seleccione una sede</em>
                                </MenuItem>
                                <MenuItem value="CA">Cartago</MenuItem>
                                <MenuItem value="SJ">San José</MenuItem>
                                <MenuItem value="AL">Alajuela</MenuItem>
                                <MenuItem value="LI">Limón</MenuItem>
                                <MenuItem value="SC">San Carlos</MenuItem>
                                <MenuItem value="TO">Todas</MenuItem>
                            </Select>
                        </FormControl>
                        <button type="submit" style={{ width:"10vw", padding:"1vh", backgroundColor:"#38340C", color:"white", fontSize:"1.2vw", borderRadius:"1vw", marginBottom:"1vh" }}>Generar</button>
                    </form>
                </div>
            </Paper>
        </div>
    </div>
  )
}

export default InformesExcel
