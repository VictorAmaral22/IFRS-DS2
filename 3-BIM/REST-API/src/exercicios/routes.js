const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const ExerciciosController = require('./controller');
const controller = new ExerciciosController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/random', (req, res) => controller.random(req, res));
router.get('/list', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.detail(req, res));
router.post('/:id', isAuth, (req, res) => controller.answer(req, res));
router.get('/:id/respostas', (req, res) => controller.allAnswers(req, res));

module.exports = router;