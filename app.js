const express = require("express");
//Utilizamos este archivo para simular datos de una base de datos 
const {infoCursos} =  require("./cursos.js");


//Creamos un proyecto con express, por medio de la funcion express
const app = express();

//Routes, se utilizan para usar de manera mas facil las rutas(path)
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas', routerMatematicas);

/*Manejando rutas
app: utilizar express
get: tipo de solicitud
"/". la ruta o path
y de ultima una funcion flecha para realizar cierta accion
*/
app.get("/",(req,res)=>{
    res.send("Primer servidor con Express");
});

//get con path diferente, obtener cursos 
app.get("/api/cursos", (req,res)=>{
    res.send(infoCursos);
});

routerProgramacion.get("/",(req,res)=>{
    res.send(infoCursos.programacion);
});

routerMatematicas.get("/",(req,res)=>{
    res.send(infoCursos.matematicas);
});

//para trabajar con parametros, se debe colocar : 
routerProgramacion.get("/:lenguaje",(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0)
    {
        return res.status(404).send(JSON.stringify("No encotrado"));
    }
    //Utilizando parametros de query, se ordenan los datos en base a una propiedad del objeto
    if(req.query.ordenar ==="vistas"){
        return res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas - a.vistas)))
    }
    res.send(JSON.stringify(resultados));

    
});

//Filtrando con paratros y el path matematicas
routerMatematicas.get("/:tema",(req, res)=>{
    const tema = req.params.tema;
    const resultados = infoCursos.matematicas.filter(item => item.tema === tema);
    if(resultados.length === 0){
       return res.status(404).send("No se encontraron resultados");
    }

    res.send(JSON.stringify(resultados));
});

//Filtrando con mas de dos parametros
routerProgramacion.get("/:lenguaje/:nivel", (req,res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = infoCursos.programacion.filter(item => item.lenguaje === lenguaje && item.nivel===nivel);
    if(resultados.indexOf === 0){
        return res.status(404).send("No se encontraron datos");
    }
    res.send(JSON.stringify(resultados));
});


/*process.env.PORT se utiliza para que en el despliegue, se utilice el puerto 
asignado por algun servcio en la nube o hosting*/
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO,()=>{
    console.log("Servidor escuchando, localhost:"+ PUERTO);
});



