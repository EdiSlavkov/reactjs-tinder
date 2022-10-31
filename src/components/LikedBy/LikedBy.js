import style from './LikedBy.module.css';

export default function LikedBy(props) {

    return (
        <div style={{ height: 'fit-content' }}>
            <img src={props.imageSrc} className={style.likedByPic} alt="img"></img>
        </div>
    )
}