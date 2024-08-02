import "./form.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFont,

} from "@fortawesome/free-solid-svg-icons";
function Form(props) {
    
    return (
      <form method="post" id="form" onSubmit={props.addnote} className="form">
        <input
          type="text"
          onInput={props.handlechange}
          value={props.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className="textarea"
          onInput={props.handlechange}
          value={props.description}
          name="description"
          placeholder="Description"
        />
        {!props.isvalid && (
          <p style={{ color: "red", lineHeight: "0px" }}>
            please enter something
          </p>
        )}
        <button>
          Add Note &nbsp;
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="otherbutton">
          <button onClick={props.uppercase}>
            Upper Case &nbsp;
            <FontAwesomeIcon icon={faFont} />
          </button>
          <button onClick={props.lowercase}>
            Lowercase Case &nbsp;
           
          </button>
          <button onClick={props.firstletter}>First Letter</button>
        </div>
      </form>
    );
}
export default Form;