import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FormControl, Select, MenuItem, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function GestionarEquipo() {
    const [rows, setRows] = useState([{ id: 1, option: '' }]);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Simulando carga de opciones desde una base de datos
    useEffect(() => {
        // Aquí puedes hacer la llamada a tu base de datos para obtener las opciones
        // Por ahora, simulamos una lista de opciones
        const fetchedOptions = ['Opción 1', 'Opción 2', 'Opción 3'];
        setOptions(fetchedOptions);
    }, []);

    const handleDropdownChange = (event, id) => {
        const { value } = event.target;
        const newRows = [...rows];
        const index = newRows.findIndex((row) => row.id === id);
        newRows[index].option = value;

        // Agregar una nueva fila si se selecciona una opción en la última fila
        if (index === newRows.length - 1 || newRows.length === 1) {
            newRows.push({ id: newRows.length + 1, option: '' });
        }

        setRows(newRows);

        // Actualizar las opciones seleccionadas
        setSelectedOptions([...selectedOptions, value]);
    };

    const handleDeleteRow = (id) => {
        const deletedOption = rows.find((row) => row.id === id).option;
        const newSelectedOptions = selectedOptions.filter((option) => option !== deletedOption);
        setSelectedOptions(newSelectedOptions);

        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows.length === 0 ? [{ id: 1, option: '' }] : newRows);
    };

    const handleGuardarCambios = () => {
        const equipo = {
            opciones: selectedOptions,
            // Puedes agregar más propiedades si es necesario
        };
    
        // Guardar el equipo en una variable local o enviarlo a otra función según sea necesario
        console.log("Equipo guardado:", equipo);
        alert("Se guardo el equipo correctamente");

        setRows([{ id: 1, option: '' }]);
        setSelectedOptions([]);
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
            <h1 style={{ fontSize: "3.5vw", marginLeft:"-65vw", marginTop:"5vh", color: "#38340C"}}>
                Gestionar Equipo
            </h1>
            <Paper style={{ marginTop: '-2vh', width: '90vw', marginLeft: "2vw", borderRadius: '1rem' }}>
                <div style={{ backgroundColor: '#FFFCA4', borderRadius: '1rem', padding: '1rem' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor:'#38340C', color:'white'}}>Lista de Profesores</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:'white'}}>Coordinador</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:'white'}}>Dar de Baja</TableCell>
                                <TableCell style={{ backgroundColor:'#38340C', color:'white'}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor:'white'}}>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <FormControl>
                                            <Select value={row.option} onChange={(event) => handleDropdownChange(event, row.id)}>
                                                {options.map((option, index) => (
                                                    <MenuItem key={index} value={option} disabled={selectedOptions.includes(option)}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox color="primary" />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox color="primary" />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteRow(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
            <div style={{ display: 'flex', marginTop:"3vh" }}>
                <Button style={{ backgroundColor:"#38340C", color:"#FFFCA4", marginRight:"3vh"}} onClick={handleGuardarCambios}>
                    Guardar Cambios
                </Button>
                <Link to="/asistente">
                <Button style={{ backgroundColor: "#E2CE1A", border: "0.15vw solid #38340C", color:"#38340C"}}>Salir</Button>
                </Link>
            </div>
        </div>
    )
}

export default GestionarEquipo;