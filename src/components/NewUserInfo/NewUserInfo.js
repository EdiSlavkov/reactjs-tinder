import { useState } from 'react'
import style from './NewUserInfo.module.css'



export default function NewUserInfo() {
    const [UserDetails, setUserDetails] = useState({
        phoneNumber: '',
        userName: '',
        genderPreference: '',
        location: '',
        agePreference: [],
        distancePreference: '',
        profileDescription: '',
        zodiacSign: '',
        smoking: '',
        pets: '',
        gender: '',
        sexualOrientation: ''
    });

    return (
        <div>
            <form>
                <section>
                    <label htmlFor='Username'>Username:</label>
                    <input id='Username'></input>
                    <label htmlFor='PhoneNumber'>Phone number:</label>
                    <input id='PhoneNumber'></input>
                    
                </section>
            </form>
        </div>
    )

}