const express = require('express');
const app = express();
const port = 3000;

// Simulación de una base de datos de usuarios
const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', profileImage: '/images/juan.jpg' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', profileImage: '/images/ana.jpg' },
    // Agrega más usuarios según sea necesario
];

// Endpoint para obtener la lista completa de usuarios
app.get('/api/users/', (req, res) => {
    const response = {
        count: users.length,
        users: users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            detail: `/api/users/${user.id}`
        }))
    };
    res.json(response);
});

// Endpoint para obtener detalles de un usuario en particular
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const response = {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
    };

    res.json(response);
});

// Ruta raíz para probar
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/miapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

