import style from './ChatPath.module.css'
import noPhoto from "../../images/noPhoto.jpg";
import { findChat } from '../../server/server';
import {setChatBuddy} from "../../store/ChatBuddySlice"
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/exports';
import Badge from '@mui/material/Badge';

export default function ChatPath(props){
    const user = useSelector(state => state.activeUser);
    const buddy = props.buddy;
    const dispatch = useDispatch();
    
    let chat = findChat(props.buddy);
    const history = chat.chatHistory;

    const handleChat = ()=>{
        dispatch(setChatBuddy(buddy))
    }

    const unreadCount = ()=>{
        if(history.length > 0 && history[history.length - 1].seen === false){
           const counter = history.reduce((count, msg) => {
                if(msg.seen === false && msg.sender !== user.email){
                    count+=1;
                }
                return count;
            }, 0)
            return  <Badge className={style.msgBadge} badgeContent={counter} color="error" />;
        }
    }

    const unseenMsgStyle = ()=>{
        if(history.length > 0){
            if(history[history.length-1].sender !== user.email&&history[history.length-1].seen === false){
                
                return style.lastMessageUnseen;
            } else {
              return style.lastMessage;
             
            }
        }
        return style.lastMessage;
    }

    return (
        <div onClick={handleChat} className={style.chatPath}>
            <div style={{position:"relative"}}>
            {unreadCount()}
            <img className={style.chatWithPic} alt="img" src={props.buddy?.pictures[0]?.img || noPhoto}></img>
            </div>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>{props.buddy.username}</span>
                <span className={unseenMsgStyle()}>{history.length > 0 ? history[history.length-1].text :  "no messages"}</span>
            </div>
        </div>
    )
}