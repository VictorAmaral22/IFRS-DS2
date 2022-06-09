const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'))

app.get('/', async (req, res) => {
    // pega o filme
    /*const numero = Math.floor(1+Math.random()*5.99);
    try {
        const responseTxt = await axios.get(`https://swapi.dev/api/films/${numero}`);
        res.json({film: responseTxt.data});
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }*/
    res.redirect('index.html');
});

const filmsRoutes = require('./routes/films-routes');
app.use('/films', filmsRoutes);

app.get('/characters', async (req, res) => {

});

app.get('/ships', async (req, res) => {

});

app.get('/veichles', async (req, res) => {

});

app.get('/species', async (req, res) => {

});

app.get('/planets', async (req, res) => {

});

app.listen(3000, () => console.log("Escutando em http://localhost:3000"));