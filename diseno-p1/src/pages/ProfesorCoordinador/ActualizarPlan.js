import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

function ActualizarPlan() {
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
                <Link href="/crearPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '20vh', marginLeft: "4vw", whiteSpace:"nowrap"}}>Crear Plan</Link>
                <Link href="/actualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#E2CE1A', marginTop: '2vh', marginLeft: "2.3vw", borderRadius:'1vw'}}>Actualizar Plan</Link>
                <Link href="/visualizarPlan" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor:'#38340C', marginTop: '2vh', marginLeft: "2.3vw", whiteSpace:"nowrap"}}>Visualizar Plan</Link>
                <Link href="/profesorCoordinador" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5vw', textDecoration: 'none', padding: '1vh', display: 'inline-block', backgroundColor: "#38340C", marginTop:"35vh", marginLeft:"6vw" }}>Salir</Link>
            </div>
            <div style={{ width:"70vw", marginTop: '5vh', marginLeft: '40vw', marginRight: '20vw' }}>
                <Paper elevation={3} style={{ padding: '2vh', backgroundColor:"#EEE1B0", borderTopLeftRadius:"1vw", borderTopRightRadius:"1vw" }}>
                    <h1 style={{ color: '#38340C', fontSize: '1.5vw', textAlign: 'left', marginBottom: '3vh' }}>Crear Plan</h1>
                    <form>
                        <TextField
                            label="Nombre de la actividad"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Período lectivo"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                            <button type="submit" style={{ padding: '1vh 2vw', backgroundColor: '#38340C', color: 'white', border: 'none', borderRadius: '0.5vw', cursor: 'pointer', fontSize: '0.8vw' }}>Crear</button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default ActualizarPlan;