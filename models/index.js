'use strict';
const Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: process.env.DB_LOGGING === 'true' ? true : false,
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const Products = require('./products')(sequelize);
const Sales = require('./sales')(sequelize);

let models = {
  sequelize: sequelize,
  Products: Products,
  Sales: Sales,
}

Products.associate(models);
Sales.associate(models);

module.exports = models;
