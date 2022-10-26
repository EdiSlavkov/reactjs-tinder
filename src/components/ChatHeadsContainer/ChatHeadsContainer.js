import style from './ChatHeadsContainer.module.css'
import { useSelector } from "react-redux";
import LikedBy from '../LikedBy/LikedBy';
import { findWhoLikesMe } from '../../server/server'
import ChatPath from '../ChatPath/ChatPath';
import { useDispatch } from 'react-redux/es/exports';
import { setChatBuddy } from '../../store/ChatBuddySlice';

export default function ChatHeadsContainer() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.activeUser)
    const likedByUsers = findWhoLikesMe()
    const activeChat = useSelector(state => state.activeChat.ChatBtnActive);
    const chatContainer = (<div className={style.chatsContainer}>
        {user.MatchedPeople.map(person => <ChatPath onClick={handleChatWindow(person)}/>)}
    </div>)

    const handleChatWindow = (buddy)=>{
        dispatch(setChatBuddy(buddy));
    }   



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