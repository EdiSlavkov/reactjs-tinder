import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import ProfilePreference from "../ProfilePreference/ProfilePreference";
import { AgeSliderComponent, DistanceSliderComponent } from "../SliderComponent/SliderComponent";
import Switch from "../Switch/Switch";
import style from './ProfilePage.module.css'
import ProfileCard from "./ProfileCard";






export default function ProfilePage() {


    return (
        <div className={style.ProfilePage}>
            <div className={style.LoggedNavigation}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.ProfilePreferences}>
                    <h6 className={style.heading}>ACCOUNT SETTINGS</h6>
                    <ProfilePreference component={'magnum91@abv.bg'} placeholder={'Email'}></ProfilePreference>
                    <ProfilePreference component={'0888888888'} placeholder={'Phone Number'}></ProfilePreference>
                    <h6 className={style.heading}>DISCOVERY SETTINGS</h6>
                    <ProfilePreference component={<Switch></Switch>} placeholder={'Location'}></ProfilePreference>
                    <ProfilePreference component={'Magnumche'} placeholder={'Username'}></ProfilePreference>
                    <ProfilePreference component={'Women'} placeholder={'Looking for'}></ProfilePreference>
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '2px' }}>
                        <label htmlFor="AgeSlider">Age Preference</label>
                        <AgeSliderComponent id='AgeSlider'></AgeSliderComponent>
                    </div>
                    <div style={{ padding: '15px', backgroundColor: 'white', margin: '1px 0' }}>
                        <label htmlFor="DistanceSlider">Distance Preference</label>
                        <DistanceSliderComponent id='DistanceSlider'></DistanceSliderComponent>
                    </div>
                    <ProfilePreference component={<div style={{display:'flex', flexDirection: 'column'}}>
                        <h6 className={style.heading}>ABOUT Гъргулин</h6>
                        <div>Mamaaa,
                            Just killed a man, Put a gun against his head, pulled my trigger,Now he's dead
                            Mamaaa, life had just begun,
                            But now I've gone and thrown it all away</div>
                    </div>} placeholder={''}></ProfilePreference>
                    <ProfilePreference component={'Libra'} placeholder={'Zodiac sign'}></ProfilePreference>
                    <ProfilePreference component={'Non-smoker'} placeholder={'Smoking'}></ProfilePreference>
                    <ProfilePreference component={'Ants'} placeholder={'Pets'}></ProfilePreference>
                    <ProfilePreference component={'Man'} placeholder={'Gender'}></ProfilePreference>
                    <ProfilePreference component={'Straight'} placeholder={'Sexual Orientation'}></ProfilePreference>





                </div>
            </div>
            <ProfileCard></ProfileCard>


        </div>
    )
}