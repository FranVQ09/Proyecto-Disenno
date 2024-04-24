class Estudiante {
    constructor(nombre, apellido1, apellido2, carnet, correo, password, celular, sede) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.carnet = carnet;
        this.correo = correo;
        this.password = password;
        this.celular = celular;
        this.sede = sede;
    }
}

module.exports = Estudiante;