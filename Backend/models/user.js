'use strict';
// On importe mongoose
const mongoose = require('mongoose');
// On importe le package unique validator
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// on cree notre schema de donnees
const userSchema = new Schema(
 {
  
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required:true},
  picture: { type: String, default: "./uploads/images/profil/default.jpg" },
  admin: {type: Boolean, default: false},
  bio: { type: String, max: 1024, default: "Cette personne n'a pas encore décrit son profil" },
  followers: { type: [String] },
  following: { type: [String] },
  likes: { type: [String] }
},
  { timestamps: true },
  {strict: true},
  {safe: true},
  {majority: true}
)

// on applique le plugin unique validator a notre schema de donnees
userSchema.plugin(uniqueValidator);
// On exporte notre schemat de donnees utilisateur
module.exports = mongoose.model('User', userSchema);