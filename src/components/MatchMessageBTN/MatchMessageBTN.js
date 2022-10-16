import style from './MatchMessageBTN.module.css'


export default function MatchMessageBTN(props){
    return (
        <button className={style.MatchMessageBTN}>{props.content}</button>
    )
}