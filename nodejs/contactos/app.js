const express = require('express');
const app = express();
app.use(express.json());

const contacts = [];

// Ruta para obtener la lista de contactos
app.get('/contacts', (req, res) => {
  // Devuelve la lista de contactos como respuesta
  res.status(200).json(contacts)
});

// Ruta para obtener un contacto por su ID
app.get('/contacts/:id', (req, res) => {
  // Obtiene el ID del contacto desde los parámetros de la URL
  const contactoid = req.params.id;
  // Encuentra el contacto con el ID proporcionado
  const contacto = contacts.find((t)=>t.id === contactoid);
  if (!contacto) {
    res.status(404).send('Contacto no encontrado')
  }
  // Devuelve el contacto como respuesta
  res.status(200).json(contacto)
});

// Ruta para agregar un nuevo contacto
app.post('/contacts', (req, res) => {
  // Recibe los datos del nuevo contacto desde el cuerpo de la solicitud
  const newContacto= req.body;
  // Agrega el nuevo contacto a la lista
  contacts.push(newContacto);
  // Devuelve el nuevo contacto como respuesta
  res.status(201).json(newContacto)
});

// Ruta para actualizar un contacto existente
app.put('/contacts/:id', (req, res) => {
  // Obtiene el ID del contacto desde los parámetros de la URL
  const contactoid = req.params.id;
 
  // Encuentra el contacto con el ID proporcionado
  const contacto = contacts.find((t)=>t.id === contactoid);

  if (!contacto) {
    return res.status(404).send('usuario no encontrado')  }
  // Actualiza el contacto con los datos recibidos en el cuerpo de la solicitud
  Object.assign(contacto, req.body);
  // Devuelve el contacto actualizado como respuesta
  res.status(201).json(contacto)
});

// Ruta para eliminar un contacto por su ID
app.delete('/contacts/:id', (req, res) => {
  // Obtiene el ID del contacto desde los parámetros de la URL
  const contactoid = req.params.id;
  // Encuentra el índice del contacto en la lista
  const contacto = contacts.findIndex((t)=> t.id===contactoid);
  if (contacto === -1) {
    return res.status(204).send('Usuario no encontrado')
  }
  // Elimina el contacto de la lista
  contacts.splice(contacto,1)
  // Devuelve un mensaje de confirmación
  res.status(200).send('Contacto eliminado')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
