import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { InputLabel, Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import axios from 'axios';  
import Profesor from '../../Factory/Profesor';


function RegistrarProfesor() {
    const [image, setImage] = useState(null);
    const [formValues, setFormValues] = useState({
        nombre: '',
        ap1: '',
        ap2: '',
        correo: '',
        password: '',
        numOfi: '',
        celular: '',
        exten: '',
    });
    const [selectedSede, setSelectedSede] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleDeleteImage = () => {
        setImage(null);
    };

    const handleRegistrar = async () => {
        const profesor = new Profesor(
            formValues.nombre, 
            formValues.ap1, 
            formValues.ap2, 
            formValues.correo, 
            formValues.password,
            selectedSede, 
            formValues.celular,
            formValues.numOfi, 
            formValues.exten, 
            image);
        profesor.almacenarBaseDatos();

        setFormValues({nombre: '', ap1: '', ap2: '', correo: '', password: '', numOfi: '', celular: '', exten: ''});
        setSelectedSede('');
        setImage(null);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file); 
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg, image/jpg', // Solo aceptar archivos PNG, JPEG y JPG
        onDrop,
    });

    const handleSede = (event) => {
        setSelectedSede(event.target.value);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#E2CE1A',
                overflow: 'hidden',
            }}
        >
            <h1
                style={{
                    fontSize: '3.5vw',
                    color: '#38340C',
                    marginLeft: '-65vw',
                    marginTop: '5vh',
                }}
            >
                Registrar Profesor
            </h1>
            <Paper elevation={3} style={{ padding: '2vw', borderRadius: '1vw', width: '80vw', backgroundColor:"#EEE1B0" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField name="nombre" label="Nombre" variant="outlined" fullWidth value={formValues.nombre} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="ap1" label="Apellido 1" variant="outlined" fullWidth value={formValues.ap1} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="ap2" label="Apellido 2" variant="outlined" fullWidth value={formValues.ap2} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="correo" 
                            label="Correo" 
                            type="email" 
                            variant="outlined" 
                            fullWidth 
                            value={formValues.correo} 
                            onInput={handleChange} 
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="password" label="Contraseña" type="password" variant="outlined" fullWidth value={formValues.password} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="numOfi" label="Teléfono de Oficina" variant="outlined" fullWidth value={formValues.numOfi} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="celular" label="Teléfono Celular" variant="outlined" fullWidth value={formValues.celular} onChange={handleChange} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="sede-label">Seleccione una sede</InputLabel>
                            <Select
                            labelId="sede-label"
                            value={selectedSede}
                            onChange={handleSede}
                            displayEmpty
                            required
                            >
                                <MenuItem value='CA'>Cartago</MenuItem>
                                <MenuItem value='SJ'>San José</MenuItem>
                                <MenuItem value='AL'>Alajuela</MenuItem>
                                <MenuItem value='SC'>San Carlos</MenuItem>
                                <MenuItem value='LI'>Limón</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="exten" label="Extensión" variant="outlined" fullWidth value={formValues.exten} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={5} style={{ marginLeft:"24vw"}}>
                        {image ? (
                            <div>
                                <img src={image} alt="Foto de perfil" style={{ width: '100%', borderRadius: '1vw' }} />
                                <Button variant="contained" color="secondary" onClick={handleDeleteImage} fullWidth>
                                    Eliminar Foto
                                </Button>
                            </div>
                        ) : (
                            <div {...getRootProps()} style={{ border: '2px dashed #38340C', borderRadius: '1vw', padding: '2vw' }}>
                                <input {...getInputProps()} />
                                <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen.</p>
                                <p>NOTA: La Imagen debe ser formato PNG o JPEG</p>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <div style={{ marginTop:"3vh", marginBottom:"3vh"}}>
                <Button style={{ backgroundColor:"#38340C", color:"#FFFCA4", padding:"1vh", width:"10vw"}} onClick={handleRegistrar}>Registrar</Button>
                <Link to="/asistente">
                    <Button style={{ backgroundColor:"#E2CE1A", border: "0.15vw solid #38340C", color:"#38340C", marginLeft:"1vw", padding:"1vh", width:"10vw"}}>Salir</Button>
                </Link>
            </div>
        </div>
    );
}

export default RegistrarProfesor;