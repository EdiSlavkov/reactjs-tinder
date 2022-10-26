import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import ProfilePreference from "../ProfilePreference/ProfilePreference";
import { AgeSliderComponent, DistanceSliderComponent } from "../SliderComponent/SliderComponent";
import { update } from "../../store/ActiveUserSlice";
import Switch from "../Switch/Switch";
import style from './ProfilePage.module.css'
import ProfileCard from "./ProfileCard";
import { useState, useEffect } from "react";
import NewUserInfo from "../NewUserInfo/NewUserInfo";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkUserData } from "../../server/server";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

    const user = useSelector(state => state.activeUser);
    const [editProfile, setEditProfile] = useState(false);
    const [showErr, setShowErr] = useState(checkUserData());
    const navigate = useNavigate();

    const handleLogout = ()=>{
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
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '2px' }}>
                        <label htmlFor="AgeSlider">Age Preference</label>
                        <span className={style.agePreference}>{`${user.agePreference[0]} - ${user.agePreference[1]} years`}</span>
                        <AgeSliderComponent id='AgeSlider'></AgeSliderComponent>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '1px 0' }}>
                        <label htmlFor="DistanceSlider">Distance Preference</label>
                        <span className={style.distancePreference}>{`${user.distancePreference} km`}</span>
                        <DistanceSliderComponent id='DistanceSlider'></DistanceSliderComponent>
                    </div>
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