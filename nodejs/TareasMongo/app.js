const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tareas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
  });
db.on('error', (error) => {
    console.error('Error de conexión a MongoDB:', error);
  });
// Definir el modelo de tarea
const Tarea = mongoose.model("Tarea", {
  titulo: String,
  descripcion: String,
  completada: Boolean,
});

// Ruta para obtener la lista de tareas
app.get("/tareas", async (req, res) => {
  // Implementa la lógica para obtener y devolver todas las tareas desde MongoDB
  try {
    const tareasList = await Tarea.find();
    res.status(200).json(tareasList);
  } catch (error) {
    console.error(error)
    res.status(204).send('No se pudo encontrar la lista de tareas')
  }
});

// Ruta para obtener una tarea por su ID
app.get("/tareas/:id", async (req, res) => {
    const id = req.params.id;
  // Implementa la lógica para obtener y devolver una tarea por su ID desde MongoDB
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
     return   res.send('Tarea no encontrada xd');
    }
    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(404).send('Tarea no encontrada');
  }
});

// Ruta para agregar una nueva tarea
app.post("/tareas", async (req, res) => {
  // Implementa la lógica para agregar una nueva tarea a MongoDB
  try {
    const newTareaData= req.body;
    const newTarea = new Tarea(newTareaData)
    await newTarea.save()
    res.status(200).json(newTarea);
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al postear tarea')
  }
});

// Ruta para actualizar la información de una tarea existente
app.put("/tareas/:id", async (req, res) => {
  // Implementa la lógica para actualizar una tarea existente en MongoDB
  const idTarea = req.params.id;
  const putTarea = req.body
  try {
    const tarea = await Tarea.findByIdAndUpdate(idTarea, putTarea, { new: true });
    res.status(201).json(tarea)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al actualizar tarea')
  }
});

// Ruta para eliminar una tarea por su ID
app.delete("/tareas/:id", async (req, res) => {
  // Implementa la lógica para eliminar una tarea por su ID desde MongoDB
  const idTarea=req.params.id
  try {
    const tareaBorrada = await Tarea.findByIdAndDelete(idTarea)
    res.status(200).json(tareaBorrada)

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al borrar la tarea')
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
