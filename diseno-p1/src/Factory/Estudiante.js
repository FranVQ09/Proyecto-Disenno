class Estudiante extends Persistible{
    constructor(nombre, apellido1, apellido2, carnet, correo, password, celular, sede) {
        super();
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.carnet = carnet;
        this.correo = correo;
        this.password = password;
        this.celular = celular;
        this.sede = sede;
    }

    modificarInformacion(estudiante){
        const indice = this.estudiantes.findIndex(estudiante => estudiante.carnet === carnet);
        if(indice != -1){
            this.estudiantes[indice] = estudiante;
        } else {
            alert("No se encontró el estudiante");
        }
    }

    almacenarBaseDatos() {
        
    }
}

module.exports = Estudiante;