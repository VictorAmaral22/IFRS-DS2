let filmes = [];

const {
    nanoid
} = require('nanoid');
const {
    dbConfig
} = require('../config/connection-db');
const {
    FilmeDAO,
    Filme
} = require('../models/filme');

class FilmesController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({
            session: req.session
        });
        // LISTAGEM DE TODOS OS FILMES MOSTRANDO O NOME
        // O NOME É CLICAVEL E REDIRECIONA PARA O DETALHAR DO FILME
        // let html = '';
        // filmes.forEach(filme => {
        //     html += `<a href="/filmes/${filme.id}">${filme.nome}</a><br></br>`
        // })

        // return res.send(html);
        const result = await dbConfig.query("SELECT * FROM filmes");
        console.log("result ", result);
        return res.render('listagem', {
            user: req.session.user,
            filmes: filmes,
            result: result.rows
        });
    }

    async detalhar(req, res) {
        const {
            id
        } = req.params;

        const filmeInfo = await FilmeDAO.detalharFilme(id);
        console.log('filmeInfo ',filmeInfo);
        return res.render('detalhar', { filme: filmeInfo });
    }

    async cadastrar(req, res) {
        console.log(`Cadastrando um filme`);
        console.log({
            body: req.body
        });

        const {
            nome,
            genero,
            sinopse,
            data_lancamento
        } = req.body;
        const filme = new Filme(null, nome, genero, sinopse, data_lancamento);

        await FilmeDAO.insereFilme(filme);

        return res.redirect('/filmes');
    }

    async renderAlterar(req, res) {
        const {
            id
        } = req.params;

        const filmeInfo = await FilmeDAO.detalharFilme(id);
        console.log('filmeInfo ',filmeInfo);
        return res.render('alterar', { filme: filmeInfo });
    }

    async alterar(req, res) {
        console.log({
            body: req.body
        });
        console.log('Alterando filme');

        const {
            nome,
            genero,
            sinopse,
            data_lancamento
        } = req.body;

        const {
            id
        } = req.params;

        await FilmeDAO.alterarFilme(id, nome, genero, sinopse, data_lancamento);

        return res.redirect('/filmes');
    }

    async renderDeletar(req, res) {
        const {
            id
        } = req.params;

        const filmeInfo = await FilmeDAO.detalharFilme(id);
        console.log('filmeInfo ',filmeInfo);
        return res.render('deletar', { filme: filmeInfo });
    }

    async deletar(req, res) {
        console.log('Deletando filme');

        const {
            id
        } = req.params;

        await FilmeDAO.deletarFilme(id);

        return res.redirect('/filmes');
    }
}

module.exports = {
    FilmesController
}