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

async function create(Name, Quantity, Description, Id) {
    if (Id) {
        let product = await crud.getById('products', Id);
        if (product.Name !== undefined) {
            const product = await crud.save('products', Id, { Name, Quantity, Description });
            return product;
        } else {
            return { "Error": "Product not found" };
        }
    } else {
        const product = await crud.save('products', null, { Name, Quantity, Description });
        return product;
    }
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