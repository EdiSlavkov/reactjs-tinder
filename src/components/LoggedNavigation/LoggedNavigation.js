import { TbListSearch } from "react-icons/tb";
import { RiHeartFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import style from './LoggedNavigation.module.css'
import { useSelector } from "react-redux";
import profileLogo from "../../images/profile_placeholder.png"



export default function LoggedNavigation(props) {
    

    const user = useSelector(state => state.activeUser)


    return (<div className={style.navigationController}>


        <NavLink to='/app/profile' onClick={props.show} className={({ isActive }) =>
              isActive ? style.linkProfileActive : style.linkProfileInactive}>
            {user?.pictures[0] ? <img src={user?.pictures[0].img} className={style.profileImg} alt="img"></img> : <img src={profileLogo} className={style.profileImg} alt="img"></img>}
            {user?.username&&user?.username}
        </NavLink>
        <NavLink to='/app/explore' style={{position: "fixed", left: "173px"}} className={({ isActive }) =>
              isActive ? style.linkBtnActive : style.linkBtnInactive}>
            <TbListSearch className={style.navButtonInactive}></TbListSearch>
        </NavLink>
        <NavLink to='/app/recs'  style={{position: "fixed", left: "318px"}}  className={({ isActive }) =>
              isActive ? style.linkBtnActive : style.linkBtnInactive}>
            <RiHeartFill className={style.navButtonInactive}></RiHeartFill>
        </NavLink>
    </div>)

}