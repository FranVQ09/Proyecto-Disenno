class PlanDeActividades {
    constructor() {
        this.actividades = [];
    }

    agregarActividad(actividad) {
        this.actividades.push(actividad);
    }

    eliminarActividad(actividad) {
        this.actividades = this.actividades.filter(act => act.nombre !== actividad.nombre);
    }

    publicarActividad(actividad) {
        const index = this.actividades.findIndex(act => act.nombre === actividad.nombre);

        if(index != -1){
            this.actividades[index].estado = "Publicada";
        } else {
            alert("No se encontró la actividad");
        }
    }

    marcarActividadRealizada(actividad){
        const index = this.actividades.findIndex(act => act.nombre === actividad.nombre);

        if(index != -1){
            this.actividades[index].estado = "Realizada";
        } else {
            alert("No se encontró la actividad");
        }
    }

    cancelarActividad(actividad){
        const index = this.actividades.findIndex(act => act.nombre === actividad.nombre);

        if(index != -1){
            this.actividades[index].estado = "Cancelada";
        } else {
            alert("No se encontró la actividad");
        }
    }

    obtenerPlan() {
        return this.actividades;
    }
}

module.exports = PlanDeActividades;