import style from './ChatPath.module.css'
import noPhoto from "../../images/noPhoto.jpg";
import { useSelector } from 'react-redux/es/exports';
import { findChat } from '../../server/server';
import {toggleChat} from "../../store/ChatToggleSlice"
import {setChatBuddy} from "../../store/ChatBuddySlice"
import { useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';

export default function ChatPath(props){
    const buddy = props.buddy
    const dispatch = useDispatch()
    const activeChat = useSelector(state => state.activeChat.ChatBtnActive)

    useEffect(()=>{
        dispatch(setChatBuddy(buddy))
    },[])

    const handleChat = ()=>{

        dispatch(setChatBuddy(buddy))
        // dispatch(toggleChat())
        
    }
    
    const chat = findChat(props.buddy);
    const history = chat.chatHistory.map(e=> JSON.parse(e));

    return (
        <div onClick={()=>handleChat()} className={style.chatPath}>
            <img className={style.chatWithPic} src={props.buddy.pictures[0].img || noPhoto}></img>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>{props.buddy.username}</span>
                <span className={style.lastMessage}>{history[history.length-1].text ||  "no messages"}</span>
            </div>
        </div>
    )
}