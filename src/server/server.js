import User from "../classes/User.js";

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
    localStorage.setItem("tinderLogged", JSON.stringify(user));
    return true;
  }
  return false;
};

export const isLogged = () => {
  return JSON.parse(localStorage.getItem("tinderLogged")) ? true : false;
};

export const logout = () => {
  localStorage.removeItem("tinderLogged");
};

export const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem("tinderLogged")) || {};
};

export const updateData = (currentUser) => {
  let users = getUsers();
  const index = users.findIndex((user) => user.email === currentUser.email);
  users.splice(index, 1, currentUser);
  localStorage.setItem("tinderLogged", JSON.stringify(currentUser));
  localStorage.setItem("tinderUsers", JSON.stringify(users));
};

export const NotSwipedUsers = () => {
  let users = getUsers();
  let ActiveUser = JSON.parse(localStorage.getItem("tinderLogged"));
  let boxOfUsers = [];

  users.forEach((user) => {
    let alreadyLiked = ActiveUser.likedPeople.find((obj) => obj === user.email);
    if (!alreadyLiked && user.email !== ActiveUser.email) {
      boxOfUsers.push(user);
    }
  });
  localStorage.setItem(
    "currentUser",
    JSON.stringify(
      boxOfUsers[Math.floor(Math.random() * boxOfUsers.length)] || {}
    )
  );
};

export const checkUserData = () => {
  const user = JSON.parse(localStorage.getItem("tinderLogged"));
  if (user.username && user.age && user.phone) {
    return true;
  }
  return false;
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

export const findBudy = (email)=>{
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