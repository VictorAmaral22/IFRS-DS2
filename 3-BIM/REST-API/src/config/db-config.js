

const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://suyanloriewldo:df2cba65014f84a238dcca8cf78df3f7006319fc4eddef7a0b76997c8be67350@ec2-3-217-251-77.compute-1.amazonaws.com:5432/d19id9d1a5kfad', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = { sequelizeCon };