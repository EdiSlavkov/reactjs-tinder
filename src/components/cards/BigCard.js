import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from "./BigCard.module.css";

export default function BigCard(props) {

  const prevent = (e)=> e.preventDefault();

  return (
    <Card className={styles.cardContainer} style={{ backgroundImage:`url(${props.img})`}}>
      <Card.Body>
        <div className={styles.titlesContainer}>
        <Card.Title className={styles.bigTitle}>{props.bigTitle}</Card.Title>
        <Card.Title className={styles.title}>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
        </div>
        <Button className={styles.btn} onClick={prevent}>{props.button}</Button>
      </Card.Body>
    </Card>
  );
}