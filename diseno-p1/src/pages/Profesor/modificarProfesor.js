import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';

function ModificarProfesor() {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
      nombre: '',
      correo: '',
      sede: '',
      codigo: '',
      anno: '',
      estado: ''
    });

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

    const handleDeleteImage = () => {
        setImage(null);
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Profesor modificado correctamente');
    };

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
                <div style={{ width: '0vw', marginTop: '2vh', marginLeft: '1vw', marginBottom: '1vh', backgroundColor: '#E2CE1A', paddingLeft: '0.5vw' }}>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Modificar</a>
                    <a style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5vw', textDecoration: 'none', display: 'inline-block', backgroundColor: '#38340C', marginLeft: '1vw' }}>Información</a>
                </div>
                <Link href="/modificarProfesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '20vh', marginLeft: "0.8vw", borderRadius:'1vw'}}>Información Profesor</Link>
                <Link href="/modificarEstudiante" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "0vw", whiteSpace:"nowrap"}}>Información Estudiante</Link>
                <Link href="/profesor" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"42vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width:"70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
              <Paper elevation={3} style={{ padding: '2vh', backgroundColor: "#EEE1B0", borderTopLeftRadius: "1vw", borderTopRightRadius: "1vw" }}>
                <Typography variant="h3" style={{ color: '#38340C', textAlign: 'center', marginBottom: '3vh' }}>Información Profesor</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField label="Nombre" name="nombre" fullWidth margin="normal" value={formData.nombre} onChange={handleChange} />
                  <TextField label="Apellidos" name="apellidos" fullWidth margin="normal" value={formData.apellidos} onChange={handleChange} />
                  <TextField label="Correo" name="correo" fullWidth margin="normal" value={formData.correo} onChange={handleChange} />
                  <TextField label="Teléfono Celular" name="celular" fullWidth margin="normal" value={formData.celular} onChange={handleChange} />
                  <TextField label="Teléfono Oficina" name="oficina" fullWidth margin="normal" value={formData.oficina} onChange={handleChange} />
                  <TextField label="Sede" name="sede" fullWidth margin="normal" value={formData.sede} onChange={handleChange} />
                  {image ? (
                      <div>
                          <img src={image} alt="Foto de perfil" style={{ width: '30%', borderRadius: '1vw', marginTop: '2vh', marginLeft:"22.5vw" }} />
                          <Button variant="contained" color="secondary" onClick={handleDeleteImage} style={{ marginTop: '1vh', width:"20vw", marginLeft:"22.5vw", backgroundColor:"#E2CE1A", color:"black", border: "0.15vw solid #38340C" }}>Eliminar Foto</Button>
                      </div>
                  ) : (
                      <div style={{ width:"50vw", marginLeft:"6vw", marginTop: '2vh', border: '2px dashed #38340C', borderRadius: '1vw', padding: '2vw' }} {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Typography variant="body1">Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen.</Typography>
                          <Typography variant="body1">NOTA: La Imagen debe ser formato PNG</Typography>
                      </div>
                  )}
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '2vh', width:"15vw", marginLeft:"25vw", backgroundColor:"#38340C", marginTop:"2vh", marginBottom:"2vh", border: '2px solid #EEE1B0'}}>Enviar</Button>
                </form>
              </Paper>
            </div>
        </div>
    );
}

export default ModificarProfesor;
