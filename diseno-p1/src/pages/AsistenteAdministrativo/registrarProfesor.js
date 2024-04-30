import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

function RegistrarProfesor() {
    const [image, setImage] = useState(null);
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        correo: '',
        telefonoOficina: '',
        telefonoCelular: ''
    });

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

    const handleRegistrar = () => {
        // Aquí puedes enviar los valores del formulario a tu backend para guardar en la base de datos
        console.log('Valores del formulario:', formValues);
        // Aquí podrías resetear el formulario si lo deseas
        setFormValues({
            nombre: '',
            apellido1: '',
            apellido2: '',
            correo: '',
            telefonoOficina: '',
            telefonoCelular: ''
        });
        handleDeleteImage();
        alert('Profesor registrado correctamente');
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

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
                        <TextField name="nombre" label="Nombre" variant="outlined" fullWidth value={formValues.nombre} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="apellido1" label="Apellido 1" variant="outlined" fullWidth value={formValues.apellido1} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="apellido2" label="Apellido 2" variant="outlined" fullWidth value={formValues.apellido2} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="correo" label="Correo" type="email" variant="outlined" fullWidth value={formValues.correo} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="telefonoOficina" label="Teléfono de Oficina" variant="outlined" fullWidth value={formValues.telefonoOficina} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="telefonoCelular" label="Teléfono Celular" variant="outlined" fullWidth value={formValues.telefonoCelular} onChange={handleChange} />
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
                                <p>NOTA: La Imagen debe ser formato PNG</p>
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
