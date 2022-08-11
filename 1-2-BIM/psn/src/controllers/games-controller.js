let games = [];

const { nanoid } = require('nanoid');

class GamesController {

    async listar(req, res) {
        return res.render('listagem', { games: games });
    }

    async detalhar(req, res) {
        const { id } = req.params;
        // for  / filter
        for (let index = 0; index < games.length; index++) {
            if (games[index].id == id) {
                // retorna esse cara!
            }
        }

        const gameFiltrado = games.filter(f => f.id == id);
        if (gameFiltrado.length > 0) {
            return res.render('detalhar', { game: gameFiltrado[0] });
        } else {
            return res.send('GAME NAO ENCONTRADO');
        }
    }

    async cadastrar(req, res) {
        console.log(`Cadastrando um game`);
        console.log({ body: req.body });
        games.push({
            id: nanoid(8),
            ...req.body
        });
        console.log(games)
        return res.redirect('/games');
    }

    async deletar(req, res) {
        // console.log({ body: req.body });
        let { id } = req.params;
        console.log(`Deletando o game ${id}`);
        games = games.filter(item => item.id != id);
        return res.redirect('/games');
    }
}

module.exports = { GamesController }