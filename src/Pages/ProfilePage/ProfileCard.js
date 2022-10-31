import style from './ProfileCard.module.css';
import { useSelector } from 'react-redux';
import DetailedActiveUserCard from '../../components/DetailedActiveUserCard/DetailedActiveUserCard';

export default function ProfileCard(props) {

    const handleProfileEdit = ()=>{props.editProfile(true)};
    const user = useSelector(state=>state.activeUser);
    const {username,gender,age,zodiacSign,pictures,pet,
    smoking,description,passions,phone} = user;

    const values = [username,gender,age,zodiacSign,pictures,pet,
      smoking,description,passions,phone];
    const percentage = values.reduce((acc, value) => {
      if(value !== "" && value[0] !== undefined){
        acc+=1;
      }
      return acc;
    }, 0)

    return (
              <div className={style.wrapper}>
                 <DetailedActiveUserCard user={user}/>
                <button onClick={handleProfileEdit} className={style.EditBTN}>Edit Info <span style={{fontSize:"12px"}}>({(percentage / values.length) * 100} %)</span></button>
              </div>
    )
}