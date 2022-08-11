let filmes = [];

const { nanoid } = require('nanoid');

class FilmesController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({ session: req.session });
        // LISTAGEM DE TODOS OS FILMES MOSTRANDO O NOME
        // O NOME É CLICAVEL E REDIRECIONA PARA O DETALHAR DO FILME
        // let html = '';
        // filmes.forEach(filme => {
        //     html += `<a href="/filmes/${filme.id}">${filme.nome}</a><br></br>`
        // })
        
        // return res.send(html);
        return res.render('listagem', { user: req.session.user, filmes: filmes });
    }

    async deletar(req, res) {
        const { id } = req.params;
        // BUSCAR O FILME E REMOVER DO VETOR
        const filmeIdx = filmes.findIndex(f => f.id == id);
        filmes.splice(filmeIdx, 1);

        // FILTRAR O VETOR DE FILMES BASEADO NO ID != DO ID DA REMOÇÃO
        // filmes = filmes.filter(f => f.id != id);
        
        // BANCO - SQL COM DELETE WHERE

        return res.redirect('/filmes')
    }

    async detalhar(req, res) {
        const { id } = req.params;
        // for  / filter
        for (let index = 0; index < filmes.length; index++) {
            if (filmes[index].id == id) {
                // retorna esse cara!
            }
        }

        const filmeFiltrado = filmes.filter(f => f.id == id);
        if (filmeFiltrado.length > 0) {
            // return res.send(`<pre>
            //     ${JSON.stringify(filmeFiltrado[0], null, 2)}
            // </pre>`)
            return res.render('detalhar', { filme: filmeFiltrado[0] });
        } else {
            return res.send('FILME NAO ENCONTRADO');
        }

        // MOSTRA TODOS OS DADOS DO FILME
        //return res.send('Essa deveria detalhar um filme ' + req.params.id);
    }

    async cadastrar(req, res) {
        //DEPOIS DE CADASTRAR, REDIRECIONA PARA A LISTAGEM
        console.log(`Cadastrando um filme`);
        console.log({ body: req.body });
        filmes.push({
            id: nanoid(8),
            ...req.body
        });
        console.log(filmes)
        return res.redirect('/filmes');
        // return res.send('Deveria cadastrar um filme');
    }
}

module.exports = { FilmesController }