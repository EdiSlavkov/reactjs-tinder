import style from './ChatHeadsContainer.module.css'
import { useSelector } from "react-redux";
import LikedBy from '../LikedBy/LikedBy';
import { findBuddy, findWhoLikesMe } from '../../server/server'
import ChatPath from '../ChatPath/ChatPath';
import { useDispatch } from 'react-redux/es/exports';
import { setChatBuddy } from '../../store/ChatBuddySlice';

export default function ChatHeadsContainer() {
    const activeChat = useSelector(state => state.activeChat.ChatBtnActive);
    const user = useSelector(state => state.activeUser)
    const dispatch = useDispatch();

    const handleChat = (buddy)=>{
        dispatch(setChatBuddy(buddy))}

    const likedByUsers = findWhoLikesMe()

    const chatContainer = (<div className={style.chatsContainer}>
        
        {user.MatchedPeople.map((person, i) => {
            const buddy = findBuddy(person);
            return <div key={i} onClick={()=>{handleChat(buddy)}}><ChatPath buddy={buddy} key={i}/></div>
        })}

    </div>)

    const matchesContainer = <div className={style.headsContainer}>
        {likedByUsers.map((user, i) => {
            
            const likedBy = user?.pictures?.length > 0 ? user.pictures[0].img : '/static/media/noPhoto.aebbaa5ea57e0872d705.jpg';
            return <LikedBy key={i} imageSrc={likedBy} />
        })}
    </div>

    const element = (activeChat ? chatContainer : matchesContainer)


    return (
        element
    )
}