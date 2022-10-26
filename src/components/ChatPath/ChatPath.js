import style from './ChatPath.module.css'

export default function ChatPath(props){


    return (
        <div className={style.chatPath}>
            <img className={style.chatWithPic} src='https://th-thumbnailer.cdn-si-edu.com/vU5xtHYj5PvGHFa47Ijb5Mf4EEs=/fit-in/1600x0/filters:focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg'></img>
            <div className={style.nameAndLastMessage}>
                <span className={style.chatWithName}>Kevin</span>
                <span className={style.lastMessage}>this is the last message someone sent</span>
            </div>
        </div>
    )
}