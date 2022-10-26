import style from './ChatPath.module.css'
import noPhoto from "../../images/noPhoto.jpg";
import { useSelector } from 'react-redux/es/exports';
import { findChat } from '../../server/server';

export default function ChatPath(){
    
    const buddy = useSelector(state => state.chatBuddy);

    const chat = findChat(buddy);

    return (
        <div className={style.chatPath}>
            <img className={style.chatWithPic} src={buddy.pictures[0] || noPhoto}></img>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>{buddy.username}</span>
                <span className={style.lastMessage}>{chat[chat.length-1]}</span>
            </div>
        </div>
    )
}