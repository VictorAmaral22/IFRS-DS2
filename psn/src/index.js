
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true
}));

// PARSER DAS REQUISIÇOES COM JSON
app.use(express.json());

app.use(express.static('public'));

/* 
SEMPRE QUE UTILIZAMOS APP.USE ESTAMOS INCLUINDO UM MIDDLEWARE !!!

MIDDLEWARE É UMA FUNÇÃO QUE EXECUTA ENTRE O REQUEST E O ENDPOINT FINAL, PERMITINDO QUE SEJA VERIFICADO, INCLUIDO, TESTADO, QUALQUER CÓDIGO, ANTES DE "PASSAR PARA FRENTE" NEXT() FUNCTION
*/
app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);

    // atrasando o usuario kkkkk
    // setTimeout(() => next(), 1000);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/games');
});

const gamesRoutes = require('./routes/games-routes');
app.use('/games', gamesRoutes);

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/games">VOLTAR</a>
    `);
})

app.listen(3000, () => console.log('Server iniciado na porta 3000'));