import style from './SuggestionsDashboard.module.css'
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation'
import BigCard from '../cards/BigCard'
import SmallCard from '../cards/SmallCard'
import MatchMessageBTN from '../MatchMessageBTN/MatchMessageBTN'
import ProfileCard from '../ProfilePage/ProfileCard'



export function Matches() {
    return (
        <div className={style.matchContainer}>
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.MatchAndChatContainer}>
                    <div className={style.containerControllers}>
                    <MatchMessageBTN></MatchMessageBTN>
                    </div>
                </div>

            </div>
            <ProfileCard></ProfileCard>
        </div>
    )
}

export function Explore() {
    return (
        <div className={style.matchContainer}>
            <div className={style.exploreSection}>
                <LoggedNavigation></LoggedNavigation>
                <div className={style.exploreOptions}>
                    <BigCard></BigCard>
                    <SmallCard>
                    </SmallCard>
                    <SmallCard></SmallCard>
                    <BigCard></BigCard>
                    <BigCard></BigCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <BigCard></BigCard>
                </div>

            </div>
            <ProfileCard></ProfileCard>

        </div>
    )
}