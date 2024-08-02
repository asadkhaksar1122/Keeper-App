import { useState } from "react";
import Search from "../public/search.png";
import Keeper from "../public/keeper.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faXmark } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
function Navbar(props) {
  let [width, setwidth] = useState(null);
  function clicksearch() {
    let searchinput = document.querySelector(".searchinput");
    if (width) {
      setwidth(null);
      searchinput.blur();
    } else {
      setwidth("toggle");

      searchinput.focus();
    }
  }
  return (
    <nav className="navbar">
      <div className="first">
        <div className="imagediv">
          <img src={Keeper} alt="" />
        </div>
        <h1>Keeper App</h1>
      </div>
      <div className="second">
        <input
          type="text"
          placeholder="Search"
          name="search"
          className={`searchinput ${width}`}
          onInput={props.searchitem}
          onFocus={props.focusfunc}
          onBlur={props.blurfunc}
        />
        <button className="searchbtn" onClick={clicksearch}>
          {width === "toggle" ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
