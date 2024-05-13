import React, { useState } from 'react'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';



function ModificarEstudianteCoordinador() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        correo: '',
        celular: '',
    });
    const [searchCarnet, setSearchCarnet] = useState('');
    const [showForm, setShowForm] = useState(false);
    const userId = sessionStorage.getItem('userId');
    const [estudiante, setEstudiante] = useState(null);

    const handleSearchCarnetChange = (e) => {
        setSearchCarnet(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const userIdInt = parseInt(userId);
            const result = await axios.get('http://3.14.65.142:3000/students/obtenerDatosEstudiante', {
                params: {
                    idUsuario: userIdInt
                }
            })
            console.log(result.data)
            const carnets = result.data.map((estudiante) => estudiante.carnet);

            if (carnets.includes(searchCarnet)) {
                const estudianteEncontrado = result.data.find((estudiante) => estudiante.carnet === searchCarnet);
                setEstudiante(estudianteEncontrado);
                setShowForm(true);
            } else {
                alert('Estudiante no encontrado');
                setSearchCarnet('');
            }

        } catch (error) {
            console.error(error);
            alert('Error al buscar estudiante');
        }
    };
    
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const estudianteId = estudiante.id;
            const estudianteIdString = estudianteId.toString();
    
            const formData1 = new FormData();
            formData1.append('idUsEnc', userId);
            formData1.append('idEstudiante', estudianteIdString);
            formData1.append('nombre', formData.nombre);
            formData1.append('apellido1', formData.apellido1);
            formData1.append('apellido2', formData.apellido2);
            formData1.append('celular', formData.celular);
            formData1.append('correo', formData.correo);
            
            // Convertir FormData a un objeto para depurar
            const formDataObject = {};
            for (const [key, value] of formData1.entries()) {
                formDataObject[key] = value;
            }
            console.log("FormData:", formDataObject);
            console.log(formData1)
            
            const response = await axios.put('http://3.14.65.142:3000/students/actualizarEstudiante', formDataObject);
    
            alert("Estudiante modificado");
            setShowForm(false);
            setSearchCarnet('');
            setFormData({
                nombre: '',
                apellido1: '',
                apellido2: '',
                correo: '',
                celular: '',
            })
            setEstudiante(null);
        } catch (error) {
            console.error(error);
            alert('Error al modificar estudiante');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSearchCarnet('');
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
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Modificar</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Información</a>
                </div>
                <Link href="/modificarCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '20vh', marginLeft: "0.8svw", borderRadius:'1vw'}}>Información Profesor</Link>
                <Link href="/modificarEstudianteCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "-0.3vw", whiteSpace:"nowrap", borderRadius:'1vw'}}>Información Estudiante</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"42vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#E2CE1A', overflow: 'hidden', minHeight: '100vh' }}>
            {!showForm ? (
                <div style={{ width: '50vw', marginTop: '10vh', marginLeft:"20vw" }}>
                    <Paper elevation={3} style={{ padding: '2vh', backgroundColor: '#EEE1B0', borderRadius: '1vw' }}>
                        <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Buscar Estudiante</Typography>
                        <form onSubmit={handleSearchSubmit}>
                            <TextField label="Número de Carnet" fullWidth margin="normal" value={searchCarnet} onChange={handleSearchCarnetChange} required/>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '2vh', width: '100%', backgroundColor: '#38340C', color: '#EEE1B0' }}>Buscar</Button>
                        </form>
                    </Paper>
                </div>
            ) : (
            <div style={{ width:"70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
              <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Información Estudiante</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label={"Nombre: " + estudiante.Nombre} name='nombre' fullWidth margin="normal" value={formData.nombre} onChange={handleChange} required/>
                    <TextField label={"Apellido 1: " + estudiante.Apellido1} name="apellido1" fullWidth margin="normal" value={formData.apellido1} onChange={handleChange} required/>
                    <TextField label={"Apellido 2: " + estudiante.Apellido2} name="apellido2" fullWidth margin="normal" value={formData.apellido2} onChange={handleChange} required/>
                    <TextField label={"Correo: " + estudiante.correo} name="correo" fullWidth margin="normal" value={formData.correo} onChange={handleChange} required/>  
                    <TextField label={"Celular: " + estudiante.celular} name="celular" fullWidth margin="normal" value={formData.celular} onChange={handleChange} required/>                  
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                        <Button type='submit' variant="contained" color="primary" style={{ width: '20vw', backgroundColor:"#38340C", border: '2px solid #38340C', marginLeft:"-1vw"}}>Enviar</Button>
                        <Button variant="contained" color="secondary" onClick={handleCancel} style={{ width: '20vw', backgroundColor:"#EEE1B0", border: '2px solid #38340C', color:"black", marginLeft:"1vw"}}>Cancelar</Button>
                    </div>
                </form>
              </Paper>
            </div>
            )}
        </div>
    </div>
  )
}

export default ModificarEstudianteCoordinador;
