import User from "../classes/User.js";

export const getUsers = () =>{
    return JSON.parse(localStorage.getItem("tinderUsers")) || [];
}

export const createAccount = (email, password)=>{
    let users = getUsers();
    const isTaken = users.find(user => user.email === email);
    if(isTaken){
        return false;
    } else {
        users.push(new User(email, password));
        localStorage.setItem("tinderUsers", JSON.stringify(users));
        return true;
    }
}

export const login = (email, password)=>{
    let users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if(user){
        localStorage.setItem("tinderLogged", JSON.stringify(user));
        return true;
    }
    return false;
}

export const isLogged = ()=>{
    return JSON.parse(localStorage.getItem("tinderLogged")) ? true : false;
}

export const logout = ()=>{
    localStorage.removeItem("tinderLogged");
} 

export const getLoggedUser = ()=>{
    return JSON.parse(localStorage.getItem("tinderLogged")) || {};
}

export const updateData = (currentUser)=>{
    let users = getUsers();
    const index = users.findIndex(user => user.email === currentUser.email);
    users.splice(index,1, currentUser)
    localStorage.setItem("tinderLogged", JSON.stringify(currentUser));
    localStorage.setItem("tinderUsers", JSON.stringify(users))
}

export const NotSwipedUsers = ()=>{
    let users = getUsers();
    let ActiveUser = JSON.parse(localStorage.getItem('tinderLogged'));
    let boxOfUsers = [];

    users.forEach(user=> {
        let alreadyLiked = ActiveUser.likedPeople.find(obj => obj === user.email);
        if(!alreadyLiked && user.email !== ActiveUser.email){
            boxOfUsers.push(user);
        }
    })
    localStorage.setItem('currentUser', JSON.stringify(boxOfUsers[Math.floor(Math.random()*boxOfUsers.length)] || {}))
}