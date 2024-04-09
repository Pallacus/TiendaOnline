const router = require('express').Router();
const { validate, checkProductExists } = require('../../helpers/middlewares');
const Product = require('../../models/product.model');
const User = require('../../models/user.model')
const productSchema = require('../../schemas/prodduct.chema');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/actives', async (req, res) => {
    try {
        const products = await Product.find({ available: true, stock: { $gte: 10 } })
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/price/:minPrice/max/:maxPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    try {
        const products = await Product.find({ price: { $gt: minPrice, $lt: maxPrice } });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/:department', async (req, res) => {
    try {
        const products = await Product.find({ department: `${req.params.department}` })
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.post('/', validate(productSchema), async (req, res) => {
    req.body.creator = req.user._id;
    try {
        const newProduct = await Product.create(req.body);
        const product = await Product.findById(newProduct._id).populate('creator', '-password');    //  Con populate recuperamos los datos del creator y los muestra. Se puede pasar un segundo parámetro donde elegimos los campos que queremos mostrar o los que no queremos que se muestren.
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.put('/add_cart', checkProductExists, async (req, res) => {
    /* console.log(req.body.product_id);
    console.log(req.user._id); */

    /* const user = await User.findByIdAndUpdate(req.user._id, { $push: { cart: req.body.product_id } }, { new: true }).populate('cart'); */

    try {
        req.user.cart.push(req.body.product_id)
        await req.user.save();

        res.json(req.user);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })   //  Añadir { new: true } para que devuelva el documento despues de actualizarlo
        res.json(updatedProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.delete('/:productId', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
        res.json(deletedProduct);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;