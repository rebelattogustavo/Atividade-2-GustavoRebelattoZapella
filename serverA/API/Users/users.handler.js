const crud = require("../../CRUD/index");

async function searchUsers(){
    return await crud.get('users');
};

async function searchUsersId(Id){
    const user = await crud.getById('users', Id);
    if(user.User !== undefined){
        return user;
    }
    return {"Error": "User not found"};
};

async function login(User, Password){
    const user = await crud.get('users');
    const userLogin = user.filter((user) => user.User === User && user.Password === Password);
    if(userLogin.length > 0){
        return userLogin[0];
    }
    return {"Error": "User not found"};
};

async function create(Name, CPF, User, Password, Id) {
    if(Id){
        let user = await crud.getById('users', Id);
        if(user.Name !== undefined){
            const usuario = await crud.save('users', Id, { Name, CPF, User, Password });
            return usuario;
        }else{
            return {"Error": "User not found"};
        }
    }else{
        const user = await crud.get('users');
        const userCPF = user.filter((user) => user.CPF === CPF);
        if(userCPF.length > 0){
            return {"Error": "CPF already exists"};
        }else{
            const usuario = await crud.save('users', null, { Name, CPF, User, Password });
            return usuario;
        }
    }
};

async function remove(Id){
    const user = await crud.remove('users', Id);
    return user;
};

module.exports = {
    searchUsers,
    searchUsersId,
    create,
    remove,
    login
};