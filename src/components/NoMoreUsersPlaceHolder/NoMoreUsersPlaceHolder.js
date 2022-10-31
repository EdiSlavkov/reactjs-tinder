import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion';
import style from './NoMoreUsersPlaceHolder.module.css'

export default function NoMoreUsersPlaceHolder() {
    const currentActiveUser = useSelector(state => state.activeUser)

    return (
        <AnimatePresence>
            <motion.div className={style.noMatchContainer}
                animate={{ scale: [1, 1.05, 1.15, 1.05, 1] }}
                transition={{
                    duration: 5,
                    ease: '',
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            >
                <div className={style.biggerCircle}>
                    <div className={style.smallerCircle}>
                        <img src={(currentActiveUser.pictures[0].img)} className={style.profileCircle} alt="img"></img>
                    </div>
                </div>
                <div>There's no one around you. </div>
            </motion.div>
        </AnimatePresence>
    )
}