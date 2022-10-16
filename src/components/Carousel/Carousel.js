import Carousel from "nuka-carousel";
import { comments } from "./CarouselData";
import CarouselCard from "./CarouselCard";
import "./Carousel.module.css";

export default function CarouselComments() {
  return (
    <div style={{ width: "90%", margin: "0 5%" }}>
      <Carousel
        style={{ gap: "35px", marginTop: " 2%" }}
        autoplay={true}
        autoplayInterval={5000}
        withoutControls={true}
        wrapAround={true}
        slidesToShow={3}
      >
        {comments.map((comment) => (
          <CarouselCard key={comment.name} name={comment.name} text={comment.text} />
        ))}
      </Carousel>
    </div>
  );
}
