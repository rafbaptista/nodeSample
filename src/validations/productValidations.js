exports.validationRules = {
    title: 'required|string|max:30',
    description: 'required|string|min:0|max:150',
    slug: 'required|string',
    price: 'required|numeric',
    tags: 'required|array',
}

exports.validationErrorMessages = {
    "required.title": "O campo title é obrigatório",
    "max.title": "O campo title deve conter entre até 30 caracteres",

    "required.description": "O campo description é obrigatório",
    "max.description": "O campo description deve conter entre até 150 caracteres",
    "string.description": "O campo description deve estar em formato de texto",

    "required.slug": "O campo slug é obrigatório",

    "required.price": "O campo price é obrigatório",
    "numeric.price": "O preço deve estar em formato numérico",

    "required.tags": "O campo tags é obrigatório",
    "array.tags": "O campo tags deve estar em formato de array"
}