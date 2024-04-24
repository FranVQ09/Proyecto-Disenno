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
}

module.exports = Profesor;