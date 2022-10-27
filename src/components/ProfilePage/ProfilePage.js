import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import ProfilePreference from "../ProfilePreference/ProfilePreference";
import Switch from "../Switch/Switch";
import style from './ProfilePage.module.css'
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import NewUserInfo from "../NewUserInfo/NewUserInfo";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkUserData } from "../../server/server";
import { useNavigate } from "react-router-dom";
import { setChatBuddy } from "../../store/ChatBuddySlice";

export default function ProfilePage() {

    const user = useSelector(state => state.activeUser);
    const [editProfile, setEditProfile] = useState(false);
    const [showErr, setShowErr] = useState(checkUserData());
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(setChatBuddy({}))
        logout();
        navigate("/")
    }

    return (
        <>
        {showErr ? null : <span className={style.profileErr}>Please fill required information to unlock all pages!</span>}
        <div className={style.ProfilePage}>
            <div className={style.LoggedNavigation}>
                <LoggedNavigation show={()=>setEditProfile(false)}></LoggedNavigation>
                <div className={style.ProfilePreferences}>
                    <h6 className={style.heading}>ACCOUNT SETTINGS</h6>
                    <ProfilePreference component={user.email} placeholder={'Email'}></ProfilePreference>
                    <ProfilePreference component={user.phone} placeholder={'Phone Number'}></ProfilePreference>
                    <h6 className={style.heading}>DISCOVERY SETTINGS</h6>
                    <ProfilePreference component={<Switch></Switch>} placeholder={'Location'}></ProfilePreference>
                    <ProfilePreference component={user.username} placeholder={'Username'}></ProfilePreference>
                    <ProfilePreference component={user.genderPreference} placeholder={'Looking for'}></ProfilePreference>
                    <h6 className={style.heading}>ABOUT {user.username}</h6>
                    <ProfilePreference component={<div style={{display:'flex', flexDirection: 'column', wordBreak: "break-word"}}>
                        <div>{user.description}</div>
                    </div>} placeholder={''}></ProfilePreference>
                    <ProfilePreference component={user.zodiacSign} placeholder={'Zodiac sign'}></ProfilePreference>
                    <ProfilePreference component={user.smoking} placeholder={'Smoking'}></ProfilePreference>
                    <ProfilePreference component={user.pet} placeholder={'Pets'}></ProfilePreference>
                    <ProfilePreference component={user.gender} placeholder={'Gender'}></ProfilePreference>
                    <div onClick={handleLogout} className={style.logoutBtn} ><ProfilePreference placeholder={'Logout'}></ProfilePreference></div>
                    
                </div>
            </div>
            {editProfile ? <NewUserInfo showErr={setShowErr}/> : <ProfileCard editProfile={setEditProfile}/>}
        </div>
        </>
    )
}