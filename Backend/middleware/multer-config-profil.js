// on importe mutler
const multer = require('multer');

// on cree notre dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//on indique le chemin d'acces des images a mutler
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/images/profil');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension)
    }
});
// on exporte notre module
module.exports = multer({ storage }).single('file');