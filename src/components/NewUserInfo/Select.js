export default function Select(props) {

    return (
        <>
            <select
                  id={props.id}
                  name={props.name}
                  value={props.value}
                  required={props.required}
                  onChange={props.function}
                >
                  <option value="">Select</option>
                  {props.data.map((elem, index) => <option key={index} value={elem}>{elem}</option>)}
            </select>
        </>
    )

}