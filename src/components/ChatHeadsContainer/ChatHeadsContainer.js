import style from './ChatHeadsContainer.module.css'
import { useSelector } from "react-redux";
import LikedBy from '../LikedBy/LikedBy';
import { findWhoLikesMe } from '../../server/server'



export default function ChatHeadsContainer() {
    const likedByUsers = findWhoLikesMe()
    const activeChat = useSelector(state => state.activeChat.ChatBtnActive);
    const chatContainer = (<div className={style.chatsContainer}>

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