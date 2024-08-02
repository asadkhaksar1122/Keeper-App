import "./App.css";
import Navbar from "./navbar";
import Form from "./form";
import Card from "./card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function convertFirstLetter(str) {
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
}
function App() {
  let [title, settitle] = useState("");
  let [description, setdescription] = useState("");
  let isvalid = false;
  let [note, setnote] = useState([
    {
      title: "Keeper App",
      description: "Welcome to the Keeper App",
      id: uuidv4(),
    },
    {
      title: "My Dream",
      description: "My dream is to become the billionaire and richest person of the world",
      id: uuidv4(),
    },
    {
      title: "My Goal",
      description: "My  Goal is to become the pro programmer of Pakistan and all over the world",
      id: uuidv4(),
    },
  ]);
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
      settitle("");
      setdescription("");
    }

    e.preventDefault();
  }
  function deletefunc(id) {
    let modifyarr = note.filter((element) => {
      return element.id != id;
    });
    setnote(modifyarr);
  }
  function editfunc(id) {
    let editele = note.find((element) => {
      return element.id == id;
    });
    settitle(editele.title);
    setdescription(editele.description);
    let modifyarr = note.filter((element) => {
      return element.id != id;
    });
    setnote(modifyarr);
  }
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
      let searchValue = e.target.value.toLowerCase().trim();
      let titleText = title.innerText.toLowerCase();
      let descriptionText = description.innerText.toLowerCase();

      if (
        titleText.includes(searchValue) ||
        descriptionText.includes(searchValue)
      ) {
        card.style.display = "block";

        // Wrap matched text in a span with blue color
        let titleHTML = titleText.replace(
          new RegExp(searchValue, "g"),
          (match) => {
            return `<span style="background-color: yellow; color:black;">${match}</span>`;
          }
        );
        title.innerHTML = titleHTML;

        let descriptionHTML = descriptionText.replace(
          new RegExp(searchValue, "g"),
          (match) => {
            return `<span style="background-color:yellow; color:black;">${match}</span>`;
          }
        );
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
