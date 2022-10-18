const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');

router.get('/', async (req, res) => {
    res.json(await usersHandler.searchUsers());
});

router.post('/login', async (req, res) =>{
    const { CPF, Password } = req.body;
    res.json(await usersHandler.login(CPF, Password))
});

router.post('/', async (req, res) => {
    const { CPF, Name, Password } = req.body;
    res.json(await usersHandler.create(CPF, Name, Password));
});

router.put('/:id', async (req, res) =>{
    const { CPF, Name, Password } = req.body;
    res.json(await usersHandler.create(CPF, Name, Password, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await usersHandler.remove(req.params.id));
});

module.exports = router;