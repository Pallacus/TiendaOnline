const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const Product = require('../../models/product.model')

const { validate, checkToken } = require('../../helpers/middlewares');
const registerSchema = require('../../schemas/register.schema');
const { createToken } = require('../../helpers/utils');

//  /register
router.post('/register', validate(registerSchema), async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.json(error.errors);
    }
});

// /login
router.post('/login', async (req, res) => {
    // Body: email, password
    const { email, password } = req.body;
    // ¿Existe el email en la base de datos?
    try {
        const user = await User.findOne({ email });    // User.findOne({email: email}) // si la clave email: es igaul a la variable email. Si la clave se llama igual que la variable se puede poner una sola vez
        if (!user) {
            return res.status(403).json({ fatal: `Email y/o contraseña incorrectos.` });
        }
        const iguales = bcrypt.compareSync(password, user.password)
        if (!iguales) {
            return res.status(403).json({ fatal: `Email y/o contraseña incorrectos.` });
        }
        res.json({ message: 'Login correcto', token: createToken(user) });
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/products', checkToken, async (req, res) => {
    try {
        const products = await Product.find({ creator: req.user._id });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/:user_id', async (req, res) => {
    try {
        const result = await User.findById(req.params.user.id).populate('cart');
        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

module.exports = router;