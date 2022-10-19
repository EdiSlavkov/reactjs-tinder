import style from './ProfileCard.module.css'
import SwipeCard from '../SwipeCard/SwipeCard'
import { BiBuildings } from "react-icons/bi";


export default function ProfileCard(props) {

    const handleProfileEdit = ()=>{props.editProfile(true)};

    return (
        <div className={style.ProfileContainer}>
            <div className={style.ProfileCard}>
                <div className={style.ProfilePhotoContainer}>
                    <SwipeCard className={style.ProfilePicture}></SwipeCard>
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
            </div>
        </div>
    )
}