//On cree notre router 
const router = require('express').Router();
//on importe notre controller
const postController = require('../controllers/post');
//on importe notre middleware
const auth = require('../middleware/auth');
const post = require('../middleware/multer-config-post');
// On cree notre CRUD
//POSTS
router.post('/', auth, post, postController.createPost);
router.get('/', postController.readPost);
router.put('/:id', auth, post, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.patch('/like-post/:id',  auth,postController.likePost);
router.patch('/unlike-post/:id', auth, postController.unlikePost);
//Comments
router.patch('/comment-post/:id', auth, postController.commentPost);
router.patch('/edit-comment-post/:id',  auth, postController.editCommentPost);
router.patch('/delete-comment-post/:id', auth,  postController.deleteCommentPost);
// upload
// router.post('/upload', post, postController.createPost)
module.exports = router;