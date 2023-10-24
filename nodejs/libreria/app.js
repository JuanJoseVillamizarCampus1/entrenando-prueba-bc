//importamos express
const express = require('express');
const app = express();
app.use(express.json());

//Array que almacenara los datos
const library=[];

//Traer todos los libros
app.get('/library',(req,res)=>{
    //Enviamos respuesta de los libros obtenidos
    res.status(200).json(library)
})

//Obtener libro por id
app.get('/library/:id',(req,res)=>{
    //Obtenemos el id del libro
    const lidroid= req.params.id;
    //buscamos dentro del array el por el id
    const libro = library.find((t)=> t.id === lidroid);
    //Verificamos que el libro exista
    if (!libro) {
        res.status(404).send('Libro no encontrado');
    }
    //Enviamos el libro como respuesta
    res.status(200).json(libro)
});

//Agregar un nuevo libro
app.post('/library',(req,res)=>{
    //Traemos los parametros del cuerpo de la solicitud
    const newLibro = req.body;
    //Guardamos el nuevo libro 
    library.push(newLibro);
    //Mostramos el libro agregado como respuesta
    res.json(newLibro);
})

//Editar o actualizar un libro
app.put('/library/:id',(req,res)=>{
    //Traemos el id del libro
    const libroId= req.params.id;
    //Traemos los datos a actualizar
    const newLibro = req.body
    //Buscamos el libro 
    const libro = library.find((t)=>t.id === libroId);
    //Verificamos que el libro exista
    if (!libro) {
        return res.status(404).send('Libro no encontrado')
    }
    //Actualizamose el libro
    Object.assign(libro, newLibro)
    //Enviamos la respuesta del servidor
    res.json(newLibro)
})
//Eliminar libro
app.delete('/library/:id',(req,res)=>{
    //traemos el id del libro 
    const libroId = req.params.id;
    //Buscamos el libro 
    const libro = library.findIndex((t)=> t.id === libroId);
    //Verificamos que el libro exista
    if (libro===-1) {
        return res.send('Libro no encontrado');
    }
    //Borramos el libro
    library.splice(libro,1)
    res.send('Libro borrado')
})

const port = 3000;

app.listen(port,()=>{
    console.log(`Servidor escuchando el puerto:${port}`);
})