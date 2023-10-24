//Immportamos express y los cors
const app = require('express')
const cors = require ('cors')

//Creamos la clase para el servidor
class Server {
    constructor() {
        this.app= app()
        this.port= process.env.PORT
        this.middlewares()
        this.path={
            productos:'/api/productos'
        }
        this.rutas()
        
    }
    middlewares(){
        this.app.use(app.json())
        this.app.use(cors())
    }
    rutas(){
        this.app.use(this.path.productos,require('../routes/productos.routes'))
    }
    listening(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor escuchando al puerto ${this.port}`);
        })
    }
}
module.exports = Server