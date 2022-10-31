import Carousel from "nuka-carousel";
import noPhoto from "../../images/noPhoto.jpg";
import styles from "./ImagesCarousel.module.css";

export default function ImagesCarousel(props) {

  return (

      <>
      <Carousel
        style={{ gap: "35px"}}
        autoplay={false}
        withoutControls={false}
        scrollMode="remainder"
        slidesToShow={1}
        dragging={false}
        animation="zoom"
        defaultControlsConfig={{
          nextButtonText: '>',
          prevButtonText: '<',
          nextButtonStyle: {
            "border": "0px none",
            "background": "none",
            "color": "rgba(255, 255, 255, 0.5)",
            "padding": "10px",
            "fontSize": "30px",
            "fontWeight": "500",
            "opacity": "1",
            "cursor": "pointer",
            "position": "relative",
            "right": "15px"
          },
          prevButtonStyle:{
            "border": "0px none",
            "background": "none",
            "color": "rgba(255, 255, 255, 0.5)",
            "padding": "10px",
            "fontSize": "30px",
            "fontWeight": "500",
            "opacity": "1",
            "cursor": "pointer"
          },
          pagingDotsStyle:{
            "display":"none"
          }
        }}
      >
        {props.user?.pictures.length > 0 
        ? props.user.pictures.map((img,i)=><img key={i} className={styles.imgCarousel} src={img.img} alt="pic"></img>)
        : <img src={noPhoto} className={styles.imgCarousel} alt="defaultPic"></img>}
        {/* {props.user?.verified[0]&&<img className={styles.imgCarousel} src={props.user.verified[0]} alt="selfie"></img>} */}
      </Carousel>
      </>
  );
}