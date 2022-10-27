import style from './ChatPath.module.css'
import noPhoto from "../../images/noPhoto.jpg";
import { findChat } from '../../server/server';
import {setChatBuddy} from "../../store/ChatBuddySlice"
import { useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';

export default function ChatPath(props){
    const buddy = props.buddy
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setChatBuddy(buddy))
    },[])
    const handleChat = ()=>{
        dispatch(setChatBuddy(buddy))
    }
    
    const chat = findChat(props.buddy);
    const history = chat.chatHistory.map(e=> JSON.parse(e));

    return (
        <div onClick={()=>handleChat()} className={style.chatPath}>
            <img className={style.chatWithPic} src={props.buddy.pictures[0].img || noPhoto}></img>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>{props.buddy.username}</span>
                <span className={style.lastMessage}>{history.length > 0 ? history[history.length-1].text :  "no messages"}</span>
            </div>
        </div>
    )
}