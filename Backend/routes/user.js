const express = require('express');
// on cree notre router
const router = express.Router();
// on importe notre controleur
const userCtrl = require('../controllers/user')
// on cree les routes de notre api qui se servent de nos controllers
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.userInfo)
router.put('/:id', userCtrl.updateUser)
router.delete('/:id', userCtrl.deleteUser)
router.patch('/follow/:id', userCtrl.follow)
router.patch('/unfollow/:id', userCtrl.unfollow)
// on exporte notre router
module.exports = router;