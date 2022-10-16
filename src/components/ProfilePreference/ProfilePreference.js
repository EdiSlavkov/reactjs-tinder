import style from './ProfilePreference.module.css'

export default function ProfilePreference(props){
    return(
        <div className={style.preference}>
            <label htmlFor= {props.component}>{props.placeholder}</label>
            <span id={props.component} className={style.prefContent}>{props.component}</span>
        </div>
    )
}