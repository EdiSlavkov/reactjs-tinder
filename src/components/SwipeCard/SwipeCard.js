import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from './SwipeCard.module.css'

export default function SwipeCard() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
//   vremenno placeholderche
  return (
    <div className={style.swipeCardContainer} style={{width: 'fit-content'}}>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      <Carousel.Item>
        <img
          className="" 
          src="https://thispersondoesnotexist.com/image"
          alt="First slide"
          draggable='false'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thispersondoesnotexist.com/image"
          alt="Second slide"
          draggable='false'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thispersondoesnotexist.com/image"
          alt="Third slide"
          draggable='false'

        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
