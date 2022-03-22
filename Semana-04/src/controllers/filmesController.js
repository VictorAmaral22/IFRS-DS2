const filmes = [
    {
        id: 1,
        name: 'Homem Aranha Sem Volta pra Casa',
        genre: 'Ação, Aventura',
        sinopsis: 'Altas teias, fan service e multiverso',
        date: '2021-12-17'
    },
    {
        id: 2,
        name: 'The Batman',
        genre: 'Suspense, Investigação',
        sinopsis: 'Ricasso batendo em bandido e serial killer',
        date: '2022-04-10'
    },
];

class FilmesController {
    async listar(req, res) {
        return res.render('listagem', {filmes});
    }
    async detalhar(req, res) {
        const { id } = req.params;
        if(filmes[id-1]){
            const filme = filmes[id-1];
            return res.render('detalhar', {filme});
        } else {
            return res.send(`<h2>Filme não encontrado :(</h2>
                <br />
                <a href="/">Voltar</a>`);
        }
    }
    async cadastrar(req, res) {
        const { body } = req;
        filmes.push({
            id: (filmes.length+1),
            ...req.body
        })
        return res.redirect('/');
    }
}

module.exports = { FilmesController };