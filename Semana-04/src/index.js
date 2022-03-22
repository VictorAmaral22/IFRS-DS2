const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

/* Sempre que utilizamos app.use estamos incluindo um Middleware 

    Ele é uma função que executa entre o request e o endpoint final, permitinda que seja verificado, incluido, testado, etc... qualquer codigo, antes de "passar pra frente"
    next() function
*/

app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.path} as ${new Date()}`);
    // setTimeout(() => next(), 1000);
    next();
});

app.listen(port, () => {
    console.log(`Server funcionando!\nRodando na porta http://localhost:${port} ...`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/filmes');
});

const filmesRoutes = require('./routes/FilmesRoutes');
app.use('/filmes', filmesRoutes);

app.use('*', (req, res) => {
    return res.send(`
        <h1>Error 404</h1>
        <h3>Sorry, no found</h3>
        <a href="/filmes">Voltar</a>
    `);
});