const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const OddsController = require('./controllers/OddsController');
const BetsController = require('./controllers/BetsController');

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/odds',
    OddsController.getOdds)

  app.post('/bets',
    BetsController.postBet)
}
