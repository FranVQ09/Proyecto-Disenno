import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function ModificarProfesor() {
    const [image, setImage] = useState(null);
    const userId = sessionStorage.getItem('userId');
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        apellido1: '',
        apellido2: '',
        extension: '',
        celular: '',
        numOfi: ''
      });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://18.223.33.212:3000/professors/obtenerDatosProfeso', {
                    params: {
                        idProfesor: userId
                    }
                })
                setUserData(response.data[0]);
            } catch(error) {
                console.error(error);
                alert('Error con el ID');
            }
        }
        fetchData();
    }, [userId]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg, image/jpg',
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
        try {
            const formData1 = new FormData();
            formData1.append('idProfesor', userId);
            formData1.append('nombre', formData.nombre);
            formData1.append('correo', formData.correo);
            formData1.append('ap1', formData.apellido1);
            formData1.append('ap2', formData.apellido2);
            formData1.append('celular', formData.celular);
            formData1.append('numOfi', formData.numOfi);
            formData1.append('exten', userData.extension);
            formData1.append('imagen', image);
            formData1.append('idUsEnc', userId);
            const response = await axios.put('http://18.223.33.212:3000/professors/modificarDatoProfesor', formData1);
            alert("Profesor modificado");
            // Recargar la página
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error, no se pudo modificar el profesor");
        }
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
                <TextField label={"Nombre: " + userData.Nombre} name="nombre" fullWidth margin="normal" value={formData.nombre} onChange={handleChange} />
                  <TextField label={"Apellido1: " + userData.Apellido1} name="apellido1" fullWidth margin="normal" value={formData.apellido1} onChange={handleChange} />
                  <TextField label={"Apellido2: " + userData.Apellido2} name="apellido2" fullWidth margin="normal" value={formData.apellido2} onChange={handleChange} />
                  <TextField label={"Correo: " + userData.correo} name="correo" fullWidth margin="normal" value={formData.correo} onChange={handleChange} />
                  <TextField label={"Teléfono Celular: " + userData.celular} name="celular" fullWidth margin="normal" value={formData.celular} onChange={handleChange} />
                  <TextField label={"Teléfono Oficina: " + userData.numOficina} name="numOfi" fullWidth margin="normal" value={formData.numOfi} onChange={handleChange} />
                  <TextField label={"extension: " + userData.extension} name="extension" fullWidth margin="normal" value={formData.extension} onChange={handleChange} InputProps={{ readOnly: true }}/>
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
