const  { Router } = require('express');
const routes = Router();
const { FilmesController } = require('../controllers/filmesController');
const filmesController = new FilmesController();

routes.get('/', filmesController.listar);

routes.get('/:id', filmesController.detalhar);

routes.post('/', filmesController.cadastrar);

module.exports = routes;