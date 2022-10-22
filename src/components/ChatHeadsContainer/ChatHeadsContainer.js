import style from './ChatHeadsContainer.module.css'
import { useSelector } from "react-redux";


export default function ChatHeadsContainer() {

    const activeChat = useSelector(state => state.activeChat.ChatBtnActive);
    const chatContainer = (<div className={style.chatsContainer}>
        
    </div>)
    const matchesContainer = <div className= {style.headsContainer}>
            
    </div>

    const element = (activeChat ? chatContainer : matchesContainer)


    return (
        element
    )
}