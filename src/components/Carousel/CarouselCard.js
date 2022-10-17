import Card from "react-bootstrap/Card";
import quotationLogo from "../../images/grey-quotation.webp";

export default function CarouselCard(props) {
  return (
    <Card
      style={{ height: "50vh", margin: "10px", boxShadow: "0px 1px 2px 0px #8080808f" }}
    >
      <Card.Body>
        <img
          style={{
            width: "13%",
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
