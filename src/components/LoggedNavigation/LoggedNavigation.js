import { TbListSearch } from "react-icons/tb";
import { RiHeartFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import style from './LoggedNavigation.module.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileLogo from "../../images/profile_placeholder.png"



export default function LoggedNavigation() {
    

    const user = useSelector(state => state.activeUser)


    return (<div className={style.navigationController}>


        <NavLink to='/app/profile' className={({ isActive }) =>
              isActive ? style.linkProfileActive : style.linkProfileInactive}>
            <img src={profileLogo} className={style.profileImg} alt="img"></img>
            {user.email}
        </NavLink>
        <NavLink to='/app/explore' className={({ isActive }) =>
              isActive ? style.linkBtnActive : style.linkBtnInactive}>
            <TbListSearch className={style.navButtonInactive}></TbListSearch>
        </NavLink>
        <NavLink to='/app/recs' className={({ isActive }) =>
              isActive ? style.linkBtnActive : style.linkBtnInactive}>
            <RiHeartFill className={style.navButtonInactive}></RiHeartFill>
        </NavLink>
    </div>)

}