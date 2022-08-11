const { Router } = require('express');

// IMPORTAÇÃO DO FILMES-CONTROLLER
// CONST NOME-RECURSO = REQUIRE(ARQUIVO);
const { GamesController } = require('../controllers/games-controller');

// const Router = require('express').Router

// const express = require('express')
// const Router = express.Router

// O NOSSO ROUTER COMEÇA COM /filmes
const routes = Router();

const gamesController = new GamesController();

routes.get('/', gamesController.listar);

routes.get('/:id', gamesController.detalhar);

routes.post('/', gamesController.cadastrar);

routes.get('/admin/deletarGame/:id', gamesController.deletar);



module.exports = routes;