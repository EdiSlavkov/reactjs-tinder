import { useState } from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import style from './MatchMessageBTN.module.css'
import { useSelector, useDispatch } from "react-redux";
import { toggleChat } from '../../store/ChatToggleSlice';



export default function MatchMessageBTN() {
    const dispatch = useDispatch()
    const chatToggle = useSelector(state => state.activeChat.ChatBtnActive)
    const handleDispatch = (e) => {
        if (e === 'matches' && chatToggle) {
            dispatch(toggleChat())
        } else if (e === 'Messages' && !chatToggle) {
            dispatch(toggleChat())
        }
    }


    return (
        <div className={style.matchButtonsContainer}>
            <button
                className={chatToggle ? style.InactiveBTN : style.ActiveBTN
                }
                onClick={() => handleDispatch('matches')}
            >
                Matches
            </button>
            <button
                className={chatToggle ? style.ActiveBTN : style.InactiveBTN
                }
                onClick={() => handleDispatch('Messages')}
            >
                Messages
            </button>
        </div>
    )
}