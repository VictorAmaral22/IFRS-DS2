const crypto = require('crypto')
const ExerciciosRepository = require('./repositorio-memory')

class ExerciciosController {

    constructor() {
        this.repository = new ExerciciosRepository();
    }

    async create(req, res) {
        console.log('CRIANDO UMA QUESTÃO');
        const ex = {
            id: crypto.randomUUID(),
            date: new Date(),
            ...req.body,
            disciplina: req.body.disciplina.toUpperCase()
        }

        this.repository.save(ex)

        return res.json(ex)
    }

    async random(req, res) {
        console.log('QUESTÃO ALEATÓRIA');
        return res.json({
            id: "12",
        })
    }

    async list(req, res) {
        const { disciplina } = req.query;
        const list = this.repository.list(disciplina+"".toUpperCase())
        return res.json(list);
    }

    async detail(req, res) {
        const { id } = req.params;
        const ex = this.repository.detail(id+"");

        return res.json(ex);
    }
}

module.exports = ExerciciosController;