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
        // Listagem de todos os filmes mostrando o nome
        // O nome é clicável e redireciona para o detalhar filme
        let txt = '';
        for (let i = 0; i < filmes.length; i++) {
            txt += `<a href="${filmes[i].id}">${filmes[i].name}</a><br />`;
        }
        return res.send(`<h2>Listando a partir do controller</h2>
                        <br>
                        ${txt}
                        <br>
                        <a href="cadastrar.html">Add Filmes</a>
        `);
    }

    async detalhar(req, res) {
        const { id } = req.params;
        console.log('id: ',id);
        console.log('Filme: ',filmes[id-1]);
        if(filmes[id-1]){
            const filme = filmes[id-1];
            let txt = `
                <h2>Título: ${filme.name}</h2>
                <h4>${filme.date}</h4>
                <br />
                <p>Gêneros: <i>${filme.genre}</i></p><br />
                <p>Sinopse: ${filme.sinopsis}</p>
            `;
            return res.send(`${txt} <br /><a href="/">Ver outros filmes</a>`);
        } else {
            return res.send(`<h2>Filme não encontrado :(</h2>
                <br />
                <a href="/">Voltar</a>`);
        }
    }

    async cadastrar(req, res) {
        // Depois de cadastrar, redireciona para listar
        const { body } = req;
        filmes.push({
            id: (filmes.length+1),
            ...req.body
        })
        return res.redirect('/');
    }

}

module.exports = { FilmesController };