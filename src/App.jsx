import "./App.css";
import Navbar from "./navbar";
import Form from "./form";
import Card from "./card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const MySwal = withReactContent(Swal);
function convertFirstLetter(str) {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
}
function App() {
  let [title, settitle] = useState("");
  let [description, setdescription] = useState("");
  let isvalid = false;
  let [note, setnote] = useState(
    JSON.parse(localStorage.getItem("notes")) || [
      {
        title: "Keeper App",
        description: "Welcome to the Keeper App",
        id: uuidv4(),
      },
    ]
  );
  function handlechange(event) {
    if (event.target.name == "title") {
      settitle(event.target.value);
    }
    if (event.target.name == "description") {
      setdescription(event.target.value);
    }
  }
  function addnote(e) {
    if (isvalid) {
      setnote([
        ...note,
        { title: title, description: description, id: uuidv4() },
      ]);
      localStorage.setItem(
        "notes",
        JSON.stringify([
          ...note,
          { title: title, description: description, id: uuidv4() },
        ])
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your note has been successfully added",
        showConfirmButton: false,
        timer: 1500,
      });
      settitle("");
      setdescription("");
    }

    e.preventDefault();
  }
  function deletefunc(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let modifyarr = note.filter((element) => {
          return element.id != id;
        });
        localStorage.setItem("notes", JSON.stringify(modifyarr));
        setnote(modifyarr);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  const editfunc = (id) => {
    let editele = note.find((element) => element.id === id);
    console.log(editele);

    MySwal.fire({
      title: "Note Edit",
      html: (
        <div className="editdiv">
          <input
            defaultValue={editele.title}
            style={{ width: "100%" }}
            type="text"
            id="title"
            className="swal2-input"
            placeholder="Title"
          />
          <textarea
            id="description"
            style={{ width: "100%" }}
            className="swal2-textarea"
            placeholder="Description"
          >
            {editele.description}
          </textarea>
        </div>
      ),
      focusConfirm: false,
      customClass: {
        popup: "swal2-popup",
        htmlContainer: "swal2-html-container",
      },
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        if (!title || !description) {
          Swal.showValidationMessage("Please enter both title and description");
        }
        return { title, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let editedindex = note.findIndex((element) => element.id === id);
        note[editedindex].title = result.value.title;
        note[editedindex].description = result.value.description;
        localStorage.setItem("notes", JSON.stringify(note));
        setnote(JSON.parse(localStorage.getItem("notes")));
        Swal.fire(
          "Submitted!",
          `Title: ${result.value.title} \n Description: ${result.value.description}`,
          "success"
        );
      }
    });
  };
  function uppercase(event) {
    settitle(title.toUpperCase());
    setdescription(description.toUpperCase());
    event.preventDefault();
  }
  function lowercase(event) {
    settitle(title.toLowerCase());
    setdescription(description.toLowerCase());
    event.preventDefault();
  }
  function firstletter(event) {
    let convertedtitle = convertFirstLetter(title);
    let converteddescription = convertFirstLetter(description);
    settitle(convertedtitle);
    setdescription(converteddescription);
    event.preventDefault();
  }
  if (title.length > 2 && description.length > 3) {
    isvalid = true;
  }
  function searchitem(e) {
    let cards = document.getElementsByClassName("card");
    for (const card of cards) {
      let title = card.querySelector("h2");
      let description = card.querySelector("p");
      let searchValue = e.target.value.trim();
      let titleText = title.innerText;
      let descriptionText = description.innerText;

      // Create a case-insensitive regular expression
      let regex = new RegExp(searchValue, "gi");

      if (titleText.match(regex) || descriptionText.match(regex)) {
        card.style.display = "block";

        // Wrap matched text in a span with yellow background and black color
        let titleHTML = titleText.replace(regex, (match) => {
          return `<span style="background-color: yellow; color:black;">${match}</span>`;
        });
        title.innerHTML = titleHTML;

        let descriptionHTML = descriptionText.replace(regex, (match) => {
          return `<span style="background-color:yellow; color:black;">${match}</span>`;
        });
        description.innerHTML = descriptionHTML;
      } else {
        card.style.display = "none";
        title.innerHTML = titleText;
        description.innerHTML = descriptionText;
      }
    }
  }
  function focusfunc() {
    let form = document.getElementById("form");
    form.style.display = "none";
  }
  function blurfunc(e) {
    let form = document.getElementById("form");
    form.style.display = "flex";
    let cards = document.getElementsByClassName("card");
    for (const Card of cards) {
      Card.style.display = "inline-block";
    }
    e.target.value = "";
  }
  return (
    <>
      <Navbar
        searchitem={searchitem}
        focusfunc={focusfunc}
        blurfunc={blurfunc}
      />
      <Form
        title={title}
        description={description}
        addnote={addnote}
        handlechange={handlechange}
        uppercase={uppercase}
        lowercase={lowercase}
        firstletter={firstletter}
        isvalid={isvalid}
      ></Form>
      <div className="maincarddiv">
        {note.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              key={item.id}
              deletefunc={() => {
                deletefunc(item.id);
              }}
              editfunc={() => {
                editfunc(item.id);
              }}
            />
          );
        })}{" "}
      </div>
    </>
  );
}

export default App;
