import style from './SuggestionsDashboard.module.css'
import SwipeCard from '../SwipeCard/SwipeCard'
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation'
import BigCard from '../cards/BigCard'



export default function Matches() {
    return (
        <div className={style.matchContainer}>
        {/* kontrol panela lqvo */}
        <div className={style.dashBoard}>
            <LoggedNavigation></LoggedNavigation>
            <BigCard></BigCard>
            <BigCard></BigCard>

        </div>
            {/* kartichka posredata s bug ot react components :D */}
            <SwipeCard>
            </SwipeCard>
        </div>
    )
}   