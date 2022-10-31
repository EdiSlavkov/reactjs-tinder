import { motion } from 'framer-motion';
import style from './MatchModal.module.css';

export default function MatchModal(props) {

    return (
        <>
            <div className={style.dimmedBackground}></div>
            <motion.div
                className={style.matchContainerMessage}
                animate={{ x: 100 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <h1 className={style.matchText}>It's a MATCH!</h1>
            </motion.div>
            
        </>
    )
}