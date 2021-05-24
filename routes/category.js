const router = require('express').Router();
const categoryController = require('../controllers/category');
const db = require('../models');

router.post('/add-category', categoryController.category);
router.delete('/deleteById/:id', categoryController.catDel)
router.get('/get-categories', categoryController.getAllCategories)
router.post('/getById', categoryController.getCategoryById)


module.exports = {
  router: router,
  basePath: '/api/category'
};
