import style from "./ChatWithUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { updateChat } from "../../store/ActiveUserSlice";
import { findChat } from "../../server/server";
import Message from "../../classes/Message";
import noPhoto from "../../images/noPhoto.jpg";
import ImagesCarousel from '../DetailedActiveUserCard/ImagesCarousel'
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";

export default function ChatWithUser(props) {
	let chat = findChat(props.buddy);

	const toBottomReff = useRef(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.activeUser);
	const [message, setMessage] = useState("");
	const [displayEmojis, setDisplayEmojis] = useState(false)


	const scrollToBottom = () => {
		if(toBottomReff.current){
		return toBottomReff.current.scrollIntoView({ behavior: "smooth" })
		}
	  }

	useEffect(scrollToBottom, [message]);
	

	const addEmoji = (e) => {

	setMessage(message + e.emoji)

	}

	const handleSendMsg = (e) => {
		e.preventDefault();
		if(message.trim() !== ""){

		const newDate = Date();
		const date = newDate.slice(4, 24);
		const msg = new Message(user.email, message, date, false);
		chat.chatHistory.push(msg);
		dispatch(updateChat([JSON.stringify(props.buddy), JSON.stringify(chat)]))
		setMessage("");
		}
		setMessage("");
		
	};
	return (
		props.buddy.username ?
			<div className={style.chatWithUserContainer}>
				<div className={style.chatSection}>
					<div className={style.avatarAndName}>
						<img src={props.buddy?.pictures[0].img || noPhoto} className={style.chatUserProfilePic} alt="buddyPic"></img>
						<span>{props.buddy.username}</span>
					</div>
					<div onClick={scrollToBottom} className={style.chatMessagesContainer}>
						{chat.chatHistory.map((msg, i) => {
							if (msg.sender === user.email) {
								return (
									<div ref={toBottomReff} key={i} className={style.sentMessageWrap}>
										<span className={style.sentMessage}>
											{msg.text}
										</span>
										<span className={style.sentDate}>
											{msg.date}
										</span>
									</div>
								);
							} else {
								return (
									<div ref={toBottomReff} key={i} className={style.receivedMessageWrap}>
										<span className={style.receivedMessage}>
											{msg.text}
										</span>
										<span className={style.receivedDate}>
											{msg.date}
										</span>
									</div>
								);
							}
						})}
					</div>
					<div className={style.sendMessageSection}>
					<GrEmoji className={style.emojiBtn} onClick={() => setDisplayEmojis(!displayEmojis)}/>
					{displayEmojis ? <div className={style.emojiContainer} onMouseLeave={() => setDisplayEmojis(!displayEmojis)}>
						<EmojiPicker className={style.emojiContainer}
							emojiStyle='native'
							onEmojiClick={(e) => addEmoji(e)}
						/>
						</div> : null}
						<form style={{width:"100%"}} onSubmit={handleSendMsg}>
						<input
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							className={style.typeMessageInput}
							placeholder={"Type a message"}
						></input>
						<button onClick={handleSendMsg} className={style.sendMessageBtn}>
							Send
						</button>
						</form>
						
					</div>
				</div>
				<div className={style.profileSection}>
					<div className={style.matchedUserProfilePictures}>
						<ImagesCarousel user={props.buddy} />
					</div>
					<div className={style.profileBasicInfo}>
						<div className={style.nameAge}>
							<span className={style.name}>{props.buddy.username}</span>
							<span className={style.age}>{props.buddy.age}</span>
						</div>
						<span>{props.buddy?.location ? props.buddy.location : "N/A"}</span>
						<div className={style.matchedUserDescription}>{props.buddy.description}</div>

					</div>
				</div>
			</div> :
			<div className={style.noChat}>No active chats available</div>
	);
}
