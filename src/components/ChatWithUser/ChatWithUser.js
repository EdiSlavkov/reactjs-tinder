import style from "./ChatWithUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeUserData, temporaryData } from "../../store/ActiveUserSlice";
import { findChat } from "../../server/server";
import Message from "../../classes/Message";
import notVerified from "../../images/notVerified.png";

export default function ChatWithUser(props) {
    
  const chatHistory = findChat(props.buddy);
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
          <img src={props.buddy?.pictures[0] || notVerified} className={style.chatUserProfilePic} alt="buddyPic"></img>
          <span>{props.buddy.username}</span>
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
            <span className={style.name}>{props.buddy.username}</span>
            <span className={style.age}>{props.buddy.age}</span>
          </div>
          <span>{props.buddy?.location? props.buddy.location : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
