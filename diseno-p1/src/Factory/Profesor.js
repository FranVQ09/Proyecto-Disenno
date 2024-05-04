import Persistible from './Persistible';
import axios from 'axios';  

class Profesor extends Persistible {
    constructor(nombre, apellido1, apellido2, correo, password, sede, celular, oficina, extension, imagen) {
        super();
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.password = password;
        this.sede = sede;
        this.celular = celular;
        this.oficina = oficina;
        this.extension = extension;
        this.imagen = imagen;
    }

    almacenarBaseDatos(imagen) {
        /*console.log("Tipo de nombre:", typeof this.nombre);
        console.log("Tipo de ap1:", typeof this.ap1);
        console.log("Tipo de ap2:", typeof this.ap2);
        console.log("Tipo de correo:", typeof this.correo);
        console.log("Tipo de password:", typeof this.password);
        console.log("Tipo de numOfi:", typeof this.numOfi);
        console.log("Tipo de celular:", typeof this.sede);
        console.log("Tipo de sede:", typeof this.sede);
        console.log("Tipo de exten:", typeof this.exten);
        console.log("Tipo de imagen:", typeof this.imagen);*/
        const handleRegistrar = async () => {
            try {
                const formData = new FormData();
                formData.append('nombre', this.nombre);
                formData.append('ap1', this.apellido1);
                formData.append('ap2', this.apellido2);
                formData.append('correo', this.correo);
                formData.append('password', this.password);
                formData.append('numOfi', this.oficina);
                formData.append('celular', this.celular);
                formData.append('sede', this.sede);
                formData.append('exten', this.extension);
                formData.append('imagen', this.imagen);
    
                const response = await axios.post('http://3.14.65.142:3000/professors/registrarProfe', formData);
    
                alert('Profesor registrado exitosamente');
    
            } catch (error) {
                console.error('Error al registrar profesor: ', error);
                alert('Error al registrar profesor');
            }
        };

        handleRegistrar();
    }
}

export default Profesor;
