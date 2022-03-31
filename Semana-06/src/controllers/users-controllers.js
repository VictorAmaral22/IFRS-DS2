const users = [];

class UsersController {
    async cadastrar(req, res) {
        console.log('UsersController/cadastrar');

        const user = req.body;
        users.push(user);  // salvando no banco

        console.log({ users });
        res.redirect('/');
    }

    async login(req, res) {
        // ACHAR COM O EMAIL CERTO
        const { email, senha } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);

        if (!usuarioEcontrado) return res.send('User nao encontrado');

        // VERIFICAR A SENHA
        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            return res.send('Usuario e senha confirmados, vc fez o login');
        } else {
            return res.send('Senha nao confere...');
        }
        
    }
}

module.exports = UsersController;
