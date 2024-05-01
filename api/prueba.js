const express = require("express");
const sql = require("mssql");
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.static("uploads"));

var dbConfig = {
  user: "admin",
  password: "PnGJpG124",
  server: "databasedsw.cdcswyy0yssz.us-east-2.rds.amazonaws.com",
  port: 1433,
  database: "GETG",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

//Sección de leer excel para registrar estudiantes.
app.post("/insertEstudiantes", upload.single("archivo"), async (req, res) => {
  try {
    await poolConnect;
    const sede = req.body.sede;
    const archivo = req.file.path;
    if (!archivo) {
      return res.status(400).send("Error: Archivo no carga");
    }
    const workbook = xlsx.readFile(archivo); // lee el archivo en el servidor
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rango = xlsx.utils.decode_range(worksheet["!ref"]);
    var result = 1;
    for (let rowNum = rango.s.r + 2; rowNum <= rango.e.r; rowNum++) {
      const request = pool.request();
      request.input("inSede", sql.VarChar(64), sede);
      const cellrango = rango.s.c;
      var direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango });
      request.input("inNombre", sql.VarChar(32), worksheet[direccion]["v"]);
      direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 1 });
      request.input("inApellido1", sql.VarChar(32), worksheet[direccion]["v"]);
      direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 2 });
      request.input("inApellido2", sql.VarChar(32), worksheet[direccion]["v"]);
      direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 3 });
      var carnet = worksheet[direccion]["v"];
      request.input("inCarnet", sql.VarChar(64), carnet.toString());
      direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 4 });
      var celular = worksheet[direccion]["v"];
      request.input("inCelular", sql.VarChar(32), celular.toString());
      direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 5 });
      request.input("inCorreo", sql.VarChar(64), worksheet[direccion]["v"]);
      result = await request.execute("dbo.registrarEstudiante");
      if (result.returnValue !== 1) {
        return res.status(500).send({ Result: result.returnValue });
      }
    }
    res.json({ Result: result.returnValue });
  } catch {
    res.status.json({ Result: -30 });
  }
});
//Obtener excel de todos los estudiantes
app.get("/archivoAll", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const dataCA = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    const dataSJ = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    const dataLI = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    const dataAL = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    const dataSC = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    const result = await request.execute("dbo.obtDatosAllEst");
    if (result.returnValue === -1) {
      return req.json({ Result: result.returnValue });
    }
    const workbook = xlsx.utils.book_new();
    result.recordset.forEach((row) => {
      if (row.Sede === "CA") {
        dataCA.push([
          row.Nombre,
          row.Apellido1,
          row.Apellido2,
          row.carnet,
          row.celular,
          row.correo,
          row.Sede,
        ]);
      } else if (row.Sede === "SJ") {
        dataSJ.push([
          row.Nombre,
          row.Apellido1,
          row.Apellido2,
          row.carnet,
          row.celular,
          row.correo,
          row.Sede,
        ]);
      } else if (row.Sede === "LI") {
        dataLI.push([
          row.Nombre,
          row.Apellido1,
          row.Apellido2,
          row.carnet,
          row.celular,
          row.correo,
          row.Sede,
        ]);
      } else if (row.Sede === "AL") {
        dataAL.push([
          row.Nombre,
          row.Apellido1,
          row.Apellido2,
          row.carnet,
          row.celular,
          row.correo,
          row.Sede,
        ]);
      } else {
        dataSC.push([
          row.Nombre,
          row.Apellido1,
          row.Apellido2,
          row.carnet,
          row.celular,
          row.correo,
          row.Sede,
        ]);
      }
    });
    var worksheet = "";
    if (dataCA.length > 2) {
      worksheet = xlsx.utils.aoa_to_sheet(dataCA);
      xlsx.utils.book_append_sheet(workbook, worksheet, "CA");
    }
    if (dataSJ.length > 2) {
      worksheet = xlsx.utils.aoa_to_sheet(dataSJ);
      xlsx.utils.book_append_sheet(workbook, worksheet, "SJ");
    }
    if (dataLI.length > 2) {
      worksheet = xlsx.utils.aoa_to_sheet(dataLI);
      xlsx.utils.book_append_sheet(workbook, worksheet, "LI");
    }
    if (dataAL.length > 2) {
      worksheet = xlsx.utils.aoa_to_sheet(dataAL);
      xlsx.utils.book_append_sheet(workbook, worksheet, "AL");
    }
    if (dataSC.length > 2) {
      worksheet = xlsx.utils.aoa_to_sheet(dataSC);
      xlsx.utils.book_append_sheet(workbook, worksheet, "SC");
    }
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    res.setHeader("Content-Disposition", 'attachment; filename="datos.xlsx"');
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(excelBuffer);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener excel de la sede de
app.get("/archivoSede", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const profesor = req.query.profe;
    const datos = [
      ["Estudiantes"],
      [
        "Nombre",
        "Apellido1",
        "Apellidos2",
        "Carnet",
        "Celular",
        "Correo",
        "Sede",
      ],
    ];
    request.input("inIdUsuario", sql.Int, profesor.toString());
    request.output("outSede", sql.VarChar(32), "");
    const result = await request.execute("dbo.obtDatosEstSede");
    const sede = result.output.outSede;
    if (result.returnValue !== 0) {
      return res.json({ Result: result.returnValue });
    }
    const workbook = xlsx.utils.book_new();
    result.recordset.forEach((row) => {
      datos.push([
        row.Nombre,
        row.Apellido1,
        row.Apellido2,
        row.carnet,
        row.celular,
        row.correo,
        row.Sede,
      ]);
    });
    var worksheet = xlsx.utils.aoa_to_sheet(datos);
    xlsx.utils.book_append_sheet(workbook, worksheet, `${sede}`);
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="datos${sede}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Registrar Profesor
app.post("/registrarProfe", upload.single("imagen"), async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const celular = req.body.celular;
    const numOfi = req.body.numOfi;
    const extencion = req.body.exten;
    request.input("InCorreo", sql.VARCHAR(64), req.body.correo);
    request.input("InPassword", sql.VARCHAR(32), req.body.password);
    request.input("InSede", sql.VARCHAR(32), req.body.sede);
    request.input("InNombre", sql.VARCHAR(32), req.body.nombre);
    request.input("InApellido1", sql.VARCHAR(32), req.body.ap1);
    request.input("InApellido2", sql.VARCHAR(64), req.body.ap2);
    request.input("InCelular", sql.Int, celular.toString());
    request.input("InNumOficina", sql.Int, numOfi.toString());
    request.input("InExtension", sql.Int, extencion.toString());
    request.input("InImagen", sql.VARCHAR(128), req.file.path);
    const result = await request.execute("dbo.AgregarProfesor");
    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Registrar Actividad
app.post("/registrarAct", upload.single("afiche"), async (req, res) => {
  await poolConnect;
  const request = pool.request();
  const semana = req.body.semana;
  const modalidad = req.body.modalidad;
  const idPlanTrb = req.body.idPlTr;
  const cantRecord = req.body.cantRecord;
  var modalidadInt = 0;
  request.input("inSemana", sql.Int, semana);
  request.input("inNombre", sql.VarChar(128), req.body.nombre);
  request.input("inTipo", sql.VarChar(32), req.body.tipo);
  request.input("inFechaRealizacion", sql.Date, req.body.fechaReal);
  if (modalidad === "virtual") {
    modalidadInt = 1;
  }
  request.input("inModalida", sql.Int, modalidadInt);
  request.input("inEnlance", sql.VarChar(128), req.body.enlace);
  request.input("inAfiche", sql.VarChar(256), req.file.filename);
  request.input("inIdPlanTrb", sql.Int, idPlanTrb);
  request.input("inCantRecord", sql.Int, cantRecord);
  const result = await request.execute("dbo.agregarAct");
  res.json({ Result: result.returnValue });
});
//Registrar Equipo
app.post("/registrarEqui", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const anno = req.body.anno;
    request.input("inAnno", sql.Int, anno);
    const result = await request.execute("dbo.crearEquipo");
    res.json({ Result: result.returnValue, Error: result.recordset });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Registrar Plan de Trabajo
app.post("/registrarPlan", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("inIdEquipo", sql.Int, req.body.idEquipo);
    request.input("inPeriodo", sql.Int, req.body.periodo);
    const result = await request.execute("dbo.insertarPlan");
    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Actividad Realizada
app.post(
  "/actividadRealiza",
  upload.single("justificacion"),
  async (req, res) => {
    try {
      await poolConnect;
      var request = pool.request();
      request.input("inIdActividad", sql.Int, req.body.IdActiv);
      request.input("inJustificacion", sql.VarChar(256), req.file.filename);
      var result = await request.execute("dbo.InsertJustificacion");
      if (result.returnValue !== 1) {
        return res.status(400).json({ Result: result.returnValue });
      }
      request = pool.request();
      request.input("inIdActividad", sql.Int, req.body.IdActiv);
      request.input("inEstado", sql.VarChar(32), "REALIZADA");
      result = await request.execute("dbo.ActualizarEstado");
      res.json({ Result: result.returnValue });
    } catch {
      res.status(400).json({ Result: -30 });
    }
  }
);
//Actividad Cancelada
app.post(
  "/actividadCancelada",
  upload.single("justificacion"),
  async (req, res) => {
    try {
      await poolConnect;
      var request = pool.request();
      request.input("inIdActividad", sql.Int, req.body.IdActiv);
      request.input("inJustificacion", sql.VarChar(256), req.file.filename);
      var result = await request.execute("dbo.InsertJustificacion");
      if (result.returnValue !== 1) {
        return res.status(400).json({ Result: result.returnValue });
      }
      request = pool.request();
      request.input("inIdActividad", sql.Int, req.body.IdActiv);
      request.input("inEstado", sql.VarChar(32), "CANCELADA");
      result = await request.execute("dbo.ActualizarEstado");
      res.json({ Result: result.returnValue });
    } catch {
      res.status(400).json({ Result: -30 });
    }
  }
);
//Cambiar Estado de actividad
app.put("/cambiarEstado", upload.single("justificacion"), async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.body.IdActiv);
    request.input("inEstado", sql.VarChar(32), req.body.estado);
    result = await request.execute("dbo.ActualizarEstado");
    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Actualizar info estudiante testing
app.put("/actualizarEstudiante", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdUsEnc", sql.Int, req.body.idUsEnc);
    request.input("inIdEstudian", sql.Int, req.body.idEstudiante);
    request.input("inNombre", sql.VarChar(32), req.body.nombre);
    request.input("inApellido1", sql.VarChar(32), req.body.apellido1);
    request.input("inApellido2", sql.VarChar(32), req.body.apellido2);
    request.input("inCelular", sql.VarChar(32), req.body.celular);
    request.input("inCorreo", sql.VarChar(64), req.body.correo);

    var result = await request.execute("dbo.ActualizarEstudiante");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el ID.";
          break;
        case -2:
          errorMessage = "Sede erronea.";
          break;
        case -3:
          errorMessage = "Correo duplicado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Agregar profe testing
app.post("/agregarProfeEquipo", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdEquipo", sql.Int, req.body.idEquipo);
    request.input("inidProfesor", sql.Int, req.body.idProfesor);
    request.input("inidUsuario", sql.Int, req.body.idUsuario);

    var result = await request.execute("dbo.AgregarProfesorEquipo");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el ID.";
          break;
        case -2:
          errorMessage = "Ya existe profesor.";
          break;
        case -4:
          errorMessage = "Sede erronea.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Cambiar contraseña testing
app.put("/cambiarPassword", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inCorreo", sql.VarChar(64), req.body.correo);
    request.input("inNewPassword", sql.VarChar(32), req.body.newPassword);

    var result = await request.execute("dbo.CambiarPassword");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el usuario.";
          break;
        case -2:
          errorMessage = "Tiene que tener al menos 8 caracteres.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Dar de baja profesor testing
app.delete("/darDeBajaProfeEq", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdProfesor", sql.Int, req.body.idProfesor);
    request.input("inIdEquipo", sql.Int, req.body.idEquipo);
    request.input("inIdAsisAdminis", sql.Int, req.body.idAsisAdminis);

    var result = await request.execute("dbo.darDeBajaProfeEq");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el ID.";
          break;
        case -2:
          errorMessage = "Sede erronea.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Definir coordinador testing
app.put("/definirCoordinador", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdEquipo", sql.Int, req.body.idEquipo);
    request.input("inIdProfe", sql.Int, req.body.idProfe);
    request.input("inIdAsisAdmin", sql.Int, req.body.idAsisAdmin);

    var result = await request.execute("dbo.definirCoordinador");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el ID.";
          break;
        case -2:
          errorMessage = "No se encuentra asociado con la sede.";
          break;
        case -3:
          errorMessage = "Ya existe un coordinador.";
          break;
        case -4:
          errorMessage = "No se encuentra el profesor.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Iniciar sesion testing
app.post("/iniciarSesion", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inCorreo", sql.VarChar(64), req.body.correo);
    request.input("inPassword", sql.VarChar(32), req.body.password);

    var result = await request.execute("dbo.iniciarSesion");

    if (result.returnValue < 1) {
      //ID < 1 Se asume error.
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "Correo o contraseña invalido.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener comentarios testing
app.get("/obtenerComentarios", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.query.idActividad);

    var result = await request.execute("dbo.obtenerComentarios");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontraron los comentarios.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener datos de actvidad testing
app.get("/obtenerDatosActividad", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.query.idActividad);

    var result = await request.execute("dbo.obtenerDatosActividad");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la actividad.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener datos equipo testing
app.get("/obtenerDatosEquipo", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdEquipo", sql.Int, req.query.idEquipo);

    var result = await request.execute("dbo.obtenerDatosEquipo");

    if (result.returnValue < 0) {
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: "Error." });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener datos estudiante testing
app.get("/obtenerDatosEstudiante", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdUsuario", sql.Int, req.query.idUsuario);

    var result = await request.execute("dbo.obtenerDatosEstudiante");

    if (result.returnValue < 1) {
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: "Error." });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener datos est carnet testing
app.get("/obtenerDatosEstudianteCarnet", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdUsuario", sql.Int, req.query.idUsuario);

    var result = await request.execute("dbo.obtenerDatosEstudianteCarnet");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el usuario.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener datos profesor testing
app.get("/obtenerDatosProfeso", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdProfesor", sql.Int, req.query.idProfesor);

    var result = await request.execute("dbo.obtenerDatosProfeso");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el profesor.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener plan de trabajo testing
app.get("/obtenerPlanTrabajo", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdEquipo", sql.Int, req.query.idEquipo);

    var result = await request.execute("dbo.obtenerPlanTrabajo");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el equipo.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener estudiante testing
app.get("/obtenerEstudiante", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inSede", sql.VarChar(32), req.query.sede);
    request.input("inCarnet", sql.VarChar(64), req.query.carnet);

    var result = await request.execute("dbo.obtenerEstudiante");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la sede o el estudiante.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener pland de trabajo por año testing
app.get("/obtenerPlanTrabajoPorAnno", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inAnno", sql.Int, req.query.anno);

    var result = await request.execute("dbo.obtenerPlanTrabajoPorAnno");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el equipo para el año dado.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener profes de sede testing
app.get("/obtenerProfesCedes", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inSede", sql.VarChar(32), req.query.sede);

    var result = await request.execute("dbo.obtenerProfesCedes");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la sede.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener profes Enc testing
app.get("/obtenerProfesEnc", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.query.idActividad);

    var result = await request.execute("dbo.obtenerProfesEnc");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la actividad asociada.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener proxima actividad testing
app.get("/obtenerProxActividad", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inFechaAct", sql.Date, req.query.fechaAct);
    request.input("inIdPlanTraba", sql.Int, req.query.idPlanTraba);

    var result = await request.execute("dbo.obtenerProxActividad");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el plan de trabajo.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener todo los equipos testing
app.get("/obtTodoEquipos", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();

    var result = await request.execute("dbo.obtTodoEquipos");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Insertar comentario testing
app.post("/insertarComentario", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.body.idActividad);
    request.input("inComentario", sql.VarChar(256), req.body.comentario);
    request.input("InFecha", sql.Date, req.body.fecha);
    request.input("inIdProfesor", sql.Int, req.body.idProfesor);

    var result = await request.execute("dbo.spInsertarComentario");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la actividad asociada.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Insertar replica testing
app.post("/insertarReplica", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdActividad", sql.Int, req.body.idActividad);
    request.input("inComentario", sql.VarChar(256), req.body.comentario);
    request.input("InFecha", sql.Date, req.body.fecha);
    request.input("inIdProfesor", sql.Int, req.body.idProfesor);
    request.input("inIdComentario", sql.Int, req.body.idComentario);

    var result = await request.execute("dbo.spInsertarReplica");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro la actividad asociada.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Modificar datos profesor testing
app.put("/modificarDatoProfesor", upload.single("imagen"), async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdProfesor", sql.Int, req.body.idProfesor);
    request.input("inNombre", sql.VarChar(32), req.body.nombre);
    request.input("inCorreo", sql.VarChar(64), req.body.correo);
    request.input("inApellido1", sql.VarChar(32), req.body.ap1);
    request.input("inApellido2", sql.VarChar(32), req.body.ap2);
    request.input("inCelular", sql.Int, req.body.celular.toString());
    request.input("inNumOficina", sql.Int, req.body.numOfi.toString());
    request.input("inExtension", sql.Int, req.body.exten.toString());
    request.input("inImagen", sql.VarChar(128), req.file.path);
    request.input("inIdUsEnc", sql.Int, req.body.idUsEnc);

    var result = await request.execute("dbo.spModificarDatoProfesor");

    if (result.returnValue !== 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se encontro el ID.";
          break;
        case -2:
          errorMessage = "Las sedes no coinciden.";
          break;
        case -3:
          errorMessage = "Email duplicado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json({ Result: result.returnValue });
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
//Obtener actividades testing
app.get("/spObtenerActivi", async (req, res) => {
  try {
    await poolConnect;
    var request = pool.request();
    request.input("inIdPlanTrab", sql.Int, req.query.idPlanTrab);

    const result = await request.execute("dbo.spObtenerActivi");

    if (result.returnValue < 1) {
      let errorMessage;
      switch (result.returnValue) {
        case -1:
          errorMessage = "No se enccontro el plan de trabajo.";
          break;
        case -2:
          errorMessage = "Error inesperado.";
          break;
        default:
          errorMessage = "Error.";
      }
      return res
        .status(400)
        .json({ Result: result.returnValue, Message: errorMessage });
    }

    res.json(result.recordset);
  } catch {
    res.status(400).json({ Result: -30 });
  }
});
app.listen(3000);
console.log(`Server on port ${3000}`);

/*                    Conexion local
var dbConfig = {
  user: "sa",
  password: "1234",
  server: "ERRON",
  database: "GETG",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: "MSSQLSERVER",
  },
  port: 1433,
};
*/
/*                    Elemento de prueba
app.post("/archivo", upload.single("archivo"), (req, res) => {
  const archivoexcel = req.file.path;
  if (!archivoexcel) {
    return res.send("No se cargo los datos");
  }
  const workbook = xlsx.readFile(archivoexcel);

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = [];

  const rango = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let rowNum = rango.s.r + 2; rowNum <= rango.e.r; rowNum++) {
    const row = [];
    for (let colNum = rango.s.c; colNum <= rango.e.c; colNum++) {
      const cellAdress = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
      const cell = worksheet[cellAdress];
      if (cell) {
        console.log(cell["v"]);
      }
    }
    data.push(row);
  }
  res.send(data);
});
*/
/*                      Elementos de prueba
app.get("/pruebaExcel", (req, res) => {
  const data = [
    ["", "Estudiantes"],
    ["Edad", "Nombre"],
    [12, "Maicol"],
    [14, "Brand"],
  ];
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, "CA");
  const excelBuffer = xlsx.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  res.setHeader("Content-Disposition", 'attachment; filename="datos.xlsx"');
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(excelBuffer);
});

app.get("/", async (req, res) => {
  await poolConnect;
  const request= pool.request();
  const result = await request.query('SELECT * FROM dbo.Usuario')
  console.log(result)
  res.json(result.recordset)
});
*/
