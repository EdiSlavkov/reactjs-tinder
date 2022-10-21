import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from "react-redux";
import { temporaryData } from "../../store/ActiveUserSlice";
import styles from "../NewUserInfo/Accordion.module.css";

export default function UserProperties (props){

    const dispatch = useDispatch();
    const data = props.data;
    let userProperty = props.property || [];


    const findItem = (name, container)=>{

        return container.findIndex(e => e === name);
        
    }

    const handleClick = (e)=>{
        let userPropertyCopy = [...userProperty]
        const value = e.target.value;
        const name = e.target.name;
        const index = findItem(value, userPropertyCopy);
        index === -1 ? userPropertyCopy.push(value) : userPropertyCopy.splice(index, 1);
        dispatch(temporaryData([name, userPropertyCopy]));
    }

    return (
        <>
            <Accordion defaultActiveKey="0" flush alwaysOpen={false}>
            <Accordion.Item eventKey="10">
                <Accordion.Header>{props.name}</Accordion.Header>
                <Accordion.Body className={styles.accordionBody}>
                    {data.map((e,i) =>
                     <div className={styles.wrapper} key={i} >
                    <label htmlFor={e}>{e}</label>
                        <input
                        id={e}
                        type="checkbox"
                        name={props.name}
                        value={e}
                        checked={findItem(e, userProperty) !== -1 ? true : false}
                        onChange={handleClick}
                     />
                     </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </>
    )
}