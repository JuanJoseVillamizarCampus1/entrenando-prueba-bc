//Importamos la funcion de mongo para conectarnos
const {MongoClient} = require("mongodb");

//Traemos el enlace de la DB
const uri=process.env.URI

//Creamos la conexiopn
const client = new MongoClient(uri)

//Funcion que nos conecta a la db
async function run (){
    try {
       await client.connect()
       const database = client.db('Tienda');
       //Cerrar conexion con la DB
       const closeConnection = async () => {
        await client.close();
      };
      //Retornamos la DB y la funcion para cerrar
       return {database,closeConnection}
    } catch(error)  {
        console.error("Error al conectar a la base de datos:", error);
        throw error;
    }
}
module.exports = run