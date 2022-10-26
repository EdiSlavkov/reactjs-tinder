import style from "./ChatWithUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeUserData, temporaryData } from "../../store/ActiveUserSlice";
import { findChat } from "../../server/server";
import Message from "../../classes/Message";
import noPhoto from "../../images/noPhoto.jpg";

export default function ChatWithUser() {
    
  const buddy = useSelector(state => state.chatBuddy);
  const chatHistory = findChat(buddy);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activeUser);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  };
  const handleSendMsg = () => {
    const msg = new Message(user.username, message);
    const chat = [...chatHistory, msg];
    dispatch(temporaryData(["chats", chat]));
    dispatch(changeUserData(user));
    setMessage("");
  };

  return (
    <div className={style.chatWithUserContainer}>
      <div className={style.chatSection}>
        <div className={style.avatarAndName}>
          <img src={buddy?.pictures[0] || noPhoto} className={style.chatUserProfilePic} alt="buddyPic"></img>
          <span>{buddy.username}</span>
        </div>
        <div className={style.chatMessagesContainer}>
          {chatHistory.map((msg, i) => {
            if (msg.sender === user.username) {
              return (
                <>
                  <span key={i} className={style.sentMessage}>
                    {msg.text}
                  </span>
                  <span key={i}>
                    {msg.date}
                  </span>
                </>
              );
            } else {
              return (
                <>
                  <span key={i} className={style.receivedMessage}>
                    {msg.text}
                  </span>
                  <span key={i}>
                    {msg.date}
                  </span>
                </>
              );
            }
          })}
        </div>
        <div className={style.sendMessageSection}>
          <input
            onChange={handleInput}
            value={message}
            className={style.typeMessageInput}
            placeholder={"Type a message"}
          ></input>
          <button onClick={handleSendMsg} className={style.sendMessageBtn}>
            Send
          </button>
        </div>
      </div>
      <div className={style.profileSection}>
        <div className={style.matchedUserProfilePictures}></div>
        <div className={style.profileBasicInfo}>
          <div className={style.nameAge}>
            <span className={style.name}>{buddy.username}</span>
            <span className={style.age}>{buddy.age}</span>
          </div>
          <span>{buddy?.location? buddy.location : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
