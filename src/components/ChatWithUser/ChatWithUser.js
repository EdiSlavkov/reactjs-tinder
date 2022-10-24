import style from './ChatWithUser.module.css'


export default function ChatWithUser(props) {


    return (
        <div className={style.chatWithUserContainer}>
            <div className={style.chatSection}>
                <div className={style.avatarAndName}>
                    <img className={style.chatUserProfilePic}></img>
                    <span>Gencho</span>
                </div>
                <div className={style.chatMessagesContainer}>
                    <span className={style.receivedMessage}>Tuka pisha neshto na mackite</span>
                    <span className={style.sentMessage}>Tuka pisha neshto na mackite</span>
                </div>
                <div className={style.sendMessageSection}>
                    <input className={style.typeMessageInput} placeholder={'Type a message'}></input>
                    <button className={style.sendMessageBtn}>Send</button>
                </div>
            </div>
            <div className={style.profileSection}>
                <div className={style.matchedUserProfilePictures}></div>
                <div className={style.profileBasicInfo}>
                    <div className={style.nameAge}>
                        <span className={style.name}>
                            Gencho,
                        </span>
                        <span className={style.age}>15</span>
                    </div>
                    <span>location</span>
                </div>
            </div>
        </div>
    )
}