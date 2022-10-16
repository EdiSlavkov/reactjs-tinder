import style from './SuggestionsDashboard.module.css'
import SwipeCard from '../SwipeCard/SwipeCard'
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation'
import BigCard from '../cards/BigCard'
import SmallCard from '../cards/SmallCard'
import MatchMessageBTN from '../MatchMessageBTN/MatchMessageBTN'



export function Matches() {
    return (
        <div className={style.matchContainer}>
            {/* kontrol panela lqvo */}
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.MatchAndChatContainer}>
                    <div className={style.containerControllers}>
                    <MatchMessageBTN content='Matches'></MatchMessageBTN>
                    <MatchMessageBTN content='Messages'></MatchMessageBTN>
                    </div>
                </div>

            </div>
            {/* kartichka posredata s bug ot react components :D */}
            <SwipeCard>
            </SwipeCard>
        </div>
    )
}

export function Explore() {
    return (
        <div className={style.matchContainer}>
            {/* kontrol panela lqvo */}
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.exploreOptions}>
                    <BigCard></BigCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <BigCard></BigCard>
                    <BigCard></BigCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <BigCard></BigCard>
                </div>

            </div>
            {/* kartichka posredata s bug ot react components :D */}
            <SwipeCard>
            </SwipeCard>
        </div>
    )
}