import style from './DetailedActiveUserCard.module.css'
import { FaPaw } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { IoSchoolOutline } from "react-icons/io5";
import { RiMoonClearLine, RiBuilding2Line } from "react-icons/ri";
import ImagesCarousel from "./ImagesCarousel";
import { useSelector } from 'react-redux';
import { MdOutlineWorkOutline } from "react-icons/md";
import VerifiedIcon from '@mui/icons-material/Verified';
import React, { useState, useEffect } from "react";
import { AiOutlineInfo } from "react-icons/ai";
import { IoMdArrowRoundDown } from "react-icons/io";
import {reveal} from "../../store/DetailedInfoSlice";
import { useDispatch } from "react-redux";

export default function DetailedActiveUserCard(props) {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false)

    useEffect(()=>{
        dispatch(reveal())
    })

    const user = useSelector(state=>state.activeUser)
    return (
        // same parameters as 1st look
        <div className={!show&&style.frame}>
            <div className={show ? style.detailedInfoContainer : style.detailedInfoContainerSmall}>
                <div className={style.mainWrapper}>
                    <ImagesCarousel user={user}/>
                    {show ? <IoMdArrowRoundDown onClick={()=>{
                        setShow(false) 
                        dispatch(reveal())}} className={style.fullInfoBtn}/> : <AiOutlineInfo onClick={()=>setShow(true)} className={style.InfoBtn}/>}
                    {!show&&<div className={style.infoWrapper}>
                        <div className={style.nameAgeInfo}>
                            <span className={style.name}>
                                {props.user?.username ? props.user.username : " "}
                            </span>
                            <span className={style.age}>{props.user?.age}</span>
                            
                        </div>
                        <div className={style.passionContainer}>
                            <div className={style.passionListInfo}>
                                {props.user?.passions.map((passion,i) => i < 5&&<span key={i} className={style.passionItemInfo}>{passion}</span>)}
                            </div>
                            
                        </div> 
                        </div>}
                </div>
            {show ? 
                <>
                                            <div className={style.nameAge}>
                            <span className={style.name}>
                                {props.user?.username ? props.user.username : " "}
                            </span>
                            <span className={style.age}>{props.user?.age}</span>
                            {props.user?.verified[0]? <VerifiedIcon className={style.verifiedIcon}/> : <VerifiedIcon className={style.unVerifiedIcon}/>}
                        </div>
                        <span className={style.location}>{props.user?.location}</span>
                        <div className={style.userDescription}>{props.user?.description}</div>
                        <div className={style.basicInfo}>
                        <span className={style.info}>
                            <IoSchoolOutline/>
                            {props.user?.school}
                        </span>
                        <span className={style.info}>
                        <MdOutlineWorkOutline/>
                            {props.user?.job}
                        </span>
                        <span className={style.info}>
                        <RiBuilding2Line/>
                            {props.user?.company}
                        </span>
                            <span className={style.info}>
                                <RiMoonClearLine />
                                
                                {props.user?.zodiacSign}
                            </span>
                            <span className={style.info}>
                                <FaPaw />
                                {props.user?.pet}
                            </span>
                            <span className={style.info}>
                                <GiCigarette />
                                {props.user?.smoking}
                            </span>
                        </div>
                        <div className={style.passionContainer}>
                            <h5>Passions</h5>
                            <div className={style.passionList}>
                                {props.user?.passions.map((passion,i) => <span key={i} className={style.passionItem}>{passion}</span>)}
                            </div>
                        </div> 
                </>:
                        <></>
            }
            </div>
        </div>

    )
}