exports.validationRules = {
    name: 'required|string|max:30',
    email: 'required|string|email',
    password: 'required|string',    
}

exports.validationErrorMessages = {
    "required.name": "O campo name é obrigatório",
    "max.name": "O campo name deve conter entre até 30 caracteres",

    "required.email": "O campo email é obrigatório",
    "email.email": "O campo email deve ser um e-mail válido",

    "required.password": "O campo password é obrigatório",
}