const express = require('express');
const profil = require('../middleware/multer-config-profil');
// on cree notre router
const router = express.Router();
// on importe nos controleurs
const userCtrl = require('../controllers/user')
const uploadController = require('../controllers/upload')
//on importe notre middleware
const auth = require('../middleware/auth')
// on cree les routes de notre api qui se servent de nos controllers
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/isConnected', userCtrl.isConnected)
router.get('/logout', auth, userCtrl.logout)
router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.userInfo)
router.put('/:id', auth,  userCtrl.updateUser)
router.delete('/:id', auth,  userCtrl.deleteUser)
router.patch('/follow/:id', auth, userCtrl.follow)
router.patch('/unfollow/:id', auth, userCtrl.unfollow)

// upload
router.post('/upload', profil, uploadController.uploadProfil)
// on exporte notre router
module.exports = router;