import Card from "react-bootstrap/Card";
import quotationLogo from "../../images/grey-quotation.webp";

export default function CarouselCard(props) {
  return (
    <Card
      style={{ padding: "0 1rem 9rem 1rem", height: "50vh", margin: "10px" }}
    >
      <Card.Body>
        <img
          style={{
            width: "40px",
            position: "absolute",
            top: "10px",
            right: "8px",
            opacity: "0.6",
          }}
          src={quotationLogo}
          alt="quotation-mark"
        ></img>
        <Card.Title>{props.name}</Card.Title>
        <hr />
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
