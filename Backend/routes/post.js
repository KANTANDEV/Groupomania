//On cree notre router 
const router = require('express').Router();
//on importe notre controller
const postController = require('../controllers/post');

// On cree notre CRUD
router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;