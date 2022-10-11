const crud = require("../../CRUD/index");

async function searchProducts() {
    return await crud.get('products');
};

async function searchProductsId(Id) {
    const product = await crud.getById('products', Id);
    if (product.Name !== undefined) {
        return product;
    }
    return { "Error": "Product not found" };
};



async function create(Name, Quantity, Description, User, Password, Id) {
    fetch('http://localhost:3000/users/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User': User,
            'Password': Password
        }
    }).then(response => {
        if(response)
};

async function remove(Id) {
    const product = await crud.remove('products', Id);
    return product;
};

module.exports = {
    searchProducts,
    searchProductsId,
    create,
    remove
};