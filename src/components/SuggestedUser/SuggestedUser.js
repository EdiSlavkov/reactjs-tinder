import style from './SuggestedUser.module.css'
import SwipeCard from '../SwipeCard/SwipeCard'
import { BiBuildings } from "react-icons/bi";
import { Children } from 'react';
import { LikeStamp, NopeStamp, SuperLikeStamp } from '../Stamps/Stamps'



export default function SuggestedUser(props) {

    const handleProfileEdit = () => { props.editProfile(true) };

    return (
        <div className={style.ProfileCard}>
            <div className={style.ProfilePhotoContainer}>
                <SwipeCard className={style.ProfilePicture} draggable='false'></SwipeCard>
            </div>
            <div style={{ fontSize: '30px' }}>
                <span className={style.ProfileName}>Гъргулин</span>
                <label className=''>29</label>
            </div>
            <span style={{ padding: '5px', fontSize: '18px' }}><BiBuildings />Lives in Sofia</span>
            <label className=''></label>
            <div className=''>
                <div className={style.ProfilePassions}>
                    <h6 style={{ fontWeight: '300' }}>Passions</h6>
                    <div className={style.PassionsContainer}>
                        <span className={style.Passion}>Outdoors</span>
                        <span className={style.Passion}>Craft Beer</span>
                        <span className={style.Passion}>Music</span>
                        <span className={style.Passion}>Travel</span>
                        <span className={style.Passion}>Reading</span>
                    </div>

                </div>
            </div>
            <button onClick={handleProfileEdit} className={style.EditBTN}>Edit Info</button>
            {props.dislike ? <NopeStamp/> : null}
            {props.like ? <LikeStamp /> : null}
            {props.superLike ? <SuperLikeStamp /> : null}

        </div>
    )
}