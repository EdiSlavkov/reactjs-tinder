import { TbListSearch } from "react-icons/tb";
import { RiHeartFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import style from './LoggedNavigation.module.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



export default function LoggedNavigation() {

    const activeUser = useSelector(state => state.activeUser)
    return (<div className={style.navigationController}>


        <NavLink to='/app/profile' className={({ isActive }) =>
              isActive ? style.linkProfileActive : style.linkProfileInactive}>
            <img src='https://pfpmaker.com/_nuxt/img/profile-2.d5d0ad9.png' style={{ width: '40px', marginRight: '3px' }} alt="img"></img>
            {activeUser.userName}
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