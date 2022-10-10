const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');

router.get('/', async (req, res) => {
    res.json(await usersHandler.searchUsers());
});

router.get('/login', async (req, res) =>{
    const { User, Password } = req.body;
    console.log(User, Password);
    res.json(await usersHandler.login(User, Password))
});

router.post('/', async (req, res) => {
    const { Name, CPF, User, Password } = req.body;
    res.json(await usersHandler.create(Name, CPF, User, Password));
});

router.put('/:id', async (req, res) =>{
    const { Name, CPF, User, Password } = req.body;
    res.json(await usersHandler.create(Name, CPF, User, Password, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await usersHandler.remove(req.params.id));
});

module.exports = router;