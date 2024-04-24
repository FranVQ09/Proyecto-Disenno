class PlanDeActividades {
    constructor() {
        this.actividades = [];
    }

    agregarActividad(actividad) {
        this.actividades.push(actividad);
    }

    eliminarActividad(actividad) {
        this.actividades = this.actividades.filter(actividad => actividad.nombre !== nombre);
    }

    obtenerPlan() {
        return this.actividades;
    }
}

module.exports = PlanDeActividades;