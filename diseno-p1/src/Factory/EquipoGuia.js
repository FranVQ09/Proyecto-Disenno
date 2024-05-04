class EquipoGuia extends Persistible{
    constructor(){
        super();
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

    almacenarBaseDatos() {
        
    }
}

module.exports = EquipoGuia;