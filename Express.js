const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar sesiones
app.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'HTML')));

// Ruta de registro de usuario
app.post('/users/register', (req, res) => {
    const { name, apellido, email, password } = req.body;

    fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error del servidor');
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const newUser = { name, apellido, email, password };
        users.push(newUser);

        fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return res.status(500).send('Error del servidor');
            }

            // Guardar información del usuario en sesión
            req.session.user = newUser;

            // Redirigir a la página de productos
            res.redirect('/html/productDetail.html');
        });
    });
});

// Ruta de autenticación (ejemplo)
app.post('/login', (req, res) => {
    req.session.user = { name: 'Nombre del Usuario' }; 
    res.redirect('/html/productDetail.html');
});

// Middleware para verificar sesión
app.use((req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

// Ruta de la página de productos (productDetail.html)
app.get('/html/productDetail.html', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, 'public', 'html', 'productDetail.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
