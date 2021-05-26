const router = require('express').Router();
const Authorize = require('../controllers/auth');

const { auth } = require('../middleware/auth')


router.route('/signup').post(Authorize.signup)
router.route('/login').post(Authorize.login)
router.route('/dash').get(auth, Authorize.dashboard)


module.exports = {
  router: router,
  basePath: '/api/auth'
};
