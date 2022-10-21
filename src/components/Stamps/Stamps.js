import style from './Stamps.module.css'



export  function LikeStamp(){
    

    return(
        <span className={style.likeStamp}>LIKE</span>
    )
}

export  function NopeStamp(){
    

    return(
        <span className={style.nopeStamp}>NOPE</span>
    )
}

export  function SuperLikeStamp(){
    

    return(
        <span className={style.superLikeStamp}>SUPER LIKE</span>
    )
}
