import Carousel from "nuka-carousel";
import noPhoto from "../../images/noPhoto.jpg";
export default function ImagesCarousel(props) {


  return (

      <>
      <Carousel
        style={{ gap: "35px", marginTop: " 2%" }}
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
        
        {/* {props.map(image => {
            return <img src={image.img} alt="pic"></img>
        })} */}
       
        {props.user?.pictures.length > 0 
        ? props.user.pictures.map((img,i)=><img key={i} style={{width:"100%", height:"66vh"}} src={img.img} alt="pic"></img>)
        : <img src={noPhoto} style={{width:"100%", height:"66vh"}} alt="defaultPic"></img>}
      </Carousel>
      </>
  );
}