const express = require('express');
const { Image } = require('./models/images');
const multer = require('multer');
const upload = multer({ dest: './public/images/' })
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

// PÁGINA INICIAL
app.get('/', async (req, res) => {
    let { page } = req.query;
    console.log('page ',page);
    
    page = page || 1;
    const limit = 6;
    const offset = limit * (page-1);

    const images = await Image.findAll({offset, limit});
    const total = await Image.count();

    console.log('images ',images);


    return res.render('initial', { images: images, total: total, page: page });
})

// PUBLICAR NOVA FOTO
app.post('/', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    console.log('req.file ',req.file);

    await Image.create({
        title: title,
        description: description,
        url: `/images/${req.file.filename}`,
    })

    return res.redirect('/');
})

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port} ..;`);
})
