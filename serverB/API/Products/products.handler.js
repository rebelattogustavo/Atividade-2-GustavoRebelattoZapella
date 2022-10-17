const crud = require("../../CRUD/index");


async function searchProducts() {
    return await crud.get('products');
};

async function create(Name, Description, Price, CPF, Password, Id) {
    var user;
    try {
        fetch('http://my-network/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CPF, Password })
        });
        user = await response.json();
        console.log(user);
        if(Id){
            const product = await crud.getById('products', Id, verifyUser(Name, Description, Price, CPF, Password));
            return product;
        }else{
            const product = await crud.getById('products', null, verifyUser(Name, Description, Price, CPF, Password));
            return product;
        }
    } catch (err) {
        console.log(err);
        return {"Error": "User not found"};
    }
};

async function remove(Id) {
    const product = await crud.remove('products', Id);
    return product;
};

async function verifyUser(Name, Description, Price, CPF, Password) {
    const user = await crud.get('users');
    const userLogin = user.filter((user) => user.CPF === CPF && user.Password === Password);
    if (userLogin.length > 0) {
        return data = {
            name: Name,
            description: Description,
            price: Price,
            userCPF: CPF
        };
    }
    return { "Error": "User not found" };
}

async function searchUserProducts(cpf) {
    const products = await crud.get('products');
    const userProducts = products.filter(product => product.userCPF === cpf);
    return userProducts;
}

module.exports = {
    searchProducts,
    create,
    remove,
    searchUserProducts
};