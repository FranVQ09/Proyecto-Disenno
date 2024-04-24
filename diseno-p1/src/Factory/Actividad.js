class Actividad {
    constructor(nombre, tipo, fecha, semana, modalidad, enlance, afiche, estado, planTrabajo, recordatorios, responsables){
        this.nombre = nombre;
        this.tipo = tipo;
        this.fecha = fecha;
        this.semana = semana;
        this.modalidad = modalidad;
        this.enlance = enlance;
        this.afiche = afiche;
        this.estado = estado;
        this.planTrabajo = planTrabajo;
        this.recordatorios = recordatorios;
        this.responsables = responsables;
    }
}

module.exports = Actividad;