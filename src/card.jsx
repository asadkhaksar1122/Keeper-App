import "./card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faTrash } from "@fortawesome/free-solid-svg-icons";
function Card(props) {
    return (
      <div className="card">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-button">
          <button onClick={props.deletefunc}>
            Delete &nbsp;
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="edit" onClick={props.editfunc}>
            Edit &nbsp;
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
    );
}
export default Card;