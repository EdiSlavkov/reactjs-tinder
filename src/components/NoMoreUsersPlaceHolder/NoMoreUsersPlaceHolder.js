import { AnimatePresence, motion } from 'framer-motion';
import style from './NoMoreUsersPlaceHolder.module.css'

export default function NoMoreUsersPlaceHolder() {
    return (
        <motion.div className={style.noMatchContainer}>
            <div className={style.suggestedUserContainer}>
                Nema nikoi
            </div>
        </motion.div>

    )
}