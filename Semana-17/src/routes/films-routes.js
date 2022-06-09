const { Router } = require('express');
const routes = Router();
const { getAllMovies, getCharacter } = require('../SWAPI/swapi-integration');

routes.get('/', async (req, res) => {
    let films = await getAllMovies();
    let newFilms = [];
    let newChars = [];
    films.results.map((film) => {
        film.characters.map(async (char) => {
            let resChar = await getCharacter(char);
            console.log('resChar ',resChar)
            newChars.push(resChar);
        })
        console.log('newChars ',newChars);
        film.characters = newChars;
        newFilms.push(film);
    })
    films.results = newFilms;
    console.log('films ',films)
    return res.render('films', {films: films})
});

routes.get('/:id', (req, res) => {});

routes.get('/search', (req, res) => {});

module.exports = routes;