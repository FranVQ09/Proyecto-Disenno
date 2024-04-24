class EquipoGuia {
    constructor(){
        this.profesores = []; 
    }

    agregarProfesor(profesor){
        this.profesores.push(profesor);
    }

    eliminarProfesor(carnet){
        this.profesores = this.profesores.filter(profesor => profesor.carnet !== carnet);
    }

    obtenerProfesores(){
        return this.profesores;
    }
}

module.exports = EquipoGuia;