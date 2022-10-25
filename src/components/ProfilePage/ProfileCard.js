import style from './ProfileCard.module.css'
import SwipeCard from '../SwipeCard/SwipeCard'
import { BiBuildings } from "react-icons/bi";
import { useSelector } from 'react-redux';
import DetailedActiveUserCard from '../DetailedActiveUserCard/DetailedActiveUserCard';

export default function ProfileCard(props) {

    const handleProfileEdit = ()=>{props.editProfile(true)};
    const user = useSelector(state=>state.activeUser)
    const {username,gender,age,zodiacSign,pictures,pet,
    smoking,description,passions,phone} = user;

    const values = [username,gender,age,zodiacSign,pictures,pet,
      smoking,description,passions,phone];
    const persentage = values.reduce((acc, value) => {
      if(value !== "" && value[0] !== undefined){
        acc+=1;
      }
      return acc;
    }, 0)

    return (
              <div className={style.wrapper}>
                 <DetailedActiveUserCard user={user}/>
                <button onClick={handleProfileEdit} className={style.EditBTN}>Edit Info <span style={{fontSize:"12px"}}>({(persentage / values.length) * 100} %)</span></button>
              </div>

    )
}