class ObjetoFactory {
    static crearProfesor(nombre, apellido1, apellido2, correo, password, sede, celular, codigo, oficina, extension, imagen) {
      return new Profesor(nombre, apellido1, apellido2, correo, password, sede, celular, codigo, oficina, extension, imagen);
    }
  
    static crearEstudiante(nombre, apellido1, apellido2, carnet, correo, password, celular, sede) {
      return new Estudiante(nombre, apellido1, apellido2, carnet, correo, password, celular, sede);
    }
  
    static crearActividad(nombre, tipo, fecha, semana, modalidad, enlace, afiche, estado, planTrabajo, recordatorios, responsables) {
      return new Actividad(nombre, tipo, fecha, semana, modalidad, enlace, afiche, estado, planTrabajo, recordatorios, responsables);
    }
  
    static crearEquipoGuia() {
      return new EquipoGuia();
    }
  
    static crearPlanDeActividades() {
      return new PlanDeActividades();
    }
  }