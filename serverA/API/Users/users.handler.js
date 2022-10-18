const crud = require("../../CRUD/index");

async function searchUsers(){
    return await crud.get('Users');
};

async function searchUsersId(Id){
    const user = await crud.getById('Users', Id);
    if(user.User !== undefined){
        return user;
    }
    return {"Error": "User not found"};
};

async function login(CPF, Password){
    const user = await crud.get('Users');
    const userLogin = user.filter((user) => user.CPF === CPF && user.Password === Password);
    if(userLogin.length > 0){
        return userLogin[0];
    }
    return {"Error": "User not found"};
};

async function create(CPF, Name, Password, Id) {
    if(Id){
        let user = await crud.getById('Users', Id);
        if(user.Name !== undefined){
            const usuario = await crud.save('Users', Id, { CPF, Name, Password });
            return usuario;
        }else{
            return {"Error": "User not found"};
        }
    }else{
        const user = await crud.get('Users');
        const userCPF = user.filter((user) => user.CPF === CPF);
        if(userCPF.length > 0){
            return {"Error": "CPF already exists"};
        }else{
            const usuario = await crud.save('Users', null, { CPF, Name, Password });
            return usuario;
        }
    }
};

async function remove(Id){
    const user = await crud.remove('Users', Id);
    return user;
};

module.exports = {
    searchUsers,
    searchUsersId,
    create,
    remove,
    login
};