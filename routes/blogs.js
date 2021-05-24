const router = require('express').Router();
const blogsController = require('../controllers/blogs');

router.delete('/deleteById/:id',blogsController.blogDelete);
router.post('/blog', blogsController.blog);
router.post('/getBlogs', blogsController.blogShow);

module.exports = {
  router: router,
  basePath: '/api/blogs'
};
