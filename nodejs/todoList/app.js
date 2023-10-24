const express = require('express');
const app = express();
app.use(express.json());

const tasks = [];

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  // Devuelve la lista de tareas como respuesta
  res.json(tasks)
});

// Ruta para agregar una nueva tarea
app.post('/tasks', (req, res) => {
  // Recibe los datos de la nueva tarea desde el cuerpo de la solicitud
  const newTarea= req.body;
  // Agrega la nueva tarea a la lista
  tasks.push(newTarea);
  // Devuelve un mensaje de confirmación
  res.json(newTarea);
});

// Ruta para marcar una tarea como completada
app.put('/tasks/:id', (req, res) => {
  // Encuentra la tarea con el ID proporcionado
  const idTarea = req.params.id;
  // Marca la tarea como completada
  const tarea = tasks.find((t)=>idTarea===t.id)
 if (!tarea) {
  res.send('Tarea no encontrada')
 }
 tarea.completed = true;
  // Devuelve un mensaje de confirmación
  res.send('tarea completada')
});

// Ruta para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  // Encuentra la tarea con el ID proporcionado
  const idTarea = req.params.id;
  // Elimina la tarea de la lista
  const tarea = tasks.findIndex((t)=>t.id===idTarea)
  if (tarea === -1) {
    return res.status(404).send('Tarea no encontrada');
  }
  tasks.splice(tarea,1)
  // Devuelve un mensaje de confirmación
  res.send('tarea eliminada')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
