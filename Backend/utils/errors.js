exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ''};

    if(err.message.includes('invalide file'))
        errors.format = 'Votre photo de profil doit être au format jpg, png ou gif';

    if (err.message.includes('max size'))
        errors.maxSize = 'Votre photo de profil ne doit pas dépasser 500Ko';

    return errors;
}