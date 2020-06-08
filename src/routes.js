const { Router } = require('express');

const loadRocketsData = require('./controllers/loadRocketsData');

const routes = new Router();

routes.get('/', loadRocketsData);

module.exports = routes;