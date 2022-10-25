import Accordion from "react-bootstrap/Accordion";
import { useDispatch } from "react-redux";
import { temporaryData } from "../../store/ActiveUserSlice";
import styles from "../NewUserInfo/Accordion.module.css";

export default function UserProperties(props) {
  const dispatch = useDispatch();
  const data = props.data;
  let userProperty = props.property || [];
  let user = props.property;
  const findItem = (name, container) => {
    return container.findIndex((e) => e === name);
  };

  const checkOnlyOne = (item) => {
    return item === props.property ? true : false;
  };

  const handleClick = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (props.onlyOne) {
      dispatch(temporaryData([name, value]));
    } else {
      let userPropertyCopy = [...userProperty];
      const index = findItem(value, userPropertyCopy);
      index === -1
        ? userPropertyCopy.push(value)
        : userPropertyCopy.splice(index, 1);
      dispatch(temporaryData([name, userPropertyCopy]));
    }
  };

  return (
    <>
      <Accordion defaultActiveKey="0" alwaysOpen={false}>
        <div style={{ position: "relative", margin: "15px 0" }}>
          <span
            style={user[0] ? { display: "none" } : { display: "inline" }}
            className={styles.bonus}
          >
            +10%
          </span>
        </div>
        <Accordion.Item eventKey="10">
          <Accordion.Header className={styles.accordionLabel}>
            {props.label}
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
            {data.map((e, i) => (
              <div className={styles.wrapper} key={i}>
                <label
                  className={
                    props.onlyOne
                      ? checkOnlyOne(e)
                        ? styles.checked
                        : ""
                      : findItem(e, userProperty) !== -1
                      ? styles.checked
                      : ""
                  }
                  htmlFor={e}
                >
                  {e}
                </label>
                <input
                  id={e}
                  type="checkbox"
                  name={props.name}
                  value={e}
                  checked={
                    props.onlyOne
                      ? checkOnlyOne(e)
                      : findItem(e, userProperty) !== -1
                      ? true
                      : false
                  }
                  onChange={handleClick}
                />
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
