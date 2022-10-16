import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import ProfilePreference from "../ProfilePreference/ProfilePreference";
import {AgeSliderComponent, DistanceSliderComponent} from "../SliderComponent/SliderComponent";
import SwipeCard from "../SwipeCard/SwipeCard";
import Switch from "../Switch/Switch";
import style from './ProfilePage.module.css'






export default function ProfilePage(){


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
                    <div style={{padding: '15px', backgroundColor: 'white', margin: '2px'}}>
                        <label htmlFor="AgeSlider">Age Preference</label>
                        <AgeSliderComponent id='AgeSlider'></AgeSliderComponent>
                    </div>
                    <div style={{padding: '15px', backgroundColor: 'white', margin: '1px 0'}}>
                        <label htmlFor="DistanceSlider">Distance Preference</label>
                        <DistanceSliderComponent id='DistanceSlider'></DistanceSliderComponent>
                    </div>
                </div>
            </div>
            <SwipeCard>
            </SwipeCard>

        </div>
    )
}