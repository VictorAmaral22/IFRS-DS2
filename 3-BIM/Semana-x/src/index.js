const express = require('express');
const app = express();

// Inclui um Middleware para fazer um parser das requisições com JSON no seu body
app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    return res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        timestamp: new Date(),
        ...req.body
    };
    users.push(newUser);

    return res.json(newUser);
});

app.put('/users/:name/hobbies', (req, res) => {
    const { name } = req.params;
    const { hobbies } = req.body;

    const user = users.find(user => user.name == name);

    user.hobbies = hobbies;
    user.lastUpdateAt = new Date();

    return res.json({ user: user });
});

app.delete('/users/:name', (req, res) => {
    const { name } = req.params;
    users = users.filter(user => user.name != name);
    return res.status(201);
});


app.get('/', (req, res) => {
    return res.json({
        system: {
            nome: 'Vitão da massa',
            version: '0.0.1-SNAPSHOT',
        }, 
        users: users
    });
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));