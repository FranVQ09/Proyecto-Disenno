class Profesor{
    constructor(nombre, apellido1, apellido2, correo, password, sede, celular, codigo, oficina, extension, imagen){
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.password = password;
        this.sede = sede;
        this.celular = celular;
        this.codigo = codigo;
        this.oficina = oficina;
        this.extension = extension;
        this.imagen = imagen;
    }

    modificarProfesor(profesor){
        const indice = this.profesores.findIndex(profesor => profesor.carnet === carnet); // Encuentra el índice del estudiante con el carnet dado
        if(indice != -1){
            this.profesores[indice] = profesor; // Reemplaza el los datos antiguos por los nuevos
        } else {
            alert("No se encontró el profesor");
        }
    }
}

module.exports = Profesor;

