//Importamos la conexion con la base de datos
const run = require('../database/dbConnection');

//Creamos el controlador para traer todos los productos
const getproductos = async(req,res)=>{
    //Traemos la conexion de la db junto y la manera de cerrarla
    const { database, closeConnection } = await run();
    try {
        db=database
        //Hacemos la busqueda de productos 
        const productos = await db.collection('Productos').find({}).toArray();
        res.status(200).json(productos)
        
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener productos');
    }finally{
        //Cerramos conexion
        if(db){
            await closeConnection()
        }
    }
      
}
//controlador para agregar productos
const agregarProducto= async(req,res)=>{
    const { database, closeConnection } = await run();
    try {
        db=database
        // TRAEMOS EL CUERPO DEL NUEVO PRODUCTO
        const producto = req.body
        //Creando nuevo producto
        const newProduct= await db.collection('Productos').insertOne(producto)
        res.status(200).json(newProduct)
        
    } catch (error) {
        res.status(201).send('Error al crear nuevo producto')
        console.error(error)
    }finally{
        await closeConnection()
    }
}
//Exportamos los controladores 
module.exports = {getproductos,agregarProducto}