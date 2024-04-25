const express = require("express");
const sql = require("mssql");
const xlsx = require("xlsx");
const multer = require("multer");

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
/*
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
*/

var dbConfig = {
  user: "sa",
  password: "1234",
  server: "ERRON", 
  database: "GETG",
  options:{
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: 'MSSQLSERVER'
  },
  port: 1433
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

app.put("/prueba", async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const nombre = req.body["nombre"];
    console.log(`${nombre}`);
    request.input("InNombre", sql.VarChar(32), nombre);
    const result = await request.execute("CrearEstado");
    res.send(`Resultado:`);
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);
    res.status(500).send(err.message);
    pool.close()
  }
});
app.get("/obtenerEst", async (req, res) => {
  await poolConnect;
  const request = pool.request();

  const result = await request.query("SELECT * FROM dbo.Estado");
  console.log(result.recordset);
  res.json(result.recordset);
});
//Sección de leer excel
app.post("/insertEstudiantes", upload.single("archivo"), async(req, res) => {
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
  var result = 1 
  for (let rowNum = rango.s.r + 2; rowNum <= rango.e.r; rowNum++) {
    const request = pool.request();
    request.input("inSede", sql.VarChar(64), sede)
    const cellrango = rango.s.c;
    var direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango });
    request.input("inNombre", sql.VarChar(32), worksheet[direccion]["v"])
    direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 1 });
    request.input("inApellido1", sql.VarChar(32), worksheet[direccion]["v"])
    direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 2 });
    request.input("inApellido2", sql.VarChar(32), worksheet[direccion]["v"])
    direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 3 });
    var carnet= worksheet[direccion]["v"]
    request.input("inCarnet", sql.VarChar(64), carnet.toString())
    direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 4 });
    var celular= worksheet[direccion]["v"]
    request.input("inCelular", sql.VarChar(32), celular.toString())
    direccion = xlsx.utils.encode_cell({ r: rowNum, c: cellrango + 5 });
    request.input("inCorreo", sql.VarChar(64), worksheet[direccion]["v"])
    result = await request.execute("dbo.registrarEstudiante")
    if(result.returnValue !== 1){
      return res.status(500).send({'Result': result.returnValue})
    }
  }
  res.json({'Result': result.returnValue});
});
app.post("/", async (req, res) => {
  await poolConnect
  request= pool.request()
  request.input("inSede", sql.VarChar(32), "CA");
  request.input("inNombre", sql.VarChar(32), "Pedro");
  request.input("inApellido1", sql.VarChar(32), "Gerardo");
  request.input("inApellido2", sql.VARCHAR(32),"Martinica");
  request.input("inCarnet", sql.VarChar(64), toString(2022437529));
  request.input("inCelular", sql.VarChar(32), "2")
  request.input("inCorreo", sql.VarChar(64), "aaoriz@estudiantec.cr")
  const result = await request.execute('dbo.registrarEstudiante')
  res.json(result.recordset);
});
/*
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
app.get("/archivoAll", async (req, res)=> {
  await poolConnect;
  const request= pool.request();
  const dataCA = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  const dataSJ = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  const dataLI = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  const dataAL = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  const dataSC = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  const result= await request.execute('dbo.obtDatosAllEst');
  if (result.returnValue === -1){
    return req.json({'Result': result.returnValue})
  }
  const workbook = xlsx.utils.book_new();
  result.recordset.forEach(row=>{  
    if (row.Sede==="CA"){
      dataCA.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede])
    }else if (row.Sede==="SJ") {
      dataSJ.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede])
    } else if (row.Sede==="LI") {
      dataLI.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede])
    } else if (row.Sede==="AL") {
      dataAL.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede])
    } else {
      dataSC.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede])
    }
  });
  var worksheet = ""
  if (dataCA.length > 2){
    worksheet = xlsx.utils.aoa_to_sheet(dataCA)
    xlsx.utils.book_append_sheet(workbook, worksheet, "CA")
  }
  if (dataSJ.length > 2) {
    worksheet = xlsx.utils.aoa_to_sheet(dataSJ)
    xlsx.utils.book_append_sheet(workbook, worksheet, "SJ")
  }
  if (dataLI.length > 2) {
    worksheet = xlsx.utils.aoa_to_sheet(dataLI)
    xlsx.utils.book_append_sheet(workbook, worksheet, "LI")
  }
  if (dataAL.length > 2) {
    worksheet = xlsx.utils.aoa_to_sheet(dataAL)
    xlsx.utils.book_append_sheet(workbook, worksheet, "AL")
  } if (dataSC.length > 2) {
    worksheet = xlsx.utils.aoa_to_sheet(dataSC)
    xlsx.utils.book_append_sheet(workbook, worksheet, "SC")
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
});
app.get("/archivoSede", async (req, res)=> {
  await poolConnect;
  const request= pool.request();
  const profesor = req.query.profe;
  const datos = [['Estudiantes'], ['Nombre', 'Apellido1', 'Apellidos2', "Carnet", 'Celular', 'Correo', 'Sede']];
  request.input("inIdUsuario", sql.Int, profesor.toString());
  request.output("outSede", sql.VarChar(32), "");
  const result= await request.execute('dbo.obtDatosEstSede');
  const sede = result.output.outSede;
  if (result.returnValue !== 0){
    return res.json({'Result': result.returnValue});
  }
  const workbook = xlsx.utils.book_new();
  result.recordset.forEach(row=>{  
      datos.push([row.Nombre, row.Apellido1, row.Apellido2, row.carnet, row.celular, row.correo, row.Sede]);
  });
  var worksheet = xlsx.utils.aoa_to_sheet(datos);
  xlsx.utils.book_append_sheet(workbook, worksheet, `${sede}`);
  const excelBuffer = xlsx.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });
  res.setHeader("Content-Disposition", `attachment; filename="datos${sede}.xlsx"`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(excelBuffer);
});

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
  const result = await request.query('SELECT * FROM dbo.prueba')
  console.log(result)
  res.json(result.recordset)
});

app.listen(3000);
console.log(`Server on port ${3000}`);
