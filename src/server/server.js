import User from "../classes/User.js";

const getUsers = ()=>{
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

export const fakeUsers = ()=>{
   return [
        {
            name:"Penka",
            age:30,
            pet:"mravka",
            zodiac:"lion",
            email:"penka@abv.bg"
    
        },
        {
            name:"Ivan",
            age:40,
            pet:"slon",
            zodiac:"kesten",
            email:"ivan@abv.bg"
    
        },
        {
            name:"Vasko Jabata",
            age:20,
            pet:"jiraf",
            zodiac:"vodolei",
            email:"vasko@abv.bg"
    
        },
        {
            name:"Kiro",
            age:80,
            pet:"ciganin",
            zodiac:"nz",
            email:"kiro@abv.bg"
    
        },
        {
            name:"Stanka",
            age:65,
            pet:"vulk",
            zodiac:"ribi",
            email:"stanka@abv.bg"
    
        },
        {
            name:"Slavi",
            age:44,
            pet:"zaek",
            zodiac:"deva",
            email:"slavi@abv.bg"
    
        },
    
    ]
}

export const notSwipedUsers = (array)=>{
    let users = fakeUsers();
    let copy = [...array];
    let boxOfUsers = [];

    users.forEach(user=> {
        let alreadyLiked = copy.find(obj => obj.email === user.email);
        if(!alreadyLiked){
            boxOfUsers.push(user);
        }
    })
    return boxOfUsers[Math.floor(Math.random()*boxOfUsers.length)]
    }