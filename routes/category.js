const router = require('express').Router();
const categoryController = require('../controllers/category');

const { auth } = require('../middleware/auth')

router.route('/add-category').post(auth, categoryController.category);
router.route('/deleteById/:id').delete(auth, categoryController.catDel)
router.route('/get-categories').get(auth, categoryController.getAllCategories)
router.route('/getById').post(auth, categoryController.getCategoryById)
router.route('/updateCategory/:id').put(auth, categoryController.updateCategory)

module.exports = {
  router: router,
  basePath: '/api/category'
};
