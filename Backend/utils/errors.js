exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ''};

    if(err.message.includes('invalide file'))
        errors.format = 'Votre photo de profil doit être au format jpg, png ou gif';

    if (err.message.includes('max size'))
        errors.maxSize = 'Votre photo de profil ne doit pas dépasser 500Ko';

    return errors;
}

exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    // if (errs.message.includes("password"))
    //   errors.password = "Le mot de passe doit faire 6 caractères minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "Ce pseudo est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };

  exports.errpass = (errs) => {
    let pass = {password: ""};
    if (errs.message === "Le mot de passe doit faire 6 caractères minimum")
      pass.password = "Le mot de passe doit faire 6 caractères minimum";

      return pass;
  }