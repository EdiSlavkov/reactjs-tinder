import { Slider } from "@mui/material"
import React, { useState } from "react";

export function AgeSliderComponent() {
    const [SliderValue, setSliderValue] = React.useState([20, 26]);


    const handleChange = (e) => {
        setSliderValue(e.target.value)
        //slider value for display
        console.log(SliderValue);
    }

    return (
        <Slider
            size="big"
            getAriaLabel={() => 'Temperature range'}
            value={SliderValue}
            min={18}
            max={100}
            onChange={handleChange}
            valueLabelDisplay="auto"
            color='secondary'
        />
    )
}
export function DistanceSliderComponent(){
    const [SliderValue, setSliderValue] = React.useState(20);


    const handleChange = (e) => {
        setSliderValue(e.target.value)
            //slider value for display
        console.log(SliderValue);
    }

    return (
        <Slider
            size="big"
            getAriaLabel={() => 'Temperature range'}
            value={SliderValue}
            min={0}
            max={161}
            onChange={handleChange}
            valueLabelDisplay="auto"
            color='secondary'
        />
    )
}