import style from './ChatPath.module.css'
import noPhoto from "../../images/noPhoto.jpg";
import { findChat } from '../../server/server';
import {setChatBuddy} from "../../store/ChatBuddySlice"
import { useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { updateChat } from '../../store/ActiveUserSlice';
import { useSelector } from 'react-redux/es/exports';

export default function ChatPath(props){
    const user = useSelector(state => state.activeUser)
    const buddy = props.buddy
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setChatBuddy(buddy))
    },[])
    
    let chat = findChat(props.buddy);
    const history = chat.chatHistory;

    const handleChat = ()=>{
        dispatch(setChatBuddy(buddy))
        let copyHistory = history.map(msg => {
            msg.seen = true;
            return msg;
        })
        chat.chatHistory = copyHistory;
        dispatch(updateChat([JSON.stringify(buddy), JSON.stringify(chat)]))
    }

    const unseenMsgStyle = ()=>{
        if(history.length > 0){
            if(history[history.length-1].sender !== user.email&&history[history.length-1].seen === false){
                
                return style.lastMessageUnseen
            } else {
              return style.lastMessage;
             
            }
        }
        return style.lastMessage;
    }

    return (
        <div onClick={handleChat} className={style.chatPath}>
            <img className={style.chatWithPic} src={props.buddy.pictures[0].img || noPhoto}></img>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>{props.buddy.username}</span>
                <span className={unseenMsgStyle()}>{history.length > 0 ? history[history.length-1].text :  "no messages"}</span>
            </div>
        </div>
    )
}