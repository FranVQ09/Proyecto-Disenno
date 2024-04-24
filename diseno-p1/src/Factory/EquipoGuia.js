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

    modificarProfesor(profesor){
        const indice = this.profesores.findIndex(profesor => profesor.carnet === carnet); // Encuentra el índice del estudiante con el carnet dado
        if(indice != -1){
            this.profesores[indice] = profesor; // Reemplaza el los datos antiguos por los nuevos
        } else {
            alert("No se encontró el profesor");
        }
    }

    obtenerProfesores(){
        return this.profesores;
    }
}

module.exports = EquipoGuia;