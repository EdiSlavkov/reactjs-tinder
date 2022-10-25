import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import ProfilePreference from "../ProfilePreference/ProfilePreference";
import { AgeSliderComponent, DistanceSliderComponent } from "../SliderComponent/SliderComponent";
import Switch from "../Switch/Switch";
import style from './ProfilePage.module.css'
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import NewUserInfo from "../NewUserInfo/NewUserInfo";
import { useSelector, useDispatch } from "react-redux";
import { temporaryData, changeUserData } from "../../store/ActiveUserSlice";
import { logout } from "../../server/server";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {


    const user = useSelector(state => state.activeUser);
    const dispatch = useDispatch();
    const [editProfile, setEditProfile] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = ()=>{
        logout();
        navigate("/")
    }

    return (
        <div className={style.ProfilePage}>
            <div className={style.LoggedNavigation}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.ProfilePreferences}>
                    <h6 className={style.heading}>ACCOUNT SETTINGS</h6>
                    <ProfilePreference component={user.email} placeholder={'Email'}></ProfilePreference>
                    <ProfilePreference component={user.phone} placeholder={'Phone Number'}></ProfilePreference>
                    <h6 className={style.heading}>DISCOVERY SETTINGS</h6>
                    <ProfilePreference component={<Switch></Switch>} placeholder={'Location'}></ProfilePreference>
                    <ProfilePreference component={user.username} placeholder={'Username'}></ProfilePreference>
                    <ProfilePreference component={user.genderPreference} placeholder={'Looking for'}></ProfilePreference>
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '2px' }}>
                        <label htmlFor="AgeSlider">Age Preference</label>
                        <AgeSliderComponent id='AgeSlider'></AgeSliderComponent>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '1px 0' }}>
                        <label htmlFor="DistanceSlider">Distance Preference</label>
                        <DistanceSliderComponent id='DistanceSlider'></DistanceSliderComponent>
                    </div>
                    <ProfilePreference component={<div style={{display:'flex', flexDirection: 'column'}}>
                        <h6 className={style.heading}>ABOUT {user.username}</h6>
                        <div>{user.description}</div>
                    </div>} placeholder={''}></ProfilePreference>
                    <ProfilePreference component={user.zodiacSign} placeholder={'Zodiac sign'}></ProfilePreference>
                    <ProfilePreference component={user.smoking} placeholder={'Smoking'}></ProfilePreference>
                    <ProfilePreference component={user.pet} placeholder={'Pets'}></ProfilePreference>
                    <ProfilePreference component={user.gender} placeholder={'Gender'}></ProfilePreference>
                    <div onClick={handleLogout} className={style.logoutBtn} ><ProfilePreference placeholder={'Logout'}></ProfilePreference></div>
                    
                </div>
            </div>
            {editProfile ? <NewUserInfo/> : <ProfileCard editProfile={setEditProfile}/>}


        </div>
    )
}