import { Slider } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { temporaryData } from "../../store/ActiveUserSlice";

export function AgeSliderComponent() {

    const user = useSelector(state => state.activeUser);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        let value = e.target.value
        dispatch(temporaryData(["agePreference", value]))
    }

    return (
        <Slider
            size="big"
            getAriaLabel={() => 'Temperature range'}
            value={[user.agePreference[0], user.agePreference[1]]}
            min={18}
            max={100}
            onChange={handleChange}
            valueLabelDisplay="auto"
            color='secondary'
        />
    )
}
export function DistanceSliderComponent(){

    const user = useSelector(state => state.activeUser);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let value = e.target.value;
        dispatch(temporaryData(["distancePreference", value]));
    }

    return (
        <Slider
            size="big"
            getAriaLabel={() => 'Temperature range'}
            value={user.distancePreference}
            min={0}
            max={161}
            onChange={handleChange}
            valueLabelDisplay="auto"
            color='secondary'
        />
    )
}