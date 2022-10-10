const express = require('express');
const router = express.Router();

const productshandler = require('./products.handler');

router.get('/', async (req, res) => {
    res.json(await productshandler.searchProducts());
});

router.post('/', async (req, res) => {
    const { Name, Quantity, Description } = req.body;
    res.json(await productshandler.create(Name, Quantity, Description));
});

router.put('/:id', async (req, res) =>{
    const { Name, Quantity, Description } = req.body;
    res.json(await productshandler.create(Name, Quantity, Description, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await productshandler.remove(req.params.id));
});

module.exports = router;