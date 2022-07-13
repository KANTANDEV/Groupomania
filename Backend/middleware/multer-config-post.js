// on importe mutler
const multer = require('multer');

// on cree notre dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/x-msvideo': 'avi',
    'video/mp4': 'mp4',
    'video/mpeg': 'mpeg',
    'video/ogg': 'ogv',
    'video/mp2t': 'ts',
    'video/webm': 'webm',
    'video/3gpp': '3gp',
    'video/3gpp2': '3g2'
}

//on indique le chemin d'acces des images a mutler
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/images/posts');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension)
        }      
});
// on exporte notre module
module.exports = multer({
    storage,
    limits: { fileSize: 500000 },
   }).single('file');