import { useState } from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import style from './MatchMessageBTN.module.css'


export default function MatchMessageBTN(props){
    const [selectedBtn, setSelectedBtn] = useState('Matches')
    const options = ['Matches', 'Chat']
    const ClickHandler = (option) => {
        setSelectedBtn(option)
    }
    const buttons = options.map(btn => (
        <button
            key={btn}
            className={selectedBtn === btn ?style.ActiveBTN :  style.InactiveBTN
            }
            onClick={() => ClickHandler(btn)}
        >
        {btn}
        </button>
    ))



    return (
        buttons
    )
}