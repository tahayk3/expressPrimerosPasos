const express = require("express");
const {programacion} = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();

//Permite procesar y trabajar el cuerpo de la solicitud , en formato json
//Se le conoce como Middleware, es un intermediario 
routerProgramacion.use(express.json());

routerProgramacion.get("/",(req,res)=>{
    res.send(programacion);
});

//para trabajar con parametros, se debe colocar : 
routerProgramacion.get("/:lenguaje",(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
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

//Filtrando con mas de dos parametros
routerProgramacion.get("/:lenguaje/:nivel", (req,res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(item => item.lenguaje === lenguaje && item.nivel===nivel);
    if(resultados.indexOf === 0){
        return res.status(404).send("No se encontraron datos");
    }
    res.send(JSON.stringify(resultados));
});

routerProgramacion.post("/",(req,res)=>{
    //Con esto se extrae el cuerpo de la solicitud
    let cursoNuevo=req.body;
    //Se agrega el curso nuevo al array
    programacion.push(cursoNuevo);
    //Se envia el array modificado
    res.send(JSON.stringify(programacion));
});


//Actualiza pero hay que enviar el objeto completo
routerProgramacion.put("/:id",(req,res)=>{
    //Con esto se extrae el cuerpo de la solicitud
    const cursoActualizado = req.body;
    //Se extrae el parametro id
    const id = req.params.id;
    //Se utiliza para encontrar el elemento en base a un criterio
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice>=0){
        programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion));
});

//Acualiza y no es necesario enviar el objeto completo
routerProgramacion.patch("/:id",(req,res)=>{
    const infoNueva = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice>=0){
        const cursoModificar = programacion[indice];
        //puede modificar solomente unas propiedades del objeto
        Object.assign(cursoModificar,infoNueva);
    }
    res.send(JSON.stringify(programacion));
});

//Eliminar 
routerProgramacion.delete("/:id", (req,res)=>{
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice>=0){
        programacion.splice(indice,1);
    }
    res.send(JSON.stringify(programacion));
});

module.exports.routerProgramacion = routerProgramacion;
