const { Router } = require('express');
const routes = Router();
const { getRandomDogImg } = require('../DoggoAPI/doggo-integration');
const { getAge } = require('../AgeAPI/age-integration');
const { getNation } = require('../NationAPI/nation-integration');

routes.get('/', async (req, res) => {
    const { name } = req.query;
    let img = await getRandomDogImg();
    img = img.message;
    let age = await getAge(name);
    age = age.age;
    let nation = await getNation(name);
    console.log({ name: name, img: img, age: age, nation: nation})

    return res.render('doggo', { name: name, img: img, age: age, nation: nation});
});

module.exports = routes;