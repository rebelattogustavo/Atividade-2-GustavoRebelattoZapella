const crud = require("../../CRUD/index");
var fetch = require("node-fetch");



async function searchProducts() {
    const product = await crud.get('Products');
    return product;
};

async function create(name, description, price, userCPF, userPassword, Id) {
    var user;
    try {
        const fetchUser = await fetch('http://destino:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userCPF, userPassword })
        });
        user = await fetchUser.json();
        if(Id){
            const product = await crud.save('Products', Id, verifyUser(name, description, price, userCPF, userPassword));
            return product;
        }else{
            const data2 = await verifyUser(name, description, price, userCPF, userPassword)
            const product = await crud.save('Products', null, data2);
            return product;
        }
    } catch (err) {
        console.log(err);
        return {"Error": "User not found"};
    }
};

async function remove(Id) {
    const product = await crud.remove('Products', Id);
    return product;
};

async function verifyUser(name, description, price, userCPF, userPassword) {
    const user = await crud.get('Users');
    const userLogin = user.filter((user) => user.CPF === userCPF && user.Password === userPassword);
    if (userLogin.length > 0) {
        const data = {
            name: name,
            description: description,
            price: price,
            userCPF: userCPF
        };
        return data;
    }else{
        return { "Error": "User not found" };
    }
}

async function searchUserProducts(cpf) {
    const products = await crud.get('Products');
    const userProducts = products.filter(product => product.userCPF === cpf);
    return userProducts;
}

module.exports = {
    searchProducts,
    create,
    remove,
    searchUserProducts
};