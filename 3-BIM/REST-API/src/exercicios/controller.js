// const ExerciciosRepository = require('./repositorio-memory');
const ExerciciosRepository = require('./repositorio-sql');
const crypto = require('crypto');
const { Resposta } = require('../usuarios/resposta-model');

class ExerciciosController {

    constructor() {
        this.repository = new ExerciciosRepository();
    }

    async create(req, res) {
        console.log("CRIANDO UMA NOVA QUESTAO");
        const ex = {  
            id: crypto.randomUUID(),
            ...req.body,
            disciplina: req.body.disciplina.toUpperCase()
        };

        await this.repository.save(ex);
        
        return res.json({
            ex
        });
    }

    async random(req, res) {
        const disciplina = await this.repository.random();
        return res.json(disciplina);
    }

    async list(req, res) {
        const disciplina = req.query.disciplina.toUpperCase();
        const listagem = await this.repository.list(disciplina);
        console.log(listagem)
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const exercicio = await this.repository.detail(id);
        
        // DETALHES DE UM EXERCICICO
            // * QUANTIDADE TOTAL DE RESPOSTAS
            // * QUANTOS USUÁRIOS ACERTARAM O EXERCÍCIO

        return res.json(exercicio);
    }

    async answer(req, res) {
        const { id } = req.params;
        const { alternativa } = req.body;

        const resposta = await Resposta.findOne({ 
            where: {
                id_exercicio: id, 
                usuarioEmail: req.user.email
            }
        })

        // CRIAR UMA ROTA PARA O USUÁRIO RESPONDER UMA PERGUNTA
            // * SALVAR NA TABELA DE RESPOSTAS O ID DO EXERCICICO, EMAIL DO USUARIO E A RESPOSTA
            // * CASO O USUARIO JÁ TENHA RESPONDIDO, DEVE SER FEITO UM UPDATE
        if(!alternativa){
            return res.status(400).json('RESPOSTA O CORNO, CADÊEEE')
        } else {
            if(!resposta){
                const novaResposta = await Resposta.create({
                    id_exercicio: id, 
                    usuarioEmail: req.user.email,
                    alternativa: alternativa
                })
                return res.json(novaResposta);
            } else {
                const novaResposta = await Resposta.update(
                    { alternativa: alternativa },
                    { where: { id_exercicio: id, usuarioEmail: req.user.email }}
                )

                return res.json(novaResposta);
            }
        }

    }

    async allAnswers(req, res) {
        const { id } = req.params;

        const respostas = await Resposta.findAll({
            id_exercicio: id
        })

        return res.json(respostas);
    }
}


module.exports = ExerciciosController;