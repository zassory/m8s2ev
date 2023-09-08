const express = require('express');
const { response , request } = require('express');
const bodyParser = require("body-parser");

const listaJugadores = require('./data/jugadores');
let listaLibros = require('./data/data');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const models = require("./models");
const routes = require("./routes");

app.get('/api/libros', (req = request , res = response) => {
    try{        
        return res.status(200).json({
            listaLibros,
            success: true
        });
    }catch(err){
        return res.status(500).json(
            { 
                message: 'Error en el servidor, hable con el administrador',
                success: false 
            });
    }
});

app.post('/api/libros', (req = request, res = response) => {        
    try{
        const libroNuevo = req.body;
        
        listaLibros.push(libroNuevo);
                            
        res.status(201).json(libroNuevo);

    }catch(err){
        res.status(201).json({ message: "Error en el servidor" });
    }
});

app.delete('/api/libros/:id', (req = request , res = response) => {
    try{        
        const idEliminar = req.params.id;

        const listaActualizada = listaLibros.filter(libro => libro.isbn !== idEliminar);
        
        listaLibros = listaActualizada;
        
        res.status(201).json(listaLibros);
        //res.status(204).json({ message: "Libro eliminado correctamente" });
    }catch(err){
        return res.status(500).json({ mensaje: 'Error , conectese con el administrador' });
    }
})

app.put('/api/libros/:id', (req = request , res = response) => {
    try{        
        
        const id = req.params.id;
        const { titulo , autor } = req.body;

        const libroActualizar = listaLibros.find(libro => libro.isbn === id);
        

        if(libroActualizar){
             libroActualizar.titulo = titulo;
             libroActualizar.autor = autor;

             res.status(200).json({ message : "Actualizado correctamente" });
         }else{
            res.status(404).json({ message : "No se encontro" });
         }

    }catch(err){
        return res.status(500).json({ mensaje: 'Error , conectese con el administrador' });
    }
})


app.listen(PORT, ()=> {
    console.log(`La API JUGADORES se esta ejecutando en: http:localhost:${PORT}`);
});