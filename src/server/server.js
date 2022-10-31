import User from "../classes/User.js";
import fakeUsers from "../server/fakeUsers.json"
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("tinderUsers")) || [];
};

export const createAccount = (email, password) => {
  let users = getUsers();
  const isTaken = users.find((user) => user.email === email);
  if (isTaken) {
    return false;
  } else {
    users.push(new User(email, password));
    localStorage.setItem("tinderUsers", JSON.stringify(users));
    return true;
  }
};

export const login = (email, password) => {
  let users = getUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    sessionStorage.setItem("tinderLogged", JSON.stringify(user));
    return true;
  }
  return false;
};


export const isLogged = () => {
  return JSON.parse(sessionStorage.getItem("tinderLogged")) ? true : false;
};

export const logout = () => {
  sessionStorage.removeItem("tinderLogged");
};

export const getLoggedUser = () => {
  return JSON.parse(sessionStorage.getItem("tinderLogged")) || {};
};

export const updateData = (currentUser) => {
  let users = getUsers();
  const index = users.findIndex((user) => user.email === currentUser.email);
  users.splice(index, 1, currentUser);
  sessionStorage.setItem("tinderLogged", JSON.stringify(currentUser));
  localStorage.setItem("tinderUsers", JSON.stringify(users));

};

export const refreshChat = ()=>{
    const logged = getLoggedUser();
    const users = getUsers();
    const updated = users.find((user) => user.email === logged.email);
    sessionStorage.setItem("tinderLogged", JSON.stringify(updated))
}

export const NotSwipedUsers = () => {
  let users = getUsers();
  let ActiveUser = JSON.parse(sessionStorage.getItem("tinderLogged"));
  let boxOfUsers = [];

  users.forEach((user) => {
    let alreadyLiked = ActiveUser.likedPeople.find((obj) => obj === user.email);
    if (!alreadyLiked 
      && user.email !== ActiveUser.email
      && (ActiveUser.genderPreference === 'Both' || ActiveUser.genderPreference === user.gender || ActiveUser.genderPreference === "")) {
      boxOfUsers.push(user);
    }
  });
  sessionStorage.setItem(
    "currentUser",
    JSON.stringify(
      boxOfUsers[Math.floor(Math.random() * boxOfUsers.length)] || {}
    )
  );
};

export const findWhoLikesMe = () => {
  let loggedTinderUser = getLoggedUser()
  let allTinderUsers = getUsers()
  let usersLikedBy = []
  allTinderUsers.forEach(user => {
      if (user.likedPeople.some(email=> email === loggedTinderUser.email && loggedTinderUser.likedPeople.indexOf(user.email) === -1 )){
          usersLikedBy.push(user)
      }
  })
  return usersLikedBy
}

export const findChat = (buddy) => {
  const loggedUser = getLoggedUser();
  const allChats = loggedUser.chats;
  const chat = allChats.find(
    (chat) => chat.chatBuddy === buddy.email
  );

  return chat;
};


export const checkForMatch = (activeUser, swipedUser) => {
    if (swipedUser.likedPeople.indexOf(activeUser.email) !== -1){
        return true
    }
    return false
}

export const findBuddy = (email)=>{
      const users = getUsers();
      const buddy = users.find(user=> user.email === email);
      return buddy;
}

export const updateBuddyChat = (object, chat)=>{
  let users = getUsers();
  const loggedUser = getLoggedUser();
  const userIndex = users.findIndex(user=>user.email === object.email);
  const loggedChat = object.chats.findIndex(chat=> chat.chatBuddy === loggedUser.email)
  let copy = JSON.parse(JSON.stringify(object));
  copy.chats[loggedChat].chatHistory = chat.chatHistory;
  users.splice(userIndex, 1, copy);
  localStorage.setItem("tinderUsers", JSON.stringify(users));

}

(()=>{
  const userData = JSON.parse(JSON.stringify(fakeUsers));
  let allUsers = getUsers();
  userData.forEach(user=> {
    let obj = new User(user.email, user.password);
    obj.username = user.username;
    obj.age = user.age;
    obj.phone = user.phone;
    obj.pictures = user.pictures;
    obj.gender = user.gender;
    obj.genderPreference = user.genderPreference;
    obj.passions = user.passions;
    obj.genderPreference = user.genderPreference
    obj.location = user.location
    obj.description = user.description

      if(allUsers.findIndex(u=> u.email === user.email) === -1){
        allUsers.push(obj);
      } 
  })
    localStorage.setItem("tinderUsers", JSON.stringify(allUsers))
})()