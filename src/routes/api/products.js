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
    const products = await Product.find({ available: true, stock: { $gte: 10 } })
    res.json(products);
});

router.get('/price/:minPrice/max/:maxPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    const products = await Product.find({ price: { $gt: minPrice, $lt: maxPrice } });
    res.json(products);
});

router.get('/:department', async (req, res) => {
    try {
        const products = await Product.find({ department: `${req.params.department}` })
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

// aplicar TRY CATCH a todos

router.post('/', validate(productSchema), async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
})

router.put('/add_cart', checkProductExists, async (req, res) => {
    /* console.log(req.body.product_id);
    console.log(req.user._id); */

    /* const user = await User.findByIdAndUpdate(req.user._id, { $push: { cart: req.body.product_id } }, { new: true }).populate('cart'); */

    req.user.cart.push(req.body.product_id)
    await req.user.save();

    res.json(req.user);
});

router.put('/:productId', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })   //  Añadir { new: true } para que devuelva el documento despues de actualizarlo
    res.json(updatedProduct)
})

router.delete('/:productId', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    res.json(deletedProduct);
})

module.exports = router;