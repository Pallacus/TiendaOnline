const yup = require('yup');

const registerSchema = yup.object({
    name: yup.string()
        .min(3, 'El nombre debe tener como mínimo 3 carácteres')
        .required('El campo nombre es requerido.'),
    email: yup.string()
        // .email('El email es incorrecto') // Va regulinchis
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'El email no es correcto.')
        .required('Es necesario introducir una cuenta de email.'),
    password: yup.string()
        .required('Introduce una contraseña.')
})

module.exports = registerSchema;