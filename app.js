const express = require("express");
//Utilizamos este archivo para simular datos de una base de datos 
const {infoCursos} =  require("./cursos.js");

//Creamos un proyecto con express, por medio de la funcion express
const app = express();

/*Manejando rutas
app: utilizar express
get: tipo de solicitud
"/". la ruta o path
y de ultima una funcion flecha para realizar cierta accion
*/
app.get("/",(req,res)=>{
    res.send("Primer servidor con Express");
});

/*process.env.PORT se utiliza para que en el despliegue, se utilice el puerto 
asignado por algun servcio en la nube o hosting*/
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO,()=>{
    console.log("Servidor escuchando, localhost:"+ PUERTO);
});



