import style from './SwipebleCard.module.css'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react'
import LikeBtnsSuite from '../LikeBtnsSuite/LikeBtnsSuite'
import WorkingSuggestedUser from '../WorkingSuggestedUser/WorkingSuggestedUser'
import DetailedInfoSuggestionUser from '../DetailedInfoSuggestionUser/DetailedInfoSuggestionUser'
import { checkForMatch, NotSwipedUsers } from '../../server/server'
import { useSelector, useDispatch } from 'react-redux'
import { temporaryData, changeUserData } from '../../store/ActiveUserSlice'
import MatchModal from '../MatchModal/MatchModal';

export default function SwipebleCard() {
    if (!localStorage.getItem('currentUser')) {
        NotSwipedUsers()

    }

    const currentActiveUser = useSelector(state => state.activeUser)

    const dispatch = useDispatch()

    const [matchEvent, setMatchEvent] = useState(false)

    const [showCard, setShowCard] = useState(true)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [angle, setAngle] = useState(0)
    const [firstLook, setFirstLook] = useState(true)

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
        if (!firstLook) {
            toggleLook()
        }
        setSuperLikeUser(true)
        setAxisYMovementDistance(-1200)
        NotSwipedUsers()
        setUser(JSON.parse(localStorage.getItem('currentUser')))

    }
    const likeThisUser = () => {
        if (!firstLook) {
            toggleLook()
        }
        setLikeUSer(true)
        setAxisXMovementDistance(1200)
        let likedArray = [...currentActiveUser.likedPeople]
        likedArray.push(user.email)
        dispatch(temporaryData(['likedPeople', likedArray]))
        dispatch(changeUserData())
        if (checkForMatch(currentActiveUser, user)){
            setMatchEvent(true)
            setTimeout(() => {
                setMatchEvent(false)
            }, 4000);
        }
        NotSwipedUsers()
        setUser(JSON.parse(localStorage.getItem('currentUser')))

    }
    const dislikeThisUser = () => {
        if (!firstLook) {
            toggleLook()
        }
        setDisLikeUser(true)
        setAxisXMovementDistance(-1200)
        NotSwipedUsers()
        setUser(JSON.parse(localStorage.getItem('currentUser')))

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

    const toggleLook = () => {
        setFirstLook(!firstLook)
    }

    return (
        <div className={style.matchSuggestion}>
            {matchEvent ? <MatchModal/> : null}
            <div className={style.userAndBtnContainer}>
                {showCard ? <AnimatePresence>
                    {firstLook ? <motion.div className={style.matchSuggestion}
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            rotate: angle,
                            x: axisXMovementDistance,
                            y: axisYMovementDistance,

                        }}
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
                        <WorkingSuggestedUser user={user} like={likeUser} dislike={disLikeUser} superLike={superLikeUser} changeLook={toggleLook} />
                    </motion.div> :
                        <DetailedInfoSuggestionUser user={user} changeLook={toggleLook}></DetailedInfoSuggestionUser>
                    }

                </AnimatePresence> : null}
                <LikeBtnsSuite like={() => likeThisUser()}
                    dislike={() => dislikeThisUser()}
                    superLike={() => superLikeThisUser()
                    }
                />
            </div>
        </div>
    )
}