import React, { useState, useEffect } from 'react'
import { Paper, TextField, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

function ModificarPerfilEstudiante() {
  const [formData, setFormData] = useState({
    nombre: '',
    carnet: '',
    correo: '',
    telefono: '',
    sede: '',
  })
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [datosEstudiante, setDatosEstudiante] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      const detalles = await axios.get('http://18.223.33.212:3000/students/obtDetailEstudiante', {
        params: {
          idUsuario: userId
        }
      });
      setDatosEstudiante(detalles.data[0]);
    }
    fetchData();
  }, [userId]);

  const sedeMap = {
    CA: 'Cartago',
    SJ: 'San José',
    LI: 'Limón',
    AL: 'Alajuela',
    SC: 'San Carlos',
  }

  const sedeDisplayName = sedeMap[datosEstudiante.Sede] || datosEstudiante.Sede || '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg, image/jpg',
    onDrop,
  });

  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      if (image !== null) {
        const formDataToSend = new FormData();
        formDataToSend.append('idEstudiante', userId);
        formDataToSend.append('celular', formData.telefono);
        formDataToSend.append('imagen', image);
        
        const response = await axios.put('http://18.223.33.212:3000/students/modificarDatosEst', formDataToSend);
        alert("Perfil de estudiante modificado con imagen.");
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('idEstudiante', userId);
        formDataToSend.append('celular', formData.telefono);

        const response = await axios.put('http://18.223.33.212:3000/students/modificarDatosEstSinImagen', formDataToSend);
        alert("Perfil de estudiante modificado sin imagen.");
      }

      // Recargar la página
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al modificar el perfil. Por favor, intenta de nuevo.');
    }
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
          marginLeft: '-45vw',
          marginTop: '5vh',
        }}
      >
        Modificar Perfil de Estudiante
      </h1>
      <Paper elevation={3} style={{ padding: '2vw', borderRadius: '1vw', width: '80vw', backgroundColor: "#EEE1B0" }}>
        <h2 style={{ color: '#38340C', marginTop: '1vh' }}>Información Personal</h2>
        <Typography variant="body1" style={{ color: '#38340C' }}>NOTA: Solo puede modificar su número de teléfono!</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label={"Nombre: " + datosEstudiante.Nombre} name="nombre" fullWidth margin="normal" value={formData.nombre} disabled />
          <TextField label={"Carnet: " + datosEstudiante.Carnet} name="carnet" fullWidth margin="normal" value={formData.carnet} disabled />
          <TextField label={"Correo: " + datosEstudiante.Correo} name="correo" fullWidth margin="normal" value={formData.correo} disabled />
          <TextField label={"Teléfono: " + datosEstudiante.Celular} name="telefono" fullWidth margin="normal" value={formData.telefono} onChange={handleChange} />
          <TextField label={"Sede: " + sedeDisplayName} name="sede" fullWidth margin="normal" value={formData.sede} disabled />
          {imagePreview ? (
            <div>
              <img src={imagePreview} alt="Foto de perfil" style={{ width: '30%', borderRadius: '1vw', marginTop: '2vh', marginLeft: "29vw" }} />
              <Button variant="contained" color="secondary" onClick={handleDeleteImage} style={{ marginTop: '1vh', width: "20vw", marginLeft: "30.5vw", backgroundColor: "#E2CE1A", color: "black", border: "0.15vw solid #38340C" }}>Eliminar Foto</Button>
            </div>
          ) : (
            <div style={{ width: "50vw", marginLeft: "15vw", marginTop: '2vh', border: '2px dashed #38340C', borderRadius: '1vw', padding: '2vw' }} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body1">Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen.</Typography>
              <Typography variant="body1">NOTA: La Imagen debe ser formato PNG</Typography>
            </div>
          )}
          <Button type="submit" style={{ backgroundColor: '#38340C', color: '#EEE1B0', marginTop: '2vh', padding: '1vh', width: '10vw', marginLeft: "35.5vw" }}>Modificar</Button>
        </form>
      </Paper>
      <div style={{ marginTop: "3vh", marginBottom: "3vh" }}>
        <Link to="/estudiante">
          <Button style={{ backgroundColor: "#E2CE1A", border: "0.15vw solid #38340C", color: "#38340C", marginLeft: "1vw", padding: "1vh", width: "10vw" }}>Salir</Button>
        </Link>
      </div>
    </div>
  )
}

export default ModificarPerfilEstudiante
