import style from './SuggestionsDashboard.module.css'
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation'
import BigCard from '../cards/BigCard'
import SmallCard from '../cards/SmallCard'
import MatchMessageBTN from '../MatchMessageBTN/MatchMessageBTN'
import bigCardImgOne from "../../images/bigCardBackground1.webp";
import bigCardImgTwo from "../../images/bigCardBackground2.webp";
import imgFreeTonight from "../../images/smallFreeTonightImg.webp";
import imgLetsBeFriends from "../../images/smallLetsBeFriendsImg.webp";
import imgDateNight from "../../images/smallDateNightImg.webp";
import imgBringe from "../../images/smallBringeWatchersImg.webp";
import imgGamers from "../../images/smallGamersImg.webp";
import imgSocialCauses from "../../images/smallSocialCausesImg.webp";
import imgCreatives from "../../images/smallCreativesImg.webp";
import imgBrunch from "../../images/smallBrunchImg.webp";
import imgFoodies from "../../images/smallLookingImg.webp";
import imgMusic from "../../images/smallMusicImg.webp";
import imgNature from "../../images/smallNatureLoversImg.webp";
import imgSporty from "../../images/smallSportyImg.webp";
import imgNightOut from "../../images/smallNightOutImg.webp";
import imgThrill from "../../images/smallThrillImg.webp";
import imgWander from "../../images/smallWanderLustImg.webp";
import imgSelfCare from "../../images/smallSelfCareImg.webp";
import ChatHeadsContainer from '../ChatHeadsContainer/ChatHeadsContainer'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react'
import LikeBtnsSuite from '../LikeBtnsSuite/LikeBtnsSuite'
import WorkingSuggestedUser from '../WorkingSuggestedUser/WorkingSuggestedUser'

export function Matches() {
    const [showCard, setShowCard] = useState(true)

    const [angle, setAngle] = useState(0)

    const [axisXMovementDistance, setAxisXMovementDistance] = useState(0)
    const [axisYMovementDistance, setAxisYMovementDistance] = useState(0)

    const [likeUser, setLikeUSer] = useState(false)
    const [disLikeUser, setDisLikeUser] = useState(false)
    const [superLikeUser, setSuperLikeUser] = useState(false)
    useEffect(() => {
        if (axisXMovementDistance || axisYMovementDistance) {
            setTimeout(setShowCard, 500)
        }
    }, [axisXMovementDistance, axisYMovementDistance])

    useEffect(() => {
        if (!showCard) {
            //reset stamps flags in case swithed from buttons
            setLikeUSer(false)
            setDisLikeUser(false)
            setSuperLikeUser(false)
            //align card in center
            setAxisXMovementDistance(0)
            setAxisYMovementDistance(0)
            //generate new card
            setShowCard(true)
        }
    }, [showCard])
    const incrementAngle = (offsetX) => {
        //getting the current position of the component and adjusting the angle 
        const newAngle = Math.floor(offsetX /= 20)
        setAngle(newAngle)
        console.log(newAngle);
    }
    const releaseDrag = () => {
        //actions after releasing the component
        setAngle(0)
        setLikeUSer(false)
        setDisLikeUser(false)
        setSuperLikeUser(false)
    }
    const animateSwipeCard = () => {
        // removing the card in the corresponding direction
        if (superLikeUser) {
            //function if we superLike the user
            superLikeThisUser()
        } else if (disLikeUser) {
            //function if we remove the user
            dislikeThisUser()
        } else if (likeUser) {
            //function if we like the user
            likeThisUser()
        }
    }

    const superLikeThisUser = () => {
        setSuperLikeUser(true)
        setAxisYMovementDistance(-1200)
    }
    const likeThisUser = () => {
        setLikeUSer(true)
        setAxisXMovementDistance(1200)
    }
    const dislikeThisUser = () => {
        setDisLikeUser(true)
        setAxisXMovementDistance(-1200)
    }
    const getDistanceAndDirection = (offSet) => {
        //move adjusted logic to decide what action we need to take on release
        if (offSet.x <= -100) {
            setDisLikeUser(true)
        } else if (offSet.x > -100) {
            setDisLikeUser(false)
        }
        if (offSet.x >= 100) {
            setLikeUSer(true)
        } else if (offSet.x < 100) {
            setLikeUSer(false)
        }
        if (offSet.x > -100 && offSet.x < 100 && offSet.y < -100) {
            setSuperLikeUser(true)
        } else if (offSet.y > -100) {
            setSuperLikeUser(false)
        }
    }

    return (
        <div className={style.matchContainer}>
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.MatchAndChatContainer}>
                    <div className={style.containerControllers}>
                        <MatchMessageBTN></MatchMessageBTN>
                        <ChatHeadsContainer></ChatHeadsContainer>
                    </div>
                </div>

            </div>
            <div className={style.matchSuggestion}>
                <div className={style.userAndBtnContainer}>
                    {showCard ? <AnimatePresence>
                        <motion.div className={style.matchSuggestion}
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                rotate: angle,
                                x: axisXMovementDistance,
                                y: axisYMovementDistance,

                            }}
                            tran
                            drag
                            onDrag={
                                (event, info) => {
                                    getDistanceAndDirection(info.offset)
                                    incrementAngle(info.offset.x)
                                }
                            }

                            dragSnapToOrigin='true'
                            onDragEnd={(e, info) => {
                                releaseDrag()
                                animateSwipeCard()

                            }}>
                            <WorkingSuggestedUser like={likeUser} dislike={disLikeUser} superLike={superLikeUser} />
                        </motion.div>
                    </AnimatePresence> : null}
                    <LikeBtnsSuite like={() => likeThisUser()}
                        dislike={() => dislikeThisUser()}
                        superLike={() => superLikeThisUser()
                        }
                    />
                </div>
            </div>


        </div>
    )
}

