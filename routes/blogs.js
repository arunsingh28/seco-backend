const router = require('express').Router();
const blogsController = require('../controllers/blogs');


const { auth } = require('../middleware/auth');

router.route('/deleteById/:id').delete(auth, blogsController.blogDelete);
router.route('/blog').post(auth, blogsController.blog);
router.route('/getBlogs').post(auth, blogsController.blogShow);
router.route('/updateBlog/:id').put(auth, blogsController.updateBlog)

module.exports = {
  router: router,
  basePath: '/api/blogs'
};
