import Card from 'react-bootstrap/Card';
import styles from './SmallCard.module.css';
import Button from 'react-bootstrap/Button';

export default function SmallCard(props) {

  const prevent = (e)=> e.preventDefault();

  return (
<Card className={styles.smallContainer} style={{ backgroundImage:`url(${props.img})`}}>
      <Card.Body className={styles.smallCardBody}>
        <div className={styles.smallTitleContainer}>
        <Card.Title className={styles.bigTitle}>{props.bigTitle}</Card.Title>
        <Card.Title className={styles.smallTitles}>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
        </div>
        {props.button&&<Button onClick={prevent} className={styles.smallBtn}>{props.button}</Button>}
      </Card.Body>
    </Card>
  );
}