export function Explore() {
    const [showCard, setShowCard] = useState(true)

    const [angle, setAngle] = useState(0)

    const [axisXMovementDistance, setAxisXMovementDistance] = useState(0)
    const [axisYMovementDistance, setAxisYMovementDistance] = useState(0)

    const [likeUser, setLikeUSer] = useState(false)
    const [disLikeUser, setDisLikeUser] = useState(false)
    const [superLikeUser, setSuperLikeUser] = useState(false)
    useEffect(() => {
        if (axisXMovementDistance || axisYMovementDistance) {
            setTimeout(setShowCard, 500)
        }
    }, [axisXMovementDistance, axisYMovementDistance])

    useEffect(() => {
        if (!showCard) {
            //reset stamps flags in case swithed from buttons
            setLikeUSer(false)
            setDisLikeUser(false)
            setSuperLikeUser(false)
            //align card in center
            setAxisXMovementDistance(0)
            setAxisYMovementDistance(0)
            //generate new card
            setShowCard(true)
        }
    }, [showCard])
    const incrementAngle = (offsetX) => {
        //getting the current position of the component and adjusting the angle 
        const newAngle = Math.floor(offsetX /= 20)
        setAngle(newAngle)
        console.log(newAngle);
    }
    const releaseDrag = () => {
        //actions after releasing the component
        setAngle(0)
        setLikeUSer(false)
        setDisLikeUser(false)
        setSuperLikeUser(false)
    }
    const animateSwipeCard = () => {
        // removing the card in the corresponding direction
        if (superLikeUser) {
            //function if we superLike the user
            superLikeThisUser()
        } else if (disLikeUser) {
            //function if we remove the user
            dislikeThisUser()
        } else if (likeUser) {
            //function if we like the user
            likeThisUser()
        }
    }

    const superLikeThisUser = () => {
        setSuperLikeUser(true)
        setAxisYMovementDistance(-1200)
    }
    const likeThisUser = () => {
        setLikeUSer(true)
        setAxisXMovementDistance(1200)
    }
    const dislikeThisUser = () => {
        setDisLikeUser(true)
        setAxisXMovementDistance(-1200)
    }
    const getDistanceAndDirection = (offSet) => {
        //move adjusted logic to decide what action we need to take on release
        if (offSet.x <= -100) {
            setDisLikeUser(true)
        } else if (offSet.x > -100) {
            setDisLikeUser(false)
        }
        if (offSet.x >= 100) {
            setLikeUSer(true)
        } else if (offSet.x < 100) {
            setLikeUSer(false)
        }
        if (offSet.x > -100 && offSet.x < 100 && offSet.y < -100) {
            setSuperLikeUser(true)
        } else if (offSet.y > -100) {
            setSuperLikeUser(false)
        }
    }

    return (
        <div className={style.matchContainer}>
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.exploreOptions}>
                    <h3 style={{ width: '100%', fontSize: '18px', fontWeight: '600', margin: '10px' }}>Welcome to Explore</h3>
                    <h5 style={{ fontSize: '14px', fontWeight: '300', marginLeft: '10px' }}>My Vibe...</h5>
                    <BigCard title={"Get Verified on Tinder"} subtitle={"Photo Verified"} button={"TRY NOW"} img={bigCardImgOne} />
                    <SmallCard bigTitle={"Free Tonight"} title={"Down for something spontaneus"} subtitle={"Discover"} img={imgFreeTonight} />
                    <SmallCard bigTitle={"Let's be Friends"} title={"Maybe even besties"} subtitle={"Discover"} img={imgLetsBeFriends} />
                    <BigCard bigTitle={"Coffee Date"} title={"Take me to your favorite cafe"} subtitle={"Discover"} button={"JOIN NOW"} img={bigCardImgTwo} />
                    <h3 style={{ width: '100%', fontSize: '18px', fontWeight: '600', margin: '10px' }}>For You</h3>
                    <h5 style={{ fontSize: '14px', fontWeight: '300', marginLeft: '10px' }}>Recommendations based on your profile</h5>
                    <SmallCard title={"Go Out With Someone IRL"} subtitle={"Passions"} button={"Date Night"} img={imgDateNight} />
                    <SmallCard title={"Tell me what to watch tonight"} subtitle={"Passions"} button={"Bringe Watchers"} img={imgBringe} />
                    <SmallCard title={"Get On Their Level"} subtitle={"Passions"} button={"Gamers"} img={imgGamers} />
                    <SmallCard title={"Find People Looking For Change"} subtitle={"Passions"} button={"Social Causes"} img={imgSocialCauses} />
                    <SmallCard title={"Match Your Aesthetic"} subtitle={"Passions"} button={"Creatives"} img={imgCreatives} />
                    <SmallCard title={"What's your favorite brunch item?"} subtitle={"Passions"} button={"Brunch Time"} img={imgBrunch} />
                    <SmallCard title={"Looking For A Snack?"} subtitle={"Passions"} button={"Foodies"} img={imgFoodies} />
                    <SmallCard title={"Split Your Headphones"} subtitle={"Passions"} button={"Music Lovers"} img={imgMusic} />
                    <SmallCard title={"Discover The Outdoors"} subtitle={"Passions"} button={"Nature Lovers"} img={imgNature} />
                    <SmallCard title={"Find Your Perfect Match"} subtitle={"Passions"} button={"Sporty"} img={imgSporty} />
                    <SmallCard title={"Find Your Party Partner"} subtitle={"Passions"} button={"Night Out"} img={imgNightOut} />
                    <SmallCard title={"Take The Leap With Someone"} subtitle={"Passions"} button={"Thrill Seekers"} img={imgThrill} />
                    <SmallCard title={"Explore The World With Them"} subtitle={"Passions"} button={"Wanderlust"} img={imgWander} />
                    <SmallCard title={"Ready For A Spa Date?"} subtitle={"Passions"} button={"Self Care"} img={imgSelfCare} />
                </div>
            </div>
            <div className={style.matchSuggestion}>
                <div className={style.userAndBtnContainer}>
                    {showCard ? <AnimatePresence>
                        <motion.div className={style.matchSuggestion}
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                rotate: angle,
                                x: axisXMovementDistance,
                                y: axisYMovementDistance,

                            }}
                            tran
                            drag
                            onDrag={
                                (event, info) => {
                                    getDistanceAndDirection(info.offset)
                                    incrementAngle(info.offset.x)
                                }
                            }

                            dragSnapToOrigin='true'
                            onDragEnd={(e, info) => {
                                releaseDrag()
                                animateSwipeCard()

                            }}>
                            <WorkingSuggestedUser like={likeUser} dislike={disLikeUser} superLike={superLikeUser} />

                        </motion.div>
                    </AnimatePresence> : null}
                    <LikeBtnsSuite like={() => likeThisUser()}
                        dislike={() => dislikeThisUser()}
                        superLike={() => superLikeThisUser()
                        }
                    />
                </div>
            </div>
        </div>
    )
}