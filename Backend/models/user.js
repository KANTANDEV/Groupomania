// On importe mongoose
const mongoose = require('mongoose');
// On importe le package unique validator
const uniqueValidator = require('mongoose-unique-validator');

// on cree notre schema de donnees
const userSchema = mongoose.Schema({
  pseudo: { type: String, require: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  picture: { type: String, default: "./images/profil/default-user.png"},
  admin: {type: Boolean, defaultValue: false},
  bio: { type: String, max: 1024 },
  followers: { type: [String] },
  following: { type: [String] },
  likes: { type: [String] }
},
  { timestamps: true }
)

// on applique le plugin unique validator a notre schema de donnees
userSchema.plugin(uniqueValidator);
// On exporte notre schemat de donnees utilisateur
module.exports = mongoose.model('User', userSchema);