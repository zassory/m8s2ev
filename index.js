const express = require('express');
const { response , request } = require('express');

const listaJugadores = require('./data/jugadores');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/api/jugadores', (req,res) => {
    res.send(listaJugadores);
});

app.get('/api/jugadores/:id', (req,res) => {
    let { id } = req.params;    
    id = parseInt(id);
    try{                
        let jugador = listaJugadores.find(jugador => jugador.id === id);        
        
        if(!jugador) return res.status(400).json({message:"Jugador no encontrado",err});
        
        return res.status(200).json({
            data: jugador
        });                   
    } catch(err){
        res.status(400).json({
            message: "No encontrado",
            err
        });
    } finally{
        console.log('Consulta terminada');
    }
});

app.post('/api/jugadores',(req = request,res = response) => {
    
    const jugadorNuevo = req.body;    
    
    const existeNombre = listaJugadores.find(jugador => jugador.nombre === jugadorNuevo.nombre);
    
    try{
        if(existeNombre){
             res.status(409).json({ mensaje : 'Ya existe un elemento con ese nombre'});
             return;
         }

         const uuid = require('uuid');
         jugadorNuevo.id = uuid.v4();    
         listaJugadores.push(jugadorNuevo);

         return res.status(201).json(jugadorNuevo);
    }catch(err){
        return res.status(500).json({message: "Error en el servidor, hable con el administrador"});
    }finally{
        console.log('Insercion finalizada');
    }
    
});


app.listen(PORT, ()=> {
    console.log(`La API JUGADORES se esta ejecutando en: http:localhost:${PORT}`);
});