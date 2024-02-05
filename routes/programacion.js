const express = require("express");
const {programacion} = require("../datos/cursos").infoCursos;
const routerProgramacion = express.Router();

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

module.exports.routerProgramacion = routerProgramacion;
