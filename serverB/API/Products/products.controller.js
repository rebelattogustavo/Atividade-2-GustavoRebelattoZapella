const express = require('express');
const router = express.Router();

const productsHandler = require('./products.handler');

router.get('/', async (req, res) => {
    res.json(await productsHandler.searchProducts());
});

router.get('/:cpf', async (req, res) => {
    res.json(await productsHandler.searchUserProducts(req.params.cpf));
});

router.post('/', async (req, res) => {
    const { Name, Quantity, Description, CPF, Password } = req.body;
    res.json(await productsHandler.create(Name, Quantity, Description, CPF, Password));
});

router.put('/:id', async (req, res) =>{
    const { Name, Quantity, Description, CPF, Password } = req.body;
    res.json(await productsHandler.create(Name, Quantity, Description, CPF, Password, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await productsHandler.remove(req.params.id));
});

module.exports = router